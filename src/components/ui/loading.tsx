import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <section className="flex items-center justify-center min-h-screen bg-background">
            <Loader2 className="h-4 w-4 animate-spin" />
        </section>
    );
}
