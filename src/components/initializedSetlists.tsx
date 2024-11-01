import { v4 as uuidv4 } from "uuid";
import { Set } from "../types/setlistTypes";

const createLoop = (placeholder: string) => ({
  id: uuidv4(),
  title: "",
  placeholder,
  notes: "",
  file: null,
});

const createTrack = (placeholder: string) => ({
  id: uuidv4(),
  title: "",
  placeholder,
  loops: [createLoop("Loop One")],
});

const createSong = () => ({
  id: uuidv4(),
  title: "",
  isComplete: false,
  tracks: [
    createTrack("Main Beat"),
    createTrack("Percussion"),
    createTrack("Chords"),
    createTrack("Bass"),
    createTrack("Vocals"),
  ],
});

const InitializedSetlists = (): Set[][] => {
  return [
    [createSong(), createSong(), createSong()],
    [createSong(), createSong(), createSong()],
    [createSong(), createSong(), createSong()],
  ];
};

export default InitializedSetlists;
