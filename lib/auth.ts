import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Discord from "next-auth/providers/discord";
import prisma from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Facebook, Discord],

  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name ?? "",
            images: user.image ?? "",
          },
        });
      }
      return true;
    },
  },
});
