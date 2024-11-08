import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function SignIn() {
    return (
        <main className="flex flex-col justify-center items-center">
            <Button onClick={() => signIn("twitter")}>Sign In</Button>
        </main>
    );
}
