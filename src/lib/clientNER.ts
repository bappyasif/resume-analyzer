// lib/runClientNER.ts
import type { TokenClassificationPipeline } from '@xenova/transformers';

let nerPipeline: TokenClassificationPipeline | null = null;

export async function runClientNER(text: string) {
  // guard against SSR
  if (typeof window === 'undefined') {
    throw new Error('runClientNER can only run in the browser');
  }

  // dynamically load the browser bundle
  const { pipeline } = await import(
    '@xenova/transformers'
  );

  if (!nerPipeline) {
    nerPipeline = await pipeline<'token-classification'>(
      'token-classification',
      'manishiitg/resume-ner',
      {
        // browser options
        progress_callback: (m: number) => console.debug(`Load: ${m}%`),
      }
    );
  }

  const raw = await nerPipeline(text, {
    // groupEntities: true,
    // threshold: 0.5,
  });

  return raw.map(r => ({
    entity: r.entity_group,
    score: r.score,
    word: r.word,
    start: r.start,
    end: r.end,
  }));
}


// // lib/runClientNER.ts
// import { pipeline, TokenClassificationPipeline } from '@xenova/transformers';

// let nerPipeline: TokenClassificationPipeline | null = null;

// export async function runClientNER(text: string) {
//   if (!nerPipeline) {
//     nerPipeline = await pipeline<'token-classification'>(
//       'token-classification',
//       'manishiitg/resume-ner'
//     );
//   }

//   const results = await nerPipeline(text, {
//     ignore_labels: ['O'],
//     // collapse entities with same label into groups
//     // groupEntities: true,
//     // only return high-confidence
//     // threshold: 0.5,
//   });

//   return results.map(r => ({
//     entity: r.entity_group,
//     score: r.score,
//     word: r.word,
//     start: r.start,
//     end: r.end,
//   }));
// }
