// import NextAuth from "next-auth/next"
// import { AuthOptions } from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import userLogIn from "@/libs/userLogIn"
// export const authOptions:AuthOptions = {
//     providers: [
//         //Authentication provider, use Credentials Provider
//         CredentialsProvider({
//             // The name to display on the sign in form (e.g. "Sign in with...")
//             name: "Credentials",
//             // `credentials` is used to generate a form on the sign in page.
//             // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//             // e.g. domain, username, password, 2FA token, etc.
//             // You can pass any HTML attribute to the <input> tag through the object.af
//             credentials: {
//               email: { label: "Email", type: "email", placeholder: "email" },
//               password: { label: "Password", type: "password" }
//             },
//             async authorize(credentials, req) {
              
//                 if(!credentials) return null
//                 const user = await userLogIn(credentials.email, credentials.password)
        
//               if (user) {
//                 // Any object returned will be saved in `user` property of the JWT
//                 return user
//               } else {
//                 // If you return null then an error will be displayed advising the user to check their details.
//                 return null
        
//                 // You can also Reject this caallback with an Error thus the user will be sent to the error page with the error message as a query parameter
//               }
//             }//F
//           })
//     ],
//     session : { strategy: "jwt"},
//     callbacks : {
//         async jwt({token, user}) {
//             return {...token, ...user}
//         },
//         async session({session, token, user}){
//             session.user = token as any
//             return session
//         }
//     }
// }
// const handler = NextAuth(authOptions)
// export {handler as GET, handler as POST}

import NextAuth from "next-auth/next"
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import userLogIn from "@/libs/userLogIn"
import getUserProfile from "@/libs/getUserProfile"

export const authOptions:AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: { label: "Email", type: "email", placeholder: "email" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // console.log("Credentials:", credentials);

                if(!credentials) return null
                const user = await userLogIn(credentials.email, credentials.password)
                //const user =  {id:"8",name:"john",email:"john@example.com"}
        
                if (user) {
                    // console.log("User logged in:", user);
                    return user
                } else {
                    // console.log("User not found or password incorrect.");
                    return null
                }
            }
        })
    ],
    session : { strategy: "jwt"},
    callbacks : {
        async jwt({token, user}) {
            // console.log("JWT token:", token);
            // console.log("JWT user:", user);
            return {...token, ...user}
        },
        async session({session, token, user}){
            // console.log("Session token:", token);
            // console.log("Session user:", user);
            const response = token as any 
            if(response.token){
            const userresponse = await getUserProfile(response.token)
            // session.user = token as any
            session.user = userresponse.data
            session.user.token = response.token
            }
            return session
        }
    }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}
