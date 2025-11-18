import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const providers = [] as any[];
if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.push(GitHubProvider({ clientId: process.env.GITHUB_ID!, clientSecret: process.env.GITHUB_SECRET! }));
}

export const authOptions: NextAuthOptions = {
  providers,
  pages: { signIn: "/dashboard" },
};

export default NextAuth(authOptions);