import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password",placeholder: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        return {
          id :'1',
          name:'raj'
        };
      },
      
    }),
  ],
  secret:process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
