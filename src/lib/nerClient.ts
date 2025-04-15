// lib/runClientNER.ts
import type { TokenClassificationPipeline } from '@huggingface/transformers';

let nerPipeline: TokenClassificationPipeline | null = null;

// const MODEL = 'dbmdz/bert-large-cased-finetuned-conll03-english-onnx'; 
// this repo has model.onnx, tokenizer.json, config.json
const MODEL = 'protectai/bert-large-cased-finetuned-conll03-english-onnx';

export async function runClientNER(text: string) {
  // only run in browser
  if (typeof window === 'undefined') {
    throw new Error('runClientNER can only run client‑side');
  }

  // lazy‑load transformers.js
  const { pipeline } = await import('@huggingface/transformers');

  if (!nerPipeline) {
    nerPipeline = await pipeline<'token-classification'>(
      'token-classification',
      // swap in any ONNX‑ready resume NER model, e.g.:
    //   'manishiitg/resume-ner',
      MODEL,
      {
        // use quantized weights by default
        // quantized: true,
      }
    );
  }

  // run the pipeline
  const raw = await nerPipeline(text, {
    // groupEntities: true,
    // threshold: 0.5,
  });

  // normalize output
  return raw.map(r => ({
    entity: r.entity_group,
    score: r.score,
    word: r.word,
    start: r.start,
    end: r.end,
  }));
}
