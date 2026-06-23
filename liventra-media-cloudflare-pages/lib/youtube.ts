export type YouTubeVideo = {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  description?: string;
};

export type YouTubeLiveData = {
  isLive: boolean;                 // only true when channel is actually live
  liveVideoId: string | null;      // actual live video id only
  liveTitle: string | null;        // live title only when actually live
  displayVideoId: string | null;   // what to embed on the page
  recentVideos: YouTubeVideo[];
  channelTitle: string;
};

const API_BASE = "https://www.googleapis.com/youtube/v3";
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY!;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID!;

// fallback video when not live
const FALLBACK_VIDEO_ID = "1JUbVBLF7hM";

async function fetchJson(url: string) {
  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`YouTube API error: ${res.status} - ${text}`);
  }

  return res.json();
}

export async function getChannelInfo() {
  const data = await fetchJson(
    `${API_BASE}/channels?part=snippet&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
  );

  const item = data.items?.[0];

  return {
    title: item?.snippet?.title || "LIVENTRA MEDIA",
  };
}

export async function getCurrentLiveStream() {
  const data = await fetchJson(
    `${API_BASE}/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&maxResults=1&key=${YOUTUBE_API_KEY}`
  );

  if (data.items?.length) {
    const item = data.items[0];
    return {
      isLive: true,
      liveVideoId: item.id.videoId as string,
      liveTitle: item.snippet?.title || "Live Now",
      displayVideoId: item.id.videoId as string,
    };
  }

  return {
    isLive: false,
    liveVideoId: null,
    liveTitle: null,
    displayVideoId: FALLBACK_VIDEO_ID,
  };
}

export async function getRecentVideos(limit = 8): Promise<YouTubeVideo[]> {
  const data = await fetchJson(
    `${API_BASE}/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=${limit}&key=${YOUTUBE_API_KEY}`
  );

  return (data.items || []).map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    thumbnail:
      item.snippet.thumbnails?.high?.url ||
      item.snippet.thumbnails?.medium?.url ||
      item.snippet.thumbnails?.default?.url ||
      "",
    publishedAt: item.snippet.publishedAt,
    description: item.snippet.description,
  }));
}

export async function getYouTubeData(): Promise<YouTubeLiveData> {
  const [channelInfo, liveInfo, recentVideos] = await Promise.all([
    getChannelInfo(),
    getCurrentLiveStream(),
    getRecentVideos(8),
  ]);

  return {
    isLive: liveInfo.isLive,
    liveVideoId: liveInfo.liveVideoId,
    liveTitle: liveInfo.liveTitle,
    displayVideoId: liveInfo.displayVideoId,
    recentVideos,
    channelTitle: channelInfo.title,
  };
}
