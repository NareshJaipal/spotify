"use client";

import Button from "@/components/Button";
import SongItem from "@/components/SongItem";
import SongsSection from "@/components/SongsSection";
import useOnPlay from "@/hooks/useOnPlay";
import usePlayer from "@/hooks/usePlayer";
import { getMusic } from "@/libs/getMusic";
import { Song } from "@/types";
import { useEffect, useState } from "react";

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const [popular, setPopular] = useState<any[]>();
  const [hipHop, setHipHop] = useState<any[]>();
  const [rock, setRock] = useState<any[]>();
  const [hindi, setHindi] = useState<any[]>();
  const [classical, setClassical] = useState<any[]>();
  const [reggae, setReggae] = useState<any[]>();
  const [blues, setBlues] = useState<any[]>();
  const [latin, setLatin] = useState<any[]>();

  const onPlay = useOnPlay(songs);

  const fetchData = async () => {
    const popularMusic = await getMusic("justin bieber");
    setPopular(popularMusic.data);

    const hipHopMusic = await getMusic("hiphop");
    setHipHop(hipHopMusic.data);

    const rockMusic = await getMusic("rock");
    setRock(rockMusic.data);

    const hindiMusic = await getMusic("arijit singh");
    setHindi(hindiMusic.data);

    const classicalMusic = await getMusic("classical");
    setClassical(classicalMusic.data);

    const reggaeMusic = await getMusic("reggae");
    setReggae(reggaeMusic.data);

    const bluesMusic = await getMusic("blues");
    setBlues(bluesMusic.data);

    const latinMusic = await getMusic("latin");
    setLatin(latinMusic.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available.</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-2xl font-semibold">Newest songs</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 mt-2">
          {songs.map((item) => {
            return (
              <SongItem
                key={item.id}
                onClick={(item) => onPlay(item)}
                data={item}
              />
            );
          })}
        </div>
      </div>
      {popular && <SongsSection sectionName="Popular" songsData={popular} />}

      {hindi && <SongsSection sectionName="Hindi" songsData={hindi} />}

      {hipHop && <SongsSection sectionName="Hip-Hop" songsData={hipHop} />}

      {rock && <SongsSection sectionName="Rock" songsData={rock} />}

      {classical && (
        <SongsSection sectionName="Classical" songsData={classical} />
      )}

      {reggae && <SongsSection sectionName="Reggae" songsData={reggae} />}

      {blues && <SongsSection sectionName="Blues" songsData={blues} />}

      {latin && <SongsSection sectionName="Latin" songsData={latin} />}
    </div>
  );
};

export default PageContent;
