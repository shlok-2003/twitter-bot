"use client";

import { useState } from "react";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { useAuthenticates } from "@/hooks/use-authenicate";

import { LanguageOptions } from "@/lib/utils";
import { generateTweet } from "@/lib/actions/gemini.actions";

export default function Page() {
    const { session, status } = useAuthenticates();

    const [language, setLanguage] =
        useState<(typeof LanguageOptions)[number]>("English");
    const [style, setStyle] = useState("");
    const [description, setDescription] = useState("");
    const [keywords, setKeywords] = useState("");
    const [tweet, setTweet] = useState("");

    const [generating, setGenerating] = useState<"false" | "true" | "done">(
        "false",
    );

    const handleGenerateTweet = async () => {
        setGenerating("true");
        try {
            const tweet = await generateTweet({
                language,
                style,
                description,
                keywords,
            });
            setTweet(tweet);
        } catch (error) {
            console.error(error);
        } finally {
            setGenerating("done");
        }
    };

    if (status === "loading") {
        return <Loading />;
    }

    return (
        <div className="min-h-screen font-open-sans">
            <div className="container mx-auto p-4 bg-background text-foreground min-h-screen flex flex-col gap-5">
                <Card className="w-full max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            Tweet Generator
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="language">Language</Label>
                            <Select
                                value={language}
                                onValueChange={(value) =>
                                    setLanguage(value as typeof LanguageOptions[number])
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a language" />
                                </SelectTrigger>
                                <SelectContent>
                                    {LanguageOptions.map((lang) => (
                                        <SelectItem key={lang} value={lang}>
                                            {lang}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="style">Style of Writing</Label>
                            <Input
                                id="style"
                                placeholder="Enter writing style"
                                value={style}
                                onChange={(e) => setStyle(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Enter tweet description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="keywords">
                                Keywords (comma-separated)
                            </Label>
                            <Input
                                id="keywords"
                                placeholder="Enter keywords"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start space-y-4">
                        <Button
                            // disabled={generating === "true"}
                            onClick={handleGenerateTweet}
                        >
                            {generating === "true" ? (
                                <Loading />
                            ) : (
                                "Generate Tweet"
                            )}
                        </Button>
                    </CardFooter>
                </Card>

                {generating === "done" && (
                    <Card className="w-full max-w-2xl mx-auto">
                        <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                                <Avatar>
                                    {session?.user?.image ? (
                                        <AvatarImage
                                            src={session.user.image}
                                            alt="User"
                                        />
                                    ) : (
                                        <Skeleton className="w-10 h-10 rounded-full" />
                                    )}
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <h3 className="font-bold">User Name</h3>
                                        <span className="text-sm text-muted-foreground">
                                            @{session?.user?.name}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-base">{tweet}</p>
                                    <div className="flex items-center mt-4 space-x-6 text-muted-foreground">
                                        <button className="flex items-center space-x-2 hover:text-primary">
                                            <MessageCircle className="w-5 h-5" />
                                            <span>0</span>
                                        </button>
                                        <button className="flex items-center space-x-2 hover:text-green-500">
                                            <Repeat2 className="w-5 h-5" />
                                            <span>0</span>
                                        </button>
                                        <button className="flex items-center space-x-2 hover:text-red-500">
                                            <Heart className="w-5 h-5" />
                                            <span>0</span>
                                        </button>
                                        <button className="flex items-center space-x-2 hover:text-primary">
                                            <Share className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
