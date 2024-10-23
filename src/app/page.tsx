"use client";

import SongList from "@/components/songList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col max-w-[1200px] m-auto">
      <SongList />
    </main>
  );
}
