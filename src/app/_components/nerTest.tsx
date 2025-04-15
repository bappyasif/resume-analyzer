import React, { useState } from 'react'
import { runClientNER } from '~/lib/clientNER';

export const NerTest = ({parsedText}: {parsedText: string}) => {
    const [text, setText] = useState<string>(parsedText);
  const [entities, setEntities] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLocalNER = async () => {
    setLoading(true);
    const ner = await runClientNER(text);
    setEntities(ner);
    setLoading(false);
  };

  const handleServerNER = async () => {
    setLoading(true);
    const res = await fetch('/api/ner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      // body: JSON.stringify({ text }),
    });
    const ner = await res.json();
    setEntities(ner);
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Resume NER Demo</h1>
      <textarea
        className="w-full h-40 border p-2 mb-4"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Paste your parsed resume text here…"
      />
      <div className="space-x-2 mb-4">
        <button onClick={handleLocalNER} disabled={loading} className="px-4 py-2 rounded shadow">
          Local NER
        </button>
        <button onClick={handleServerNER} disabled={loading} className="px-4 py-2 rounded shadow">
          Server NER
        </button>
      </div>
      {loading && <p>Processing…</p>}
      {!loading && entities.length > 0 && (
        <ul className="list-disc pl-5">
          {entities.map((e, i) => (
            <li key={i}>
              <strong>{e.entity}</strong>: “{e.word}” ({(e.score * 100).toFixed(1)}%)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
