import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "./components/PageContent";
import Footer from "@/components/Footer";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-3">
          <h1 className="text-white text-3xl font-semibold">Welcome back!</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
          <ListItem image="/images/liked.png" name="Liked songs" href="liked" />
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <PageContent songs={songs || []} />
      </div>
      <Footer />
    </div>
  );
}
