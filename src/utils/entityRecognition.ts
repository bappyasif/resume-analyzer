import { AutoModelForTokenClassification, AutoTokenizer } from '@huggingface/transformers';

// const model_name = 'Resume-NER';
const model_name = 'Xenova/bert-base-uncased';
const model = AutoModelForTokenClassification.from_pretrained(model_name);
const tokenizer = AutoTokenizer.from_pretrained(model_name);

interface Entity {
  word: string;
  entity: string;
}

async function extractEntities(resumeText: string): Promise<Entity[]> {
  const inputs = tokenizer.encode_plus(resumeText, {
    add_special_tokens: true,
    max_length: 512,
    return_attention_mask: true,
    return_tensors: 'pt',
  });

  const outputs = await model(inputs['input_ids'], inputs['attention_mask']);
  const entities: Entity[] = [];

  for (const entity of outputs[0]) {
    if (entity.score > 0.5) {
      entities.push({ word: entity.word, entity: entity.entity });
    }
  }

  return entities;
}

export { extractEntities };