"use client";

import React, { useState } from "react";
import {
    MessageCircle,
    Repeat,
    Heart,
    ArrowLeft,
    ArrowRight,
    RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ModeToggle } from "@/components/theme-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import Information from "@/components/information";
import { Skeleton } from "@/components/ui/skeleton";
import { generateSimilarTweet, generateTweet } from "@/lib/genai";
import { toast } from "@/hooks/use-toast";

const styles = [
    "Professional",
    "Casual",
    "Humorous",
    "Informative",
    "Inspirational",
    "Controversial",
    "Sarcastic",
    "Formal",
    "Friendly",
    "Persuasive",
] as const;

const languages = [
    "English",
    "Spanish",
    "Chinese",
    "Tagalog",
    "Vietnamese",
    "French",
    "Arabic",
    "Korean",
    "Russian",
    "German",
    "Haitian Creole",
    "Portuguese",
    "Italian",
    "Hindi",
    "Polish",
    "Japanese",
    "Urdu",
    "Persian",
    "Gujarati",
    "Telugu",
];

type Style = (typeof styles)[number];
type Language = (typeof languages)[number];

export default function TweetGenerator() {
    const [style, setStyle] = useState<Style>("Formal");
    const [language, setLanguage] = useState<Language>("English");
    const [description, setDescription] = useState<string>("");
    const [keywords, setKeywords] = useState<string>("");
    const [hashtagCount, setHashtagCount] = useState<number>(3);
    const [generatedTweets, setGeneratedTweets] = useState<string[]>([]);
    const [currentTweetIndex, setCurrentTweetIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await generateTweet({
                style,
                language,
                description,
                keywords,
                hashtagCount,
            });

            setGeneratedTweets((prev) => [...prev, response]);
            setCurrentTweetIndex(generatedTweets.length);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to generate tweet",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateSimilar = async () => {
        setIsLoading(true);
        
        try {
            const currentTweet = generatedTweets[currentTweetIndex];
            const response = await generateSimilarTweet({
                style,
                language,
                description,
                keywords,
                hashtagCount,
                currentTweet,
            });

            setGeneratedTweets((prev) => [...prev, response]);
            setCurrentTweetIndex(generatedTweets.length);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to generate similar tweet",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const currentTweet = generatedTweets[currentTweetIndex];

    return (
        <div className="min-h-screen bg-background font-openSans">
            <div className="container mx-auto p-4">
                <div className="flex justify-end mb-4">
                    <ModeToggle />
                </div>
                <div className="flex flex-col lg:flex-row gap-4">
                    <form
                        onSubmit={handleGenerate}
                        className="w-full lg:w-1/2"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>AI Tweet Generator</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="style">
                                        Step 1: Select your style
                                    </Label>
                                    <Select
                                        value={style}
                                        onValueChange={(value: Style) =>
                                            setStyle(value)
                                        }
                                        required
                                    >
                                        <SelectTrigger id="style">
                                            <SelectValue placeholder="Select style" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <ScrollArea className="h-64">
                                                {styles.map((s) => (
                                                    <SelectItem
                                                        key={s}
                                                        value={s}
                                                    >
                                                        {s}
                                                    </SelectItem>
                                                ))}
                                            </ScrollArea>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="language">
                                        Step 2: Select your language
                                    </Label>
                                    <Select
                                        value={language}
                                        onValueChange={(value: Language) =>
                                            setLanguage(value)
                                        }
                                        required
                                    >
                                        <SelectTrigger id="language">
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <ScrollArea className="h-64">
                                                {languages.map((l) => (
                                                    <SelectItem
                                                        key={l}
                                                        value={l}
                                                    >
                                                        {l}
                                                    </SelectItem>
                                                ))}
                                            </ScrollArea>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">
                                        Step 3: Add a short description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        placeholder="Enter a brief description of your tweet"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="keywords">
                                        Step 4: Add your keywords
                                    </Label>
                                    <Input
                                        id="keywords"
                                        value={keywords}
                                        onChange={(e) =>
                                            setKeywords(e.target.value)
                                        }
                                        placeholder="Enter keywords separated by commas"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="hashtags">
                                        Number of hashtags: {hashtagCount}
                                    </Label>
                                    <Slider
                                        id="hashtags"
                                        min={0}
                                        max={5}
                                        step={1}
                                        value={[hashtagCount]}
                                        onValueChange={(value) =>
                                            setHashtagCount(value[0])
                                        }
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    disabled={isLoading}
                                    className="w-full"
                                    type="submit"
                                >
                                    {isLoading
                                        ? "Generating..."
                                        : "Generate Tweet"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>

                    <Card className="w-full lg:w-1/2">
                        <CardHeader>
                            <CardTitle>Generated Tweet</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
                                </div>
                            ) : currentTweet ? (
                                <div className="border rounded-lg p-4 space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Skeleton className="size-10 rounded-full" />

                                        <div className="flex items-center space-x-2">
                                            <div>
                                                <p className="font-bold">
                                                    AI Tweet Generator
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    @AITweetGen
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <p>{currentTweet}</p>
                                    <div className="flex justify-between text-muted-foreground">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="flex items-center space-x-2"
                                        >
                                            <MessageCircle className="h-5 w-5" />
                                            <span>0</span>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="flex items-center space-x-2"
                                        >
                                            <Repeat className="h-5 w-5" />
                                            <span>0</span>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="flex items-center space-x-2"
                                        >
                                            <Heart className="h-5 w-5" />
                                            <span>0</span>
                                        </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Character count: {currentTweet.length}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-center text-muted-foreground">
                                    Your generated tweet will appear here
                                </p>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button
                                onClick={() =>
                                    setCurrentTweetIndex(
                                        Math.max(0, currentTweetIndex - 1),
                                    )
                                }
                                disabled={currentTweetIndex === 0 || isLoading}
                                variant="outline"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Previous
                            </Button>
                            <Button
                                onClick={handleGenerateSimilar}
                                disabled={!currentTweet || isLoading}
                                variant="outline"
                            >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Generate Similar
                            </Button>
                            <Button
                                onClick={() =>
                                    setCurrentTweetIndex(
                                        Math.min(
                                            generatedTweets.length - 1,
                                            currentTweetIndex + 1,
                                        ),
                                    )
                                }
                                disabled={
                                    currentTweetIndex ===
                                        generatedTweets.length - 1 ||
                                    isLoading ||
                                    generatedTweets.length === 0
                                }
                                variant="outline"
                            >
                                Next
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                <Information />
            </div>
        </div>
    );
}
