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
        return {
          ...token,
          access_token: account.access_token,
          expires_at: account.expires_at ?? 0,
          refresh_token: account.refresh_token
        };
      } else if (Date.now() < (token.expires_at ?? 0) * 1000) {
        return token;
      } else {
        if (!token.refresh_token) throw new TypeError("Missing refresh_token");

        try {
          const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
              client_id: process.env.AUTH_SPOTIFY_ID!,
              client_secret: process.env.AUTH_SPOTIFY_SECRET!,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token!
            })
          });

          const tokens = await response.json();

          if (!response.ok) throw tokens;

          return {
            ...token,
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            refresh_token: tokens.refresh_token ?? token.refresh_token
          }

        } catch (error) {
          console.error("Error refreshing access_token", error);
          token.error = "RefreshTokenError";
          return token;
        }
      }
    },
    async session({ session, token }) {
      session.accessToken = token.access_token;
      session.error = token.error;
      return session;
    }
  }
})
