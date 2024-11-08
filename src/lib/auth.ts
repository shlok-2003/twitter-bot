import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        TwitterProvider({
            clientId: process.env.AUTH_TWITTER_ID,
            clientSecret: process.env.AUTH_TWITTER_SECRET,
        }),
    ],
    callbacks: {
        authorized: async ({ auth }) => {
            return !!auth;
        },
        jwt: async ({ token, profile }) => {
            if (profile) {
                token.profile = profile;
            }

            return token;
        },
        session: async ({ session, token }) => {
            if (token.profile) {
                session.user.profile = token.profile;
            }
            return session;
        }
    },
});
