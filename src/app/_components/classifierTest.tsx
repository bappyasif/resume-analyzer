"use client";

import React, { useEffect } from 'react'
// import { pipeline } from "@huggingface/transformers"
import { pipeline } from "@xenova/transformers";

// type Entity = {
//     entity: string;
//     score: number;
//     index: number;
//     word: string;
// }

// const runForEntityRecognition = async (text: string) => {
//     const classifier = await pipeline('token-classification', 'Xenova/bert-base-NER');
//     const output = await classifier(text, { ignore_labels: [] });

//     const extractedEntities = {
//         persons: [],
//         organizations: [],
//         locations: [],
//         dates: [],
//         titles: []
//     };

//     output.forEach((entity) => {
//         switch (entity.entity) {
//             case "PERSON":
//                 extractedEntities.persons.push(entity.word);
//                 break;
//             case "ORGANIZATION":
//                 extractedEntities.organizations.push(entity.word);
//                 break;
//             case "LOCATION":
//                 extractedEntities.locations.push(entity.word);
//                 break;
//             case "DATE":
//                 extractedEntities.dates.push(entity.word);
//                 break;
//             case "TITLE":
//                 extractedEntities.titles.push(entity.word);
//                 break;
//             default:
//                 break;
//         }
//     });

//     console.log(extractedEntities, "!!entity--result!!", output);
// };

export const ClassifierTest = ({ text }: { text: string }) => {

    const runOnce = async () => {
        const reviewer = await pipeline('sentiment-analysis', 'Xenova/bert-base-multilingual-uncased-sentiment');

        const result = await reviewer('The Shawshank Redemption is a true masterpiece of cinema.');
        console.log(result, "result!!");
        // [{label: '5 stars', score: 0.8167929649353027}]
    }

    const runForText = async (text: string) => {
        const reviewer = await pipeline('sentiment-analysis', 'Xenova/bert-base-multilingual-uncased-sentiment');

        const result = await reviewer(text);
        console.log(result, "!!text--result!!");
        // [{label: '5 stars', score: 0.8167929649353027}]
    }

    const runForClassify = async (text: string) => {
        const classifier = await pipeline('zero-shot-classification');

        const result = await classifier(text, ['positive', 'negative']);
        console.log(result, "!!classification--result!!");
        // [{labels: ['positive', 'negative'], scores: [0.8167929649353027, 0.1832070350646973]}]
    }

    // const runForEntityRecognition = async (text: string) => {
    //     const ner = await pipeline('ner');

    //     const result = await ner(text);
    //     console.log(result, "!!entity--result!!");
    //     // [{entity_group: 'ORG', score: 0.8167929649353027, word: 'Xenova', start: 0, end: 6}]
    // }

    // const runForEntityRecognition = async (text: string) => {
    //     const classifier = await pipeline('token-classification', 'Xenova/bert-base-NER');
    //     const output = await classifier('Sarah lives in the United States of America', { ignore_labels: [] });
    //     console.log(output, "!!entity--result!!");
    // }

    // this is functioning but not really in way i wanted
    // const runForEntityRecognition = async (text: string) => {
    //     // const classifier = await pipeline('token-classification', 'Xenova/bert-base-NER');
    //     const classifier = await pipeline('token-classification', 'Xenova/bert-base-uncased');
    //     // const classifier = await pipeline('token-classification', 'DistilBERT-NER'); // this requires hf api key

    //     // const classifier = await pipeline('token-classification', 'Xenova/bert-base-multilingual-uncased-sentiment');
    //     const output = await classifier(text, { ignore_labels: [] }); // this produces result which is not what i want
    //     // const output = await classifier(text); // this produces no result!!
    //     console.log(output, "!!entity--result!!");

    //     const keywords: string[] = [];
    //     output.forEach((entity: any) => {
    //         // if (!entity?.score) return;
    //         if (entity?.score > 0.5) {
    //             keywords.push(entity.word);
    //         }
    //     });
    //     console.log(keywords, "!!keywords!!");
    // }

    const runForEntityRecognition = async (text: string) => {
        const classifier = await pipeline('token-classification', 'Xenova/bert-base-NER');
        // const classifier = await pipeline('token-classification', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
        // const classifier = await pipeline('token-classification', 'deepset/bert-base-cased-squad2');
        // const output = await classifier("Asifuzzaman Bappy Fullstack Developer", { ignore_labels: [] });

        const output = await classifier(text, { ignore_labels: [] }); // this produces result which is not what i want
        // const output = await classifier(text); // this produces no result!!
        console.log(output, "!!entity--result!!");

        const keywords: string[] = [];
        output.forEach((entity: any) => {
            // if (!entity?.score) return;
            if (entity?.score > 0.5) {
                keywords.push(entity.word);
            }
        });
        console.log(keywords, "!!keywords!!");
    }

    const anotherNER = async () => {
        console.log("anotherNER called!!");
        // const classifier = await pipeline('token-classification', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
        // const output = await classifier(text, { ignore_labels: [] });
        // console.log(output, "!!entity--result!!");
        const classifier = await pipeline('token-classification', 'Xenova/bert-base-NER');
        // const classifier = await pipeline('token-classification', 'dslim/bert-base-NER-uncased'); // they reuire some json file which stays missing for some reason unknown to me..
        // const output = await classifier('My name is Sarah and I live in London');
        // const output = await classifier(text);
        const output = await classifier(text, { ignore_labels: [] });
        console.log(output, "!!entity--result!!", text);
    }

    useEffect(() => {
        // runForText(text);
        // runForClassify(text);
        // runForEntityRecognition(text);
        anotherNER();
    }, [text])

    useEffect(() => {
        anotherNER();
        // runOnce();
        // runForEntityRecognition(text);
    }, [])

    return (
        <div>classifierTest!!</div>
    )
}
