import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";

export default function Home() {
  const users = api.user.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Invoices</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {users.data?.map((user) => (
          <p key={user.id}>{user.name}</p>
        ))}
        <h1>Hello.</h1>
      </main>
    </>
  );
}
