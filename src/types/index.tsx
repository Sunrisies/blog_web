export interface IUser {
    id: number;
    public_id: string;
    user_name: string;
    pass_word: string;
    image: string;
    phone: string;
    email: string;
    created_at: string;
    updated_at: string;
    role: string;
    permissions: number;
}
// Define interfaces for lyrics synchronization
export interface LyricLine {
    id: number
    startTime: number // Time in seconds when this line should be highlighted
    endTime: number // Time in seconds when this line ends
    text: string
    duration?: number // Optional: duration for smoother transitions
  }
  
  export interface Song {
    id: number
    title: string
    artist: string
    duration: string
    albumCover?: string
    lyrics?: LyricLine[] // Timestamped lyrics
  }
  
  // Playback state interface
  export interface PlaybackState {
    isPlaying: boolean
    currentTime: number
    duration: number
    playbackRate: number // For handling speed variations
  }
  