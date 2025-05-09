import axios from "axios";

export const getMusic = async (query: string): Promise<any> => {
  const response = await fetch(`/api/fetch-songs?query=${query}`);

  return response.json();
};

interface YTMusicTrack {
  title: string;
  artist: string;
  albumArt: string;
  duration: number;
  id: string;
}

interface YTMusicPlaylist {
  id: string;
  title: string;
  tracks: YTMusicTrack[];
}

export class YTMusicAPI {
  private baseURL = "https://youtube.googleapis.com/youtube/v3";

  private apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  async searchTracks(query: string): Promise<YTMusicTrack[]> {
    try {
      const response = await axios.get(`${this.baseURL}/search`, {
        params: {
          part: "snippet",
          q: query,
          type: "video",
          videoCategoryId: "10", // Music category
          key: this.apiKey,
          maxResults: 10,
        },
      });

      console.log({ response });

      return response.data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        artist: item.snippet.channelTitle,
        albumArt: item.snippet.thumbnails.high.url,
        duration: 0, // You'll need an additional API call to get duration
      }));
    } catch (error) {
      console.error("Error searching tracks:", error);
      throw error;
    }
  }

  async getPlaylist(playlistId: string): Promise<YTMusicPlaylist> {
    try {
      const response = await axios.get(`${this.baseURL}/playlists`, {
        params: {
          part: "snippet",
          id: playlistId,
          key: this.apiKey,
        },
      });

      const playlistData = response.data.items[0];
      const tracksResponse = await axios.get(`${this.baseURL}/playlistItems`, {
        params: {
          part: "snippet",
          playlistId: playlistId,
          key: this.apiKey,
          maxResults: 50,
        },
      });

      return {
        id: playlistId,
        title: playlistData.snippet.title,
        tracks: tracksResponse.data.items.map((item: any) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          artist: item.snippet.videoOwnerChannelTitle,
          albumArt: item.snippet.thumbnails.high.url,
          duration: 0,
        })),
      };
    } catch (error) {
      console.error("Error fetching playlist:", error);
      throw error;
    }
  }
}
