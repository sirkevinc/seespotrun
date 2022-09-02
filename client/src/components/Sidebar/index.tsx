import { 
    HomeIcon,
    MagnifyingGlassIcon,
    BuildingLibraryIcon,
    PlusCircleIcon,
    HeartIcon
 } from "@heroicons/react/24/outline";

 import { signOut, useSession } from "next-auth/react"
 import { useEffect, useState } from "react"
 import useSpotify from "../../../utils/useSpotify";
 import { useRecoilState } from "recoil"
 import { playlistIdState } from "../../../atoms/playlistAtom";
 
 export default function Sidebar() {
     const spotifyApi = useSpotify();
     const { data: session, status } = useSession();
     const [playlists, setPlaylists] = useState([]);
     const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    }, [session, spotifyApi])

    console.log('you picked', playlistId)

    return(
        <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
            <div className="space-y-4">
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <MagnifyingGlassIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-2">
                    <BuildingLibraryIcon className="h-5 w-5" />
                    <p>Library</p>
                </button>
                <button onClick={() => signOut()}>
                    <p>Sign Out</p>
                </button>
                <button className="flex items-center space-x-2">
                    <HeartIcon className="h-5 w-5" />
                    <p>Liked Songs</p>
                </button>
                <hr className="border-t-[0.1px]" />
                <button className="flex items-center space-x-2">
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Create Playlist</p>
                </button>
                <hr className="border-t-[0.1px]" />

                {playlists.map((playlist) => {
                    return(
                        <p key={playlist.id} className="cursor-pointer" onClick={() => setPlaylistId(playlist.id)}>{playlist.name}</p>
                    )
                })}
            </div>
        </div>
    )
}