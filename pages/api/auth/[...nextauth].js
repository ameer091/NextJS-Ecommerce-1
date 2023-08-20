// import NextAuth from 'next-auth'
// import GoogleProvider from 'next-auth/providers/google'
// import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import clientPromise from "@/lib/mongodb"
// import {getServerSession} from "next-auth"

// const adminEmails = ['ameersf0@gmail.com']

// export const authOptions = {
//   providers: [

//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET
//     }),
//   ],
//   secret:"Thisisarandomlygeneratedmessageorsoyouthinkitishaahahah",
//   adapter: MongoDBAdapter(clientPromise),
//   callbacks: {
//     session: async ({session, token, user}) => {
//       if(adminEmails.includes(session?.user?.email)){
//         return Promise.resolve(session);
//       } else {
//         return false;
//       }

//     }
//   },
//   session: {
//     // Use JSON Web Tokens for session handling
//     jwt: true,

//     // Seconds - How long until an idle session expires and is no longer valid.
//     maxAge: 30 * 24 * 60 * 60, // 30 days

//     // Seconds - How often to update the session, values below 60 seconds are ignored.
//     updateAge: 24 * 60 * 60, // 24 hours
//   },
//   cookies: {
//     sessionToken: {
//       name: 'next-auth.session-token',
//       options: {
//         // Path
//         path: '/',

//         // Use secure cookies in production (via "set-cookie" header)
//         secure: process.env.NODE_ENV === 'production',

//         // Specifies the value for the Domain Set-Cookie attribute
//         domain: undefined,

//         // Specifies the value for the SameSite Set-Cookie attribute
//         sameSite: 'lax'
//       },
//     },
//   },
// }

// export default NextAuth(authOptions)

// export async function isAdminRequest(req, res) {
//   const session = await getServerSession(req, res, authOptions);
//   if (!adminEmails.includes(session?.user?.email)) {
//     res.status(401);
//     res.end();
//     throw 'not an admin';
//   }
// }

