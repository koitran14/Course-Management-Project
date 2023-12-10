import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcrypt';


export interface Login{
    LoginID: string,
    LoginUserName: string,
    LoginPassword: string,
}

async function getLogin(username: string): Promise< Login| undefined > {
    const res = await fetch(`http://localhost:8080/api/login/${username}`,{ next: { revalidate: 0 }}); // time to revalidate (refetch new data updated)
    const data = await res.json();
    return data.result;
  }
  export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
      Credentials({
        async authorize(credentials) {
          const parsedCredentials = z
            .object({ username: z.string(), password: z.string().min(6) })
            .safeParse(credentials);
   
          if (parsedCredentials.success) {
            const { username, password } = parsedCredentials.data;
            const user = await getLogin(username);
            if (!user) return null;
            const passwordsMatch = await bcrypt.compare(password, user.LoginPassword);
 
          if (passwordsMatch) return user;
          }
          console.log('Invalid credentials');
          return null;
        },
      }),
    ],
  });
 

  