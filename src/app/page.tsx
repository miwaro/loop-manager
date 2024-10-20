"use client";
import SetList from "@/components/setlist";
import SongList from "@/components/songList";
import Songs from "@/components/songList";
import TabImport from "@/components/tabImport";
import { SetStateAction, useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [setLists, setSetLists] = useState(["SetList 1"]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    setIsOpen(false);
  };

  const addSetlist = () => {
    const newSetlist = prompt("Enter the new option:");
    if (newSetlist) {
      setSetLists([...setLists, newSetlist]);
    }
  };

  const handleSelect = (event: any) => {
    setSetLists(event.target.value);
  };
  return (
    <main className="flex min-h-screen flex-col max-w-[1200px] m-auto">
      <SetList
        addSetlist={addSetlist}
        handleSelect={handleSelect}
        toggleMenu={toggleMenu}
        setLists={setLists}
      />

      <div>-----------------------------------------------------------</div>

      <div>
        <SongList />
      </div>
    </main>
  );
}
