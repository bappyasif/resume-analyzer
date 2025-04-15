// pages/api/ner.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

type NerResult = {
  entity_group: string;
  score: number;
  word: string;
  start: number;
  end: number;
}[];

type NerResponse = {
  data: NerResult;
};

const MODEL = 'reyhanemyr/bert-base-NER-finetuned-cv';
const HF_URL = `https://api-inference.huggingface.co/models/${MODEL}`;

export async function POST(
    req: Request,
//   req: NextApiRequest,
//   res: NextApiResponse<NerResult | { error: string }>
// res:NextApiResponse
) {
  if (req.method !== 'POST') {
    // return res.status(405).json({ error: 'Method not allowed' });
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

//   console.log(await req.body);

const data = await req.json();
console.log(data, "`data`");

//   const { text } = await req.body as { text: string };
//   if (!text) {
//     // return res.json({ error: 'Missing `text` in request body' });
//     // return res.json({ error: 'Missing `text` in request body' });
//     return NextResponse.json({ error: 'Missing `text` in request body' }, { status: 400 });
//   }

  try {
    const HF_API = process.env.HF_API_KEY;
    if (!HF_API) throw new Error('HF_API_KEY not set');

    const response = await fetch(
    //   'https://api-inference.huggingface.co/models/your-username/resume-ner-custom',
      HF_URL,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${HF_API}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: "text skills" }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`HF Inference API error: ${err}`);
    }

    const nerResults = (await response.json()) as NerResult;
    // return res.status(200).json(nerResults);
    return NextResponse.json(nerResults, { status: 200 });
  } catch (error: any) {
    console.error(error);
    // return res.status(500).json({ error: error.message });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
