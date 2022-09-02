import { atom } from "recoil"
import { PlaylistType } from "../types/types";

export const playlistState = atom({
    key: "playlistState", 
    default: {} as PlaylistType,
})

export const playlistIdState = atom({
    key: "playlistIdState",
    default: "1eGUAVxqSS7QLhQooVABRe"
});
