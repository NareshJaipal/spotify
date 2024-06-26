"use client"

import LikeButton from "@/components/LikeButton"
import MediaItem from "@/components/MediaItem"
import useOnPlay from "@/hooks/useOnPlay"
import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface LikedContentProps {
  songs: any[]
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs)

  const router = useRouter()
  const { isLoading, user } = useUser()

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/")
    }
  }, [router, isLoading, user])

  if (songs.length === 0) {
    return (
      <div className="flex w-full flex-col gap-y-2 px-6 text-neutral-400">
        No liked songs.
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-y-2 p-6">
      {songs.map((item) => {
        return (
          <div className="flex w-full items-center gap-x-4">
            <div className="w-[90%] flex-1">
              <MediaItem
                key={item.id}
                onClick={(item) => onPlay(item)}
                song={item}
              />
            </div>
            <LikeButton song={item} />
          </div>
        )
      })}
    </div>
  )
}

export default LikedContent
