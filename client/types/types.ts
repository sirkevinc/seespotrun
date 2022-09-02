export interface Artist {
    id: string;
    name: string;
    images?: [Image];
    followers?: {
        total: number;
    };
    genres?: [string];
}

export interface Album {
    id: string;
    name: string;
    artists: [Artist];
    images: [Image];
    album_type?: string;
    release_date?: string;
    tracks?: {
        total: number;
        items: Track[];
    };
}

export interface Track {
    id: string;
    name: string;
    album: Album;
    artists: [Artist];
    duration_ms: number;
    preview_url: string;
    uri: string;
}

export interface Image {
    height: number | null;
    url: string | undefined;
    width: number | null;
}

export interface PlaylistType {
    id: string;
    description?: string | null;
    followers?: {
        total?: number;
    };
    name: string | null;
    images: [Image];
    // owner?: {
    //     id: string;
    //     display_name?: string;
    // };
    tracks?: {
        items: [{added_at: string; track: Track }];
        total: number;
    };
    // type?: string;
}