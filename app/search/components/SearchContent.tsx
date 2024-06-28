"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { getMusic } from "@/libs/getMusic";
import { useEffect, useState } from "react";

interface SearchContentProps {
  query: string;
}

const SearchContent: React.FC<SearchContentProps> = ({ query }) => {
  const [songs, setSongs] = useState<any[]>();
  const onPlay = useOnPlay(songs!);

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        const songsData = await getMusic(query);
        setSongs(songsData.data);
      };

      fetchData();
    }
  }, [query]);

  if (songs?.length === 0 || query === "") {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-y-2 px-6">
      {songs?.map((item) => {
        return (
          <div
            key={item.id}
            className="flex items-center justify-between gap-x-4 w-full"
          >
            <MediaItem onClick={(item) => onPlay(item)} song={item} />
          </div>
        );
      })}
    </div>
  );
};

export default SearchContent;
