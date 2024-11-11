"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

interface TweetProps {
    style: string;
    language: string;
    description: string;
    keywords: string;
    hashtagCount: number;
}

export async function generateTweet({
    style,
    language,
    description,
    keywords,
    hashtagCount,
}: TweetProps) {
    const model = gemini.getGenerativeModel({
        model: "gemini-1.5-pro",
        generationConfig: {
            responseMimeType: "text/plain",
        },
    });

    try {
        const response = await model.generateContent(
            `
                You are a highly skilled social media manager with advanced expertise in crafting tweets that are both engaging and have a strong 
                potential to go viral. Your experience enables you to create concise, resonant messages that align with current trends and effectively 
                engage the audience.

                I will provide you with a product or service description, a specific style, and relevant keywords associated with it. Your task is to 
                create a tweet that embodies the designated ${style} tone and is written in ${language}. The tweet should capture the essence of ${description} 
                while incorporating the following keywords: ${keywords}.

                Additionally, ensure the tweet includes precisely ${hashtagCount} relevant, trending hashtags. These hashtags should enhance visibility and 
                engagement within the targeted community. Remember that the tweet must be concise, impactful, and strictly limited to 280 characters to 
                maximize readability and shareability on Twitter.
            `,
        );

        const result = response.response;
        console.log(result.text());

        return result.text();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

type GenerateSimilarTweetProps = TweetProps & {
    currentTweet: string;
}

export async function generateSimilarTweet({
    style,
    language,
    description,
    keywords,
    hashtagCount,
    currentTweet,
}: GenerateSimilarTweetProps) {
    const model = gemini.getGenerativeModel({
        model: "gemini-1.5-pro",
        generationConfig: {
            responseMimeType: "text/plain",
        },
    });

    try {
        const response = await model.generateContent(
            `
                You are a highly skilled social media manager with expertise in creating tweets that are both engaging and have a strong potential 
                to go viral. Your experience allows you to craft impactful, concise messages that resonate with the audience and align with current 
                trends.

                I will provide you with an existing tweet along with a product or service description, a specific style, and relevant keywords 
                associated with it. Your task is to create a similar tweet that maintains the essence and tone of the original tweet, written 
                in ${language} and matching the ${style} provided. This new tweet should clearly communicate the key aspects of ${description} 
                while incorporating the following keywords: ${keywords}.

                Additionally, ensure the tweet includes exactly ${hashtagCount} relevant, trending hashtags to boost visibility and engagement 
                within the target community. Remember to keep the tweet concise, impactful, and within Twitter's 280-character limit to optimize 
                readability and shareability.

                The resulting tweet should feel like a natural extension or variation of the original tweet, I am attaching the original tweet below:
                ${currentTweet}. Staying true to its core message while presenting it in a fresh way that aligns with the given style and language.
            `,
        );

        const result = response.response;
        console.log(result.text());

        return result.text();
    } catch (error) {
        console.error(error);
        throw error;
    }
}