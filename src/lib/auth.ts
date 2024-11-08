import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        TwitterProvider({
            clientId: process.env.AUTH_TWITTER_ID,
            clientSecret: process.env.AUTH_TWITTER_SECRET,
        }),
    ],
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        authorized: async ({ auth }) => {
            return !!auth;
        },
        jwt: async ({ token, account, profile, user }) => {
            // if (user) {
            //     token.id = user.id;
            // }

            console.log({ token, account, profile, user });
            return token;
        },
        session: async ({ session }) => {
            // if (token.sub && session.user) {
            //     session.user.id = token.sub;
            // }
            return session;
        },
        signIn: async ({ user, account, profile, email, credentials }) => {
            console.log({ user, account, profile, email, credentials });
            return true;
        },
    },
});
