import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "../../../src/config/axios";
// twilo password #uiIe89KJIIe0)9(@(loep{
export default NextAuth({
      providers: [
            GoogleProvider({
                  clientId: process.env.GOOGLE_CLIENT_ID,
                  clientSecret: process.env.GOOGLE_CLIENT_SECRET
            }),
            CredentialsProvider({
                  name: "Credentials",
                  async authorize(credentials, req) {
                        try {
                              const res = await axios.post("/user_login", {
                                    phone: credentials.phone,
                                    password: credentials.password
                              });
                              return { email: res.data.phone };
                        } catch (error) {
                              throw new Error("No user Found with Phone Please Sign Up...!")
                        }

                  }
            })
      ],
      secret: process.env.NEXTAUTH_SECRET,
      // session: {
      //       strategy: 'jwt',
      // }
})