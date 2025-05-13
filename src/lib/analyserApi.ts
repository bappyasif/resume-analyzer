// lib/api.ts
export const analyzeResume = async (text: string) => {
  const res = await fetch(
    // 'https://resume-ner-api-flask.onrender.com/analyze'
    // 'https://resume-ner-api-flask.onrender.com/analyze',
    // 'https://resume-ner-api-flask.onrender.com/structured-analyze',
    'https://resume-ner-api-flask.onrender.com/deep-structured-analyze',
    // 'https://resume-ner-api-flask.onrender.com/resume-summary',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

  if (!res.ok) throw new Error('NER API failed');

  const response = await res.json();

  console.log(response, text, "WTF!");

  // return await res.json();
  return response;
};
