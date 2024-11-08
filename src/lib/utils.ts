import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const LanguageOptions = [
    "Spanish",
    "Chinese",
    "German",
    "Tagalog",
    "Vietnamese",
    "Arabic",
    "French",
    "Korean",
    "Russian",
    "English",
    "Portuguese",
    "Cantonese",
    "Haitian Creole",
    "Louisiana French",
    "Italian",
    "Japanese",
    "Hindi",
    "Yiddish",
] as const;