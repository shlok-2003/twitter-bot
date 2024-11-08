import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

export const useAuthenticates = () => {
    const router = useRouter();
    const { data: session, status } = useSession({
        required: true,
        async onUnauthenticated() {
            toast({
                title: "You are not authorized to access this page",
                description: "Please sign in to continue",
                variant: "destructive",
            });

            await new Promise((resolve) => setTimeout(resolve, 400));
            router.replace("/auth/sign-in");
        },
    });

    if (status === "loading") {
        return { session: null, status };
    }

    return { session, status };
};
