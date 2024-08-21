import NextAuth, { NextAuthOptions } from "next-auth";

import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider  from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions ={
    session:{
        strategy:'jwt'
    },
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
        }),

        CredentialsProvider({
            name:"Akil SignUp",
            id:"akil_signUp",
            credentials:{
                email:{
                    label:"email",
                    type:"text",
                    placeholder:"email"
                },

                password:{
                    label:"password",
                    type:"text",
                    placeholder:"password"
                },

                name:{
                    label:"name",
                    type:"text",
                    placeholder:"name"
                },

                confirmPassword:{
                    label:"confirmPassword",
                    type:"text",
                    placeholder:"confirmPassword"
                },
            },
            async authorize(credentials){
                const response = await fetch('https://akil-backend.onrender.com/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: credentials?.name,
                        email: credentials?.email,
                        password: credentials?.password,
                        confirmPassword:credentials?.confirmPassword,
                        role:"user"
                    }),
                    
                
                });


                const user = await response.json();

                if(!response.ok){
                    throw new Error(
                        " Sign up not successfull"
                    )
                }
                if (user){
                    return {...user , role:"user"}
                }
                else{
                    return null
                }
            }
        }),
        CredentialsProvider({
            name:"Akil Login",
            id:"akil_login",
            credentials:{
                email:{
                    label:"email",
                    type:"text",
                    placeholder:"email"
                },

                password:{
                    label:"password",
                    type:"text",
                    placeholder:"password"
                },

            },
            async authorize(credentials){
                const response = await fetch('https://akil-backend.onrender.com/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                    
                
                });


                const user = await response.json();

                if(!response.ok){
                    throw new Error(
                        " Login not successfull"
                    )
                }
                if (user){
                    return {...user , role:"user"}
                }
                else{
                    return null
                }
            }
        }),
        CredentialsProvider({
            name:"Akil Verify",
            id:"akil_verify",
            credentials:{
                email:{
                    label:"email",
                    type:"text",
                    placeholder:"email"
                },

                otp:{
                    label:"otp",
                    type:"text",
                   
                },
            },
            async authorize(credentials){
                const response = await fetch('https://akil-backend.onrender.com/verify-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        otp:credentials?.otp
                    }),
                    
                
                });


                const user = await response.json();

                if(!response.ok){
                    throw new Error(
                        " Sign up not successfull"
                    )
                }
                if (user){
                    return {...user , status:"authenticated"}
                }
                else{
                    return null
                }
            }
        }),
   

    ],
    pages: {
        signIn: '/auth/signin',  
        error: '/auth/error',   
        verifyRequest: '/auth/verify-request',  
        newUser: '/auth/welcome',  
    },

    callbacks:{
        async session({session , token}){
            if (token.user){
                session.user = token.user as any;
            }
            return session

        },
        async jwt({token , user}){
            if (user){
                token.user = user;

            }
            return token
        }
    },

    secret: process.env.NEXTAUTH_SECRET
}
 export default NextAuth(authOptions)
