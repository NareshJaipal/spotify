import getSongsByTitle from "@/actions/getSongsByTitile";
import SearchContent from "./components/SearchContent";
import SearchInput from "@/components/SearchInput";
import Header from "@/components/Header";
import { useState } from "react";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
  return (
    <div className="bg-neutral-900 h-full w-full rounded-lg overflow-hidden overflow-y-auto">
      <Header className="from-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Search!</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent query={searchParams.title} />
    </div>
  );
};

export default Search;
