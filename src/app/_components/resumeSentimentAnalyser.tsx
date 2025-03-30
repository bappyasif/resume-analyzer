// 'use client';

// import { useState, useEffect } from 'react';
// import { pipeline } from '@xenova/transformers';

// // Load the model outside the component (only once)
// let classifier: any = null;

// const loadModel = async () => {
//     classifier = await pipeline('sentiment-analysis', 'distilbert-base-uncased-finetuned-sst-2-english', { quantized: false });
// };

// export const ResumeSentimentAnalyzer = ({ resumeText }: { resumeText: string }) => {
//     const [sentiment, setSentiment] = useState('');
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         // Load the model when the component mounts
//         loadModel().then(() => setIsLoading(false));
//     }, []);

//     useEffect(() => {
//         if (!classifier || isLoading) return; // Don't run if not loaded or still loading

//         const analyzeSentiment = async () => {
//             if (!classifier) return;
//             const output = await classifier(resumeText);
//             setSentiment(output[0].label);
//         };

//         analyzeSentiment();
//     }, [resumeText, isLoading]);

//     return (
//         <div>
//             <h1>Resume Sentiment Analyzer</h1>
//             {isLoading ? (
//                 <p>Loading model...</p>
//             ) : (
//                 <p>Sentiment: {sentiment}</p>
//             )}
//         </div>
//     );
// };


// 'use client';

// import { useState, useEffect } from 'react';
// import { pipeline } from '@xenova/transformers';

// // Load the model and tokenizer outside the component (only once)
// let classifier: any = null;

// const loadModelAndTokenizer = async () => {
//     classifier = await pipeline('ner', 'roberta-large-ner', { quantized: false });
// };

// export const ResumeEntityRecognizer = ({ resumeText }: { resumeText: string }) => {
//     const [entities, setEntities] = useState<any[]>([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         // Load the model and tokenizer when the component mounts
//         loadModelAndTokenizer().then(() => setIsLoading(false));
//     }, []);

//     useEffect(() => {
//         if (!classifier || isLoading) return; // Don't run if not loaded or still loading

//         const recognizeEntities = async () => {
//             if (!classifier) return;
//             const output = await classifier(resumeText);
//             setEntities(output);
//         };

//         recognizeEntities();
//     }, [resumeText, isLoading]);

//     const handleResumeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//         // setResume(event.target.value);
//     };

//     return (
//         <div>
//             <h1>Resume Entity Recognizer</h1>
//             {isLoading ? (
//                 <p>Loading model...</p>
//             ) : (
//                 <>
//                     <textarea value={resumeText} onChange={handleResumeChange} />
//                     <ul>
//                         {entities.map((entity, index) => (
//                             <li key={index}>{entity.entity} - {entity.word} - {entity.score}</li>
//                         ))}
//                     </ul>
//                 </>
//             )}
//         </div>
//     );
// };


'use client';

import { useState, useEffect } from 'react';
import { DistilBertTokenizer, DistilBertModel } from '@huggingface/transformers';

// Load the model and tokenizer outside the component (only once)
let tokenizer: DistilBertTokenizer | null = null;
let model: DistilBertModel | null = null;

const loadModelAndTokenizer = async () => {
    tokenizer = await DistilBertTokenizer.from_pretrained('distilbert-base-uncased');
    model = await DistilBertModel.from_pretrained('distilbert-base-uncased');
    // model = await DistilBertModel.from_pretrained('distilbert-base-uncased');
};

export const ResumeSentimentAnalyzer = ({ resumeText }: { resumeText: string}) => {
    //   const [resume, setResume] = useState('');
    const [sentiment, setSentiment] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load the model and tokenizer when the component mounts
        loadModelAndTokenizer().then(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (!tokenizer || !model || isLoading) return; // Don't run if not loaded or still loading

        const analyzeSentiment = async () => {
            if (!tokenizer || !model) return;
            const inputs = tokenizer.encode(resumeText);
            const outputs = await model(inputs);
            // Assuming the model returns an object with a 'sentiment' property
            // You might need to adjust this based on the actual model output
            const sentiment = outputs[0].logits[0][0] > outputs[0].logits[0][1] ? 'positive' : 'negative';
            setSentiment(sentiment);
        };

        analyzeSentiment();
    }, [resumeText, isLoading]);

      const handleResumeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        // setResume(event.target.value);
      };

    return (
        <div>
            <h1>Resume Sentiment Analyzer</h1>
            {isLoading ? (
                <p>Loading model...</p>
            ) : (
                <>
                    <textarea value={resumeText} onChange={handleResumeChange} />
                    <p>Sentiment: {sentiment}</p>
                </>
            )}
        </div>
    );
};


// 'use client';

// import { useState, useEffect } from 'react';
// import { pipeline } from '@xenova/transformers';

// // Load the model outside the component (only once)
// let classifier: any = null;

// const loadModel = async () => {
//     classifier = await pipeline('sentiment-analysis', 'distilbert-base-uncased-finetuned-sst-2-english', { quantized: false }); // Disable quantization
//     // classifier = await pipeline('sentiment-analysis', 'distilbert-base-uncased-finetuned-sst-2-english'); // Enable quantization
// };

// export const ResumeSentimentAnalyzer = ({ resumeText }: { resumeText: string }) => {
//     const [sentiment, setSentiment] = useState('');
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         // Load the model when the component mounts
//         loadModel().then(() => setIsLoading(false));
//     }, []);

//     useEffect(() => {
//         if (!classifier || isLoading) return; // Don't run if not loaded or still loading

//         const analyzeSentiment = async () => {
//             if (!classifier) return;
//             const output = await classifier(resumeText);
//             setSentiment(output[0].label);
//         };

//         analyzeSentiment();
//     }, [resumeText, isLoading]);

//     return (
//         <div>
//             <h1>Resume Sentiment Analyzer</h1>
//             {isLoading ? (
//                 <p>Loading model...</p>
//             ) : (
//                 <p>Sentiment: {sentiment}</p>
//             )}
//         </div>
//     );
// };


// 'use client';

// import { useState, useEffect } from 'react';
// import { pipeline } from '@xenova/transformers';

// // Load the model outside the component (only once)
// let classifier: any = null;

// const loadModel = async () => {
//     classifier = await pipeline('ner', 'roberta-large-ner', { quantized: false });
// };

// export const ResumeSentimentAnalyzer = ({ resumeText }: { resumeText: string }) => {
//     const [entities, setEntities] = useState<any[]>([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         // Load the model when the component mounts
//         loadModel().then(() => setIsLoading(false));
//     }, []);

//     useEffect(() => {
//         if (!classifier || isLoading) return; // Don't run if not loaded or still loading

//         const recognizeEntities = async () => {
//             if (!classifier) return;
//             const output = await classifier(resumeText);
//             setEntities(output);
//         };

//         recognizeEntities();
//     }, [resumeText, isLoading]);

//     return (
//         <div>
//             <h1>Resume Entity Recognizer</h1>
//             {isLoading ? (
//                 <p>Loading model...</p>
//             ) : (
//                 <ul>
//                     {entities.map((entity, index) => (
//                         <li key={index}>{entity.entity} - {entity.word} - {entity.score}</li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };
