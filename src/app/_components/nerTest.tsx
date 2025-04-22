import { pipeline } from '@huggingface/transformers';
import React, { useEffect, useState } from 'react'
import { groupEntities } from '~/lib/groupEntities';
import { runClientNER } from '~/lib/nerClientRunner';
// import { runClientNER } from '~/lib/nerClient';

export function NerTest({ parsedText }: { parsedText: string }) {
  const [text, setText] = useState(parsedText);
  const [entities, setEntities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleNER = async () => {
    setLoading(true);
    try {
      const ner = await runClientNER(text);
      console.log(ner, "NERNER");
      setEntities(ner);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runClientNER("I'm Bappy from Dhaka. I worked at Google.").then((result) => {
      console.log(result, "result!!");
      const entitiesResultGroupped = groupEntities(entities)
      console.log(entitiesResultGroupped, "entitiesResultGroupped!!");
    }).catch((error) => {
      console.log(error, "error!!");
    })
  }, [parsedText]);

  // useEffect(() => {
  //   const test5 = async () => {
  //     const classifier = await pipeline('token-classification', 'Xenova/bert-base-NER');
  //     const output = await classifier('My name is Sarah and I live in London');

  //     const ner = await pipeline('token-classification', 
  //       // 'Xenova/bert-base-NER-onnx', 
  //       'bert-ner',
  //       {
  //       quantized: true,
  //     });
  //     console.log(ner, "NER", output);
  //   }
  //   test5();
  // }, [parsedText]);

  return (
    <div className="p-8">
      <h1 className="text-xl mb-4">Resume NER with transformers.js</h1>
      <textarea
        className="w-full h-32 border p-2 mb-4"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Paste parsed resume text…"
      />
      <button
        onClick={handleNER}
        disabled={loading}
        className="px-4 py-2 rounded shadow"
      >
        {loading ? 'Analyzing…' : 'Run NER '}
      </button>

      {entities.length > 0 && (
        <ul className="mt-4 list-disc pl-5">
          {entities.map((e, i) => (
            <li key={i}>
              <strong>{e.entity}</strong>: “{e.word}” (
              {(e.score * 100).toFixed(1)}%)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}