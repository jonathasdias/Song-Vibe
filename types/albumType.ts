interface SongsCount {
  count: number;
}

export interface AlbumType {
    id: string,
    title: string
    songs: SongsCount[];
}