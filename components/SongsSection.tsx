import useOnPlay from "@/hooks/useOnPlay";
import SongsCard from "./SongsCard";

interface SongsSectionProps {
  songsData: any[];
  sectionName: string;
}

const SongsSection: React.FC<SongsSectionProps> = ({
  songsData,
  sectionName,
}) => {
  const onPlay = useOnPlay(songsData);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between pb-2">
        <h1 className="text-white text-2xl font-semibold">{sectionName}</h1>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(135px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] grid-rows-[repeat(2,minmax(180px,1fr))] lg:grid-rows-[repeat(1,minmax(180px,1fr))] auto-rows-[0] overflow-y-hidden">
        {songsData.map((item: any) => {
          return (
            <SongsCard
              onClick={(item) => onPlay(item)}
              key={item.id}
              song={item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SongsSection;
