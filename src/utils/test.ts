import { AutoModelForTokenClassification, AutoTokenizer } from '@huggingface/transformers';

// const model = await AutoModelForTokenClassification.from_pretrained('extended_distilBERT-finetuned-resumes-sections');
// const tokenizer = await AutoTokenizer.from_pretrained('extended_distilBERT-finetuned-resumes-sections');

// const text = 'John Smith is a software engineer with 5 years of experience in Java and Python.';
// const inputs = tokenizer.encode(text, { add_special_tokens: true });
// const outputs = await model(inputs);
// const entities = outputs.logits.argmax(-1);

export const letTest = async () => {
//     const model = await AutoModelForTokenClassification.from_pretrained('extended_distilBERT-finetuned-resumes-sections', { use_auth_token: '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' });
// const tokenizer = await AutoTokenizer.from_pretrained('extended_distilBERT-finetuned-resumes-sections');

const model = await AutoModelForTokenClassification.from_pretrained('distilbert-base-uncased');
const tokenizer = await AutoTokenizer.from_pretrained('distilbert-base-uncased');

    const text = 'John Smith is a software engineer with 5 years of experience in Java and Python.';
    // const inputs = tokenizer.encode(text, { add_special_tokens: true });
    const inputs = tokenizer.encode(text);
    const outputs = await model(inputs);
    const entities = outputs.logits.argmax(-1);
    console.log(entities);
}

// console.log(entities);

// import { AutoModelForTokenClassification, AutoTokenizer } from '@huggingface/transformers';

// const model = await AutoModelForTokenClassification.from_pretrained('extended_distilBERT-finetuned-resumes-sections');
// const tokenizer = await AutoTokenizer.from_pretrained('extended_distilBERT-finetuned-resumes-sections');

// const text = 'John Smith is a software engineer with 5 years of experience in Java and Python.';
// const inputs = tokenizer.encode(text, { add_special_tokens: true, max_length: 512, return_attention_mask: true, return_tensors: 'pt' });
// const outputs = await model(inputs);
// const entities = outputs.logits.argmax(-1);

// console.log(entities);