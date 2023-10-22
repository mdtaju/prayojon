import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axiosInstance from "../../../src/config/axios";
// twilo password #uiIe89KJIIe0)9(@(loep{
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        try {
          const res = await axiosInstance.post("/user_login", {
            phone: credentials.phone,
            password: credentials.password,
          });
          if (res?.data?.id) {
            return { email: res?.data?.id };
          } else {
            return null;
          }
        } catch (error) {
          throw new Error("No user Found with Phone Please Sign Up...!");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        if (profile.email_verified) {
          return true;
        } else {
          return false;
        }
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    session: async (session, user) => {
      if (session?.token?.picture) {
        const res = await axiosInstance.post("/register_with_provider", {
          name: session?.token?.name,
          photo: session?.token?.picture,
          email: session?.token?.email,
        });
        if (res?.data?.id) {
          session.session.user.email = res?.data?.id;
        } else {
          session.session.user.email = "";
        }
        return Promise.resolve(session.session);
      } else {
        return Promise.resolve(session.session);
      }
    },
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  // session: {
  //       strategy: 'jwt',
  // }
});
