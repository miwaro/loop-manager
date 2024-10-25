"use client";

import { useState } from "react";
import EditableDropdown from "@/components/dropdown";
import SongList from "@/components/songList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [setlistIndex, setSetlistIndex] = useState(0);

  const handleSetlistChange = (newSetlistIndex: number) => {
    setSetlistIndex(newSetlistIndex);
  };

  return (
    <main className="flex min-h-screen flex-col max-w-[1200px] m-auto">
      <ToastContainer />
      <EditableDropdown
        onChange={handleSetlistChange}
        setlistIndex={setlistIndex}
      />
      <SongList setlistIndex={setlistIndex} />
    </main>
  );
}
