import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '../../../lib/mongodb';
import bcrypt from 'bcryptjs';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "E-Mail", type: "email" },
        password: { label: "Passwort", type: "password" }
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();
          
          // Hier würden Sie normalerweise den Benutzer in der Datenbank suchen
          // und das Passwort überprüfen
          
          // Für dieses Beispiel verwenden wir feste Anmeldedaten
          if (
            (credentials.email === 'admin@easylog.de' && credentials.password === 'admin123') ||
            (credentials.email === 'staff@easylog.de' && credentials.password === 'staff123')
          ) {
            return {
              id: credentials.email === 'admin@easylog.de' ? '1' : '2',
              email: credentials.email,
              name: credentials.email === 'admin@easylog.de' ? 'Admin' : 'Staff',
              role: credentials.email === 'admin@easylog.de' ? 'admin' : 'staff'
            };
          }
          
          return null;
        } catch (error) {
          console.error('Authorize error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  secret: process.env.JWT_SECRET || 'easylog-jwt-secret-key-2025',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 Tage
  }
});
