import { TbPlaylist } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai"
import useAuthModal from "@/hooks/useAuthModal"
import { useUser } from "@/hooks/useUser"
import useUploadModal from "@/hooks/useUploadModal"
import { Song } from "@/types"
import MediaItem from "./MediaItem"
import useOnPlay from "@/hooks/useOnPlay"

interface LibraryProps {
  songs: Song[]
}

const Libaray: React.FC<LibraryProps> = ({ songs }) => {
  const authModal = useAuthModal()
  const { user } = useUser()
  const uploadModal = useUploadModal()

  const onPlay = useOnPlay(songs)

  const handleUploadSong = () => {
    if (!user) {
      return authModal.onOpen()
    }

    // Todo: Check for subscription

    return uploadModal.onOpen()
  }
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-lg font-medium text-neutral-400">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={handleUploadSong}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
          size={20}
        />
      </div>
      <div className="mt-4 flex flex-col gap-y-2 px-3">
        {songs.map((item) => (
          <MediaItem
            onClick={(item) => onPlay(item)}
            key={item.id}
            song={item}
          />
        ))}
      </div>
    </div>
  )
}

export default Libaray
