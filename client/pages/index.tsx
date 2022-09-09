import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getSession } from "next-auth/react"
import { GetServerSideProps } from 'next'


import Sidebar from '../src/components/Sidebar'
import Center from '../src/components/Center'
import Player from '../src/components/Player'

export default function Home<NextPage>() {
  return (
    <div className="bg-[#334155] h-screen overflow-hidden">
    {/* <div className="bg-black h-screen overflow-hidden"> */}
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex">
      {/* <main className="flex"> */}
        <Sidebar />
        <Center />
      </main>
      <div className="sticky bottom-0">
      {/* <div className="sticky bottom-0"> */}
        <Player />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      session,
    }
  }
}