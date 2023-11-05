import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from '@code-ide/db';
import { signupSchema } from '@code-ide/types';
const prismaClient = new PrismaClient();
const handler = NextAuth({
    providers: [
        GoogleProvider({
            id: 'google',
            clientId: process.env.NEXT_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET!
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    callbacks: {
        async signIn(signInData) {
            const { name, email } = signInData.user;
            const signupData = signupSchema.safeParse({ name, email });
            console.log({signupData})
            if(!signupData.success) {
                return false;
            }
            const parsedInput = signupData.data;
            const dbUser = await prismaClient.user.upsert({
                where: { email: parsedInput.email },
                update: { },
                create: { email: parsedInput.email, name: parsedInput.name }
            });
            if(dbUser) {
                return true;
            }
            return false;
        }
    },
    pages: {
        signIn: '/signin',
    }
});
export { handler as GET, handler as POST }