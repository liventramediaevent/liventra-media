import AboutSection from "@/components/AboutSection";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LiveChat from "@/components/LiveChat";
import LivePlayer from "@/components/LivePlayer";
import RecentVideos from "@/components/RecentVideos";
import { getYouTubeData } from "@/lib/youtube";

export const revalidate = 60;

export default async function HomePage() {
  const data = await getYouTubeData();

  return (
    <main>
      <Header />
      <Hero
        isLive={data.isLive}
        channelTitle={data.channelTitle}
        liveTitle={data.liveTitle}
      />

      <LivePlayer
        isLive={data.isLive}
        liveVideoId={data.displayVideoId}
      />

      <div className="container-main py-2">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <LiveChat
        isLive={data.isLive}
        liveVideoId={data.liveVideoId}
      />

      <div className="container-main py-2">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <RecentVideos videos={data.recentVideos} />

      <div className="container-main py-2">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <AboutSection />
    </main>
  );
}
