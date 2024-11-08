import { useSession } from "next-auth/react";

export default function Page() {
    const { data: session } = useSession();

    return (
        <main>
            This is the dashboard

            {session?.user?.name}
        </main>
    );
}