"use client";

import SongItem from "@/components/SongItem";
import SongsSection from "@/components/SongsSection";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";
import data from "@/libs/data.json";

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (data.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available.</div>;
  }

  return (
    <div>
      {songs.length > 0 && (
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
      )}

      {data.length > 0 &&
        data.map((item, indx) => (
          <SongsSection
            key={indx}
            sectionName={item.title}
            songsData={item.songs}
          />
        ))}
    </div>
  );
};

export default PageContent;
