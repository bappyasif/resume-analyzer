'use client';
import { useState } from 'react';
import { analyzeResume } from '~/lib/analyserApi';


export default function NERAnalyzer({parsedText}: {parsedText: string}) {
  const [text, setText] = useState(parsedText);
  const [result, setResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const nerResult = await analyzeResume(text);
      setResult(nerResult);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  console.log(result, "RESULT")

  return (
    <div className="p-4 space-y-4">
      <textarea
        rows={6}
        className="w-full border rounded p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste resume text here..."
      />
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      <div className="mt-4">
        {/* {
          if (Array.isArray(result)) {
            // This is from /analyze
            result.map((r) => { ... });
          } else {
            // This is from /deep-structured-analyze
            // Access `skills`, `experience`, etc
            result.skills.map((skill) => { ... });
            result.experience.map((exp) => { ... });
          }
        } */}
        {Array.isArray(result) && result.map((entity, idx) => (
          <div key={idx} className="text-sm text-gray-800">
            <strong>{entity.entity_group}</strong>: {entity.word}
          </div>
        ))}
      </div>
    </div>
  );
}
