import NextAuth, { Session } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from "next-auth/providers/google"
import { prisma } from './db';
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
      Google,
      Credentials({name: "credentials",
        credentials: {
          email: {label: "email", type: "text"},
          password: {label: "password", type: "password"},
        },
        async authorize(credentials){
          if(!credentials?.email || !credentials?.password){
            throw new Error("Invalid credentials");
          }
          const user = await prisma.profile.findUnique({
            where: {email: credentials.email as string},
          });
          if(!user) throw new Error("Invalid credentials");
          const valid = await bcrypt.compare(credentials.password as string, user.password as string);
          if(!valid) throw new Error("Invalid credentials");
          return {
            id: user.id,
            email: user.email,
          };
        },
      }),
    ],
    pages: {
      signIn: "/login",
    },
    session: {strategy: "jwt"},
    callbacks: {
      async jwt({token, user}){
        if(user){
          token.user = {
            id: user.id,
            email: user.email,
          };
        } 
        return token;
      },
      async session({session, token}){
        if(token.user){
          session.user = token.user as any;
        }
        return session;
      },
    },
});