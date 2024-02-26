import { loginUser, loginWithGoogle } from "@/app/api/services/authApi";
import { nextAuthSecret } from "@/configs/config";
import { jwtDecode } from "jwt-decode";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: nextAuthSecret,
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials;
          const user = await loginUser({ email, password });
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          throw new Error(`Failed to login with credentials: ${e}`);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account?.provider === "credentials") {
        token.accessToken = user.data.data.accessToken;
        token.refreshToken = user.data.data.refreshToken;
        token.user_id = user.data.data.id;
        token.role = user.data.data.role;
      }
      if (account?.provider === "google") {
        const email = {
          email: user.email,
        };
        const result = await loginWithGoogle(email);
        if (result) {
          token.accessToken = result.data.data.accessToken;
          token.refreshToken = result.data.data.refreshToken;
          token.user_id = result.data.data.id;
          token.role = result.data.data.role;
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = {
        ...token,
        parsed: jwtDecode(token.accessToken),
      };
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
