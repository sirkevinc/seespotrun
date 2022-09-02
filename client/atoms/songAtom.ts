import { atom } from "recoil"

export const currentTrackIdState = atom({
    key: "songState", 
    default: ""
})

export const isPlayingState = atom({
    key: "isPlayingState",
    default: false
});