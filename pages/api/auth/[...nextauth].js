import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"

export default NextAuth({
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  secret:"Thisisarandomlygeneratedmessageorsoyouthinkitishaahahah",
  adapter: MongoDBAdapter(clientPromise),
  session: {
    //I needed to add the following code because chrome was letting it run due to 3rd party cookies and instead of the changing the chrome settings, I added this.  The most important part is the sameSite part at the bottom and how it is set to lax
    // Use JSON Web Tokens for session handling
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - How often to update the session, values below 60 seconds are ignored.
    updateAge: 24 * 60 * 60, // 24 hours

    // The cookie name
    cookieName: 'next-auth.session-token',

    // The cookie options
    cookieOptions: {
      // Path
      path: '/',

      // Use secure cookies in production (via "set-cookie" header)
      secure: process.env.NODE_ENV === 'production',

      // Specifies the value for the Domain Set-Cookie attribute
      domain: undefined,

      // Specifies the value for the SameSite Set-Cookie attribute
      sameSite: 'lax'
    }
  }
})