"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import Box from "./Box";
import SideBarItem from "./SideBarItem";
import Library from "./Library";
import { Song } from "@/types";

interface SideBarProps {
  children: React.ReactNode;
  songs: Song[];
}

const SideBar: React.FC<SideBarProps> = ({ children, songs }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );
  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => {
              return <SideBarItem key={item.label} {...item} />;
            })}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full ">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="flex-1 h-full overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default SideBar;