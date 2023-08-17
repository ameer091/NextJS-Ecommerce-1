import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { parse } from 'cookie';

const adminEmails = ['ameersf0@gmail.com'];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  secret: "Thisisarandomlygeneratedmessageorsoyouthinkitishaahahah",
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: async ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email)) {
        return Promise.resolve(session);
      }

      // Check for demo mode flag in the session
      if (session?.demoMode) {
        return Promise.resolve(session);
      }

      return false;
    }
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: undefined,
        sameSite: 'lax'
      },
    },
  },
}

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);

  // Check for the demoMode in the cookies
  const cookies = parse(req.headers.cookie || '');
  const demoMode = cookies['demoMode'] === 'true';

  if (!adminEmails.includes(session?.user?.email) && !demoMode) {
    res.status(401);
    res.end();
    throw 'not an admin';
  }
}


//   session: {
       //This code has been blanked out because I needed to add somethings to the top in the session and callbackl, but I wanted to keep this so that I could see what I did initially.
//     //I needed to add the following code because chrome was letting it run due to 3rd party cookies and instead of the changing the chrome settings, I added this.  The most important part is the sameSite part at the bottom and how it is set to lax
//     // Use JSON Web Tokens for session handling
//     jwt: true,

//     // Seconds - How long until an idle session expires and is no longer valid.
//     maxAge: 30 * 24 * 60 * 60, // 30 days

//     // Seconds - How often to update the session, values below 60 seconds are ignored.
//     updateAge: 24 * 60 * 60, // 24 hours

//     // The cookie name
//     cookieName: 'next-auth.session-token',

//     // The cookie options
//     cookieOptions: {
//       // Path
//       path: '/',

//       // Use secure cookies in production (via "set-cookie" header)
//       secure: process.env.NODE_ENV === 'production',

//       // Specifies the value for the Domain Set-Cookie attribute
//       domain: undefined,

//       // Specifies the value for the SameSite Set-Cookie attribute
//       sameSite: 'lax'
//     }
//   }
// })