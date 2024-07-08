import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
interface User {
  id: string;
  role: string;
  token: string;
}
const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        debugger;
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
            },
          );

          if (response.status !== 200) {
            return null;
          }

          const data = await response.json();

          if (data) {
            debugger;

            const user = {
              id: data.user.id,
              role: data.user.role,
              token: data.token,
            };

            return user;
          }
        } catch (e) {
          console.error(e);

          return null;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      console.log('jwt', token, user);
      // Adicionar informações do usuário ao token se o usuário existir
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.token = user.token;
      }

      return token;
    },
    async session({ session, token }) {
      // Adicionar informações do token à sessão
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.token = token.token;
      }

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOption);
