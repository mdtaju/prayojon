import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// twilo password #uiIe89KJIIe0)9(@(loep{
export default NextAuth({
      providers: [
            GoogleProvider({
                  clientId: process.env.GOOGLE_CLIENT_ID,
                  clientSecret: process.env.GOOGLE_CLIENT_SECRET
            })
      ]
})