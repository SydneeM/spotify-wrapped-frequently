import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Spotify({
      clientId: process.env.AUTH_SPOTIFY_ID,
      clientSecret: process.env.AUTH_SPOTIFY_SECRET,
      authorization: `https://accounts.spotify.com/authorize?scope=${encodeURIComponent("user-top-read")}`
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "spotify") {
        return { ...token, accessToken: account.access_token };
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    }
  }
})
