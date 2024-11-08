"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

interface GenerateTweetProps {
    language: string;
    style: string;
    description: string;
    keywords: string;
}

export const generateTweet = async ({
    language,
    style,
    description,
    keywords,
}: GenerateTweetProps): Promise<string> => {
    const model = gemini.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
            responseMimeType: "text/plain",
        },
    });

    const response = await model.generateContent(
        `
            You are a professional social media manager who specializes in creating engaging and viral tweets. 
            Now, I come to you with a description of a product or service and some keywords that are related to it.
            Your job is to create a tweet that is ${style} and strictly in ${language}.
            The tweet must be regarding ${description} and it should include the following keywords: ${keywords}.
            Add the related hashtags to the tweet.
            Also, the tweet should be no longer than 280 characters. This is very important.
        `,
    );

    const result = response.response;
    console.log(result.text());
    return result.text();
};
