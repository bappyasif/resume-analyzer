import React, { useState } from 'react'
import { runClientNER } from '~/lib/nerClient';

export function NerTest({parsedText}: {parsedText: string}) {
    const [text, setText] = useState(parsedText);
    const [entities, setEntities] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
  
    const handleNER = async () => {
      setLoading(true);
      try {
        const ner = await runClientNER(text);
        setEntities(ner);
      } finally {
        setLoading(false);
      }
    };
  
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
          {loading ? 'Analyzing…' : 'Run NER'}
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