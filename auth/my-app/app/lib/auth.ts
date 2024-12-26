import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password", placeholder: "password" },
      },
      async authorize(credentials, req) {

        console.log(credentials);
          return {
            id: "1",
            name: "Raj",
          };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET||''
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: any) {
      session.user_id=token.sub
      return session; // Optionally enrich the session here with custom data
    },

  },
};
