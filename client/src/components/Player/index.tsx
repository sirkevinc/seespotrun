import useSpotify from "../../../utils/useSpotify";
import { useSession } from "next-auth/react";
import { currentTrackIdState, isPlayingState } from "../../../atoms/songAtom";
import { useRecoilState } from "recoil";
import { useCallback, useEffect, useState } from "react";
import useSongInfo from "../../../utils/useSongInfo";
import { 
    AdjustmentsHorizontalIcon,
    SpeakerWaveIcon as VolumeDownIcon
 } from "@heroicons/react/24/outline"
import { 
    BackwardIcon,
    ForwardIcon,
    PlayIcon,
    PauseIcon,
    SpeakerWaveIcon as VolumeUpIcon,
    ArrowUturnLeftIcon
 } from "@heroicons/react/24/solid"
import { debounce } from "lodash";

export default function Player() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);

    const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                setCurrentTrackId(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                })
            })
        }
    }

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        })
    };
    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong();
            setVolume(50);
        }
    }, [currentTrackId, spotifyApi, session]);

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debounceAdjustVolume(volume);
        }
    }, [volume])

    const debounceAdjustVolume = useCallback(
        debounce((volume) => {

            spotifyApi.setVolume(volume).catch((err) => console.error(err));
        }, 500), 
        []
    )

    return (
        <div className="h-24 bg-gradient-to-b from-black-to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
            <div className="flex items-center space x-4">
                <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images?.[0]?.url} alt="songImage" />
            </div>
            <div>
                <h3>{songInfo?.name}</h3>
                <p>{songInfo?.artists?.[0]?.name}</p>
            </div>

            <div className="flex items-center justify-evenly"> 
                <AdjustmentsHorizontalIcon className="button" />
                <BackwardIcon 
                    className="button" 
                    onClick={() => spotifyApi.skipToPrevious()}
                />
                {isPlaying ? (
                    <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
                ) : (
                    <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
                )}
                <ForwardIcon 
                    className="button"
                    onClick={() => spotifyApi.skipToNext()} 
                />
                <ArrowUturnLeftIcon className="button" />
            </div>
            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                <VolumeDownIcon className="button" onClick={() => volume > 0 && setVolume(volume - 10)} />
                <input className="w-14 md:w-28" type="range" value={volume} onChange={e => setVolume(Number(e.target.value))} min={0} max={100} />
                <VolumeUpIcon className="button" onClick={() => volume < 100 && setVolume(volume + 10)}/>
            </div>
        </div>
    )
}