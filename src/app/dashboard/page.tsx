import { useSession } from "next-auth/react";

export default function Page() {
    const { data: session } = useSession();

    return (
        <main>
            This is the dashboard

            <pre>{JSON.stringify(session, null, 2)}</pre>
        </main>
    );
}