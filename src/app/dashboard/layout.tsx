"use client";

import { Open_Sans } from "next/font/google";

import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import AuthSessionProvider from "@/components/session-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-open-sans",
    weight: ["300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`antialiased ${openSans.variable}`}>
                <AuthSessionProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <SidebarProvider>
                            <AppSidebar />
                            <main className="w-full">
                                <SidebarTrigger />
                                {children}
                            </main>
                        </SidebarProvider>
                    </ThemeProvider>
                </AuthSessionProvider>
            </body>
        </html>
    );
}
