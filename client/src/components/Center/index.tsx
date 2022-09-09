import { PlaylistType } from "../../../types/types"

import { getSession, useSession } from "next-auth/react"
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { shuffle } from "lodash"
import { useRecoilState } from "recoil"
import { playlistIdState, playlistState } from "../../../atoms/playlistAtom";
import useSpotify from "../../../utils/useSpotify";
import { signOut } from "next-auth/react"

import Songs from "../Songs"

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500"
]

export default function Center() {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState<string>();
    const playlistId = useRecoilState<string>(playlistIdState)[0];
    const [playlist, setPlaylist] = useRecoilState(playlistState)


    useEffect(() => {
        let color: string | undefined = shuffle(colors).pop();
        setColor(color);
    }, [playlistId])

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body);
        }).catch((err) => {
            console.error("Oops:", err);
        })
    }, [spotifyApi, playlistId]);

    return(
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <header className="absolute top-5 right-8">
                <div className="text-[#cbd5e1] flex items-center space-x-3 cursor-pointer p-1 pr-2" onClick={() => signOut()}>
                    <img 
                        className="rounded-full w-14 h-14" 
                        src={String(session?.user?.image)} 
                        alt="profile"
                    />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className="icon" />
                </div>
            </header>
            <section className={`flex-col items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 p-8`}>
                <img className="h-52 w-52 shadow-2xl" src={playlist?.images?.[0]?.url} alt="image"/>
                <div>
                    <h1 className="text-2xl md:text-3xl xl:text-4xl text-[#cbd5e1] font-bold">{playlist?.name}</h1>
                </div>
                <div className="mt-8">
                    <Songs />
                </div>
            </section>
        </div>
        // <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
        //     <header className="absolute top-5 right-8">
        //         <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white" onClick={() => signOut()}>
        //             <img 
        //                 className="rounded-full w-10 h-10" 
        //                 src={String(session?.user?.image)} 
        //                 alt="profile"
        //             />
        //             <h2>{session?.user.name}</h2>
        //             <ChevronDownIcon className="h-5 w-5" />
        //         </div>
        //     </header>
        //     <section className={`flex-col items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
        //         <img className="h-44 w-44 shadow-2x1" src={playlist?.images?.[0]?.url} alt="image"/>
        //         <div>
        //             <p>PLAYLIST</p>
        //             <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
        //         </div>
        //         <div>
        //             <Songs />
        //         </div>
        //     </section>
        // </div>
    )
}
