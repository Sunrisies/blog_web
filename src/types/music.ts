export interface IMusic {
  id: number;
  title: string;
  artist: string;
  cover: string;
  url: string;
  duration: number;
  album?: string;
  lyrics: string;
}

export interface IMusicPlayerState {
  isPlaying: boolean;
  currentMusic: IMusic | null;
  currentTime: number;
  volume: number;
  playlist: IMusic[];
}

export interface IMusicListResponse {
  code: number;
  message: string;
  data: {
    data: IMusic[];
    pagination?: {
      total: number;
      page: number;
      limit: number;
    };
  };
}
