import { loginUser, loginWithGoogle } from "@/app/api/services/authApi";
import { nextAuthSecret } from "@/configs/config";
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
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
// import { loginUser } from "@/app/api/services/authApi";
// import { nextAuthSecret } from "@/configs/config";
// import type { NextAuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";

// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   secret: nextAuthSecret,
//   providers: [
//     Credentials({
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "example@example.com",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//         },
//       },
//       async authorize(credentials) {
//         const { email, password } = credentials;
//         const user = await loginUser({ email, password });
//         if (user) {
//           return user;
//         } else {
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account }) {
//       const { data } = user;
//       account.accessToken = data.data.accessToken;
//       // account.level = data.data.level;
//       // account.username = data.data.username;
//       account.userId = data.data.id;
//       return true;
//     },
//     async jwt({ token, account }) {
//       if (account) {
//         token.accessToken = account.accessToken;
//         // token.level = account.level;
//         // token.name = account.name;
//         // token.username = account.username;
//         token.userId = account.userId;
//       }
//       return token;
//     },
//     async session({ session, token, user }) {
//       session.user = token;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/login",
//   },
// };
