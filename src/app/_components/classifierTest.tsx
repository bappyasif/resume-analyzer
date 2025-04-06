"use client";

import React, { useEffect } from 'react'
import { pipeline } from "@huggingface/transformers"

export const ClassifierTest = ({ text }: { text: string }) => {

    const runOnce = async () => {
        const reviewer = await pipeline('sentiment-analysis', 'Xenova/bert-base-multilingual-uncased-sentiment');

        const result = await reviewer('The Shawshank Redemption is a true masterpiece of cinema.');
        console.log(result, "result!!");
        // [{label: '5 stars', score: 0.8167929649353027}]
    }

    useEffect(() => {
        runOnce();
    }, [])

    return (
        <div>classifierTest</div>
    )
}
