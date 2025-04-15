import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Spotify({
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      authorization: `https://accounts.spotify.com/authorize?scope=${encodeURIComponent("user-top-read")}`
    })
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url ? url : baseUrl;
    },
    async jwt({ token, account }) {
      if (account?.provider === "spotify") {
        return {
          ...token,
          access_token: account.access_token!,
          token_expires_at: account.expires_at! * 1000
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      session.token_expires_at = token.token_expires_at;
      return session;
    }
  }
})
