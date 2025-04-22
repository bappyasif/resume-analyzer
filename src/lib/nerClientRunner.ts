// import { env, pipeline, type Pipeline } from '@huggingface/transformers';

// // Define a variable to hold the pipeline instance using a more specific type
// let nerPipeline: Pipeline<'token-classification'> | null = null;

// // Configure environment for local models (only if running in a browser-like environment)
// // Ensure the '/models/' path is correctly served by your web server
// // and contains the necessary model and tokenizer files.
// if (typeof window !== 'undefined') {
//   env.allowLocalModels = true;
//   env.localModelPath = '/models/';
//   // Optional: Disable remote models if you ONLY want to use local ones
//   // env.allowRemoteModels = false;
// }

// // Define the model identifier you intend to use
// // Ensure '/models/bert-ner/' contains valid model files (e.g., model.onnx),
// // config.json, tokenizer.json, and crucially tokenizer_config.json.
// const modelIdentifier = 'bert-ner';
// // const modelIdentifier = 'dslim/bert-base-NER'; // <-- Try this for testing

// export async function runClientNER(text: string) {
//   try {
//     // Lazy-load the pipeline: Initialize it only once
//     if (!nerPipeline) {
//       console.log(`Initializing token classification pipeline for model: ${modelIdentifier}...`);
//       // Use the specific pipeline type for better type checking
//       nerPipeline = await pipeline<'token-classification'>(
//         'token-classification',
//         modelIdentifier
//         // Add pipeline options if needed, e.g.:
//         // { quantized: true } // Ensure model supports quantization if enabled
//         // { groupEntities: true } // Option to group related tokens
//       );
//       console.log('Pipeline initialized successfully.');
//     }

//     console.log('Running NER prediction...');
//     // The pipeline function returns an array of entities
//     const nerResp = await nerPipeline(text, {
//         // You can pass inference options here if needed
//         // e.g., group_entities is often useful for NER
//         // group_entities: true // Note: some models/pipelines use groupEntities instead
//     });
//     console.log('NER Response:', nerResp);
//     return nerResp;

//   } catch (error) {
//     console.error(`Error during NER processing with model ${modelIdentifier}:`, error);
//     // Depending on your application's needs, you might want to:
//     // 1. Re-throw the error to be handled upstream
//     // 2. Return a default value (e.g., an empty array or null)
//     // 3. Log the error and potentially reset the pipeline for the next attempt
//     // nerPipeline = null; // Optional: force re-initialization on next call after error
//     throw error; // Re-throwing is often a good default
//   }
// }




import { env, pipeline } from '@huggingface/transformers';

if (typeof window !== 'undefined') {
  env.allowLocalModels = true;
  env.localModelPath = '/models/';
}

export async function runClientNER(text: string) {
  const ner = await pipeline(
    'token-classification',
    'bert-ner',
    // { quantized: true, groupEntities: true }
  );
  const nerResp = await ner(text);
  console.log(nerResp);
  return nerResp;
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