"use client";

import { useState } from "react";
import EditableDropdown from "@/components/dropdown";
import SongList from "@/components/songList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/navbar";

export default function Home() {
  const [setlistIndex, setSetlistIndex] = useState(0);

  const handleSetlistChange = (newSetlistIndex: number) => {
    setSetlistIndex(newSetlistIndex);
  };

  return (
    <main className="flex min-h-screen flex-col max-w-[1300px] m-auto">
      <ToastContainer />
      <Navbar onChange={handleSetlistChange} setlistIndex={setlistIndex} />
      <SongList setlistIndex={setlistIndex} />
    </main>
  );
}
