"use client";

import { useAuthenticates } from "@/hooks/use-authenicate";
import Loading from "@/components/ui/loading";

export default function Page() {
    const { session, status } = useAuthenticates();

    if (status === "loading") {
        return <Loading />;
    }

    return (
        <main>
            This is the dashboard

            {session.user?.name}
            {session.user?.name}
        </main>
    );
}