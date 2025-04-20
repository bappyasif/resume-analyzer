// lib/runClientNER.ts
import type { TokenClassificationPipeline } from '@huggingface/transformers';
import { AutoTokenizer, AutoModelForTokenClassification, pipeline } from '@huggingface/transformers';

let nerPipeline: TokenClassificationPipeline | null = null;

// const model_name = 'bert-base-uncased';
const model_name = 'distilbert-base-uncased';
const tokenizer = new AutoTokenizer();
const model = AutoModelForTokenClassification.from_pretrained(model_name);

export async function runClientNER(text: string) {
  // only run in browser
  if (typeof window === 'undefined') {
    throw new Error('runClientNER can only run client‑side');
  }

  // lazy‑load transformers.js
  if (!nerPipeline) {
    // nerPipeline = await TokenClassificationPipeline.create(
    nerPipeline = await pipeline(
      'token-classification',
      // swap in any ONNX‑ready resume NER model, e.g.:
      model_name,
      {
        tokenizer: tokenizer,
        model: model,
      }
    );
  }

  // run the pipeline
  const raw = await nerPipeline(text, {
    // groupEntities: true,
    // threshold: 0.5,
    // ignore_labels: [],
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

/**

// lib/runClientNER.ts
import type { TokenClassificationPipeline } from '@huggingface/transformers';

let nerPipeline: TokenClassificationPipeline | null = null;

// const MODEL = 'dbmdz/bert-large-cased-finetuned-conll03-english-onnx'; 
// this repo has model.onnx, tokenizer.json, config.json
// const MODEL = 'protectai/bert-large-cased-finetuned-conll03-english-onnx';
// const MODEL = 'manishiitg/resume-ner';
// const MODEL = 'dbmdz/bert-large-cased-finetuned-conll03-english-onnx';
// const MODEL = 'protectai/bert-large-cased-finetuned-conll03-english-onnx';
// const MODEL = 'distilbert-base-uncased-finetuned-sst-2-english';
const MODEL = 'dslim/bert-base-NER';

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
    // ignore_labels: [],
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
*/