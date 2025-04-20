import { env, pipeline } from '@huggingface/transformers';

if (typeof window !== 'undefined') {
  env.allowLocalModels = true;
  env.localModelPath = '/models/';
}

export async function runClientNER(text: string) {
  const ner = await pipeline<'token-classification'>(
    'token-classification',
    'bert-ner',
    // { quantized: true, groupEntities: true }
  );
  return await ner(text);
}



// import { env, pipeline } from '@huggingface/transformers';

// if (typeof window !== 'undefined') {
//   env.allowLocalModels = true;        // ✅ THIS ONE is required!
//   env.allowRemoteModels = false;      // (optional, for security)
//   env.localModelPath = '/models/';    // default path for local model loading
// }

// export async function runClientNER(text: string) {
//   const ner = await pipeline<'token-classification'>(
//     'token-classification',
//     'bert-ner',
//     // { quantized: true, groupEntities: true }
//   );
//   return await ner(text);
// }



// import { env, pipeline } from '@huggingface/transformers';

// if (typeof window !== 'undefined') {
//   env.allowRemoteModels = false;
//   env.localModelPath = '/models/';
// }

// export async function runClientNER(text: string) {
//   const ner = await pipeline<'token-classification'>(
//     'token-classification',
//     'bert-ner',
//     { quantized: true, groupEntities: true }
//   );
//   return await ner(text);
// }