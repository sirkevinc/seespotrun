import { useRecoilValue } from "recoil"
import { playlistState } from "../../../atoms/playlistAtom"
import { PlaylistType } from "../../../types/types";
import Song from "../Song"

import { Track } from "../../../types/types";

interface ITrack {
    track: Track
}

export default function Songs() {
    const playlist = useRecoilValue<PlaylistType>(playlistState);
    console.log('slkdjfklsdf', playlist)
    return (
        <div className="px-8 flex-col space-y-1 pb-28 text-white">
            {playlist?.tracks?.items.map((track: ITrack, i: number) => (
                <Song key={track.track.id} track={track} order={i} />
            ))}
        </div>
    )
}