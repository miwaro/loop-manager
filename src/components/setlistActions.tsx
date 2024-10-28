import { Button } from "@mui/material";
import React from "react";

interface SetlistActionsProps {
  addNewSong: () => void;
  showTracks: boolean;
  setShowTracks: (show: boolean) => void;
  saveToLocalStorage: () => void;
}

const SetlistActions: React.FC<SetlistActionsProps> = ({
  addNewSong,
  showTracks,
  setShowTracks,
  saveToLocalStorage,
}) => {
  return (
    <div className="flex justify-between gap-60 bg-slate-800 rounded-lg p-2 font-medium max-w-[1300px] mx-auto mt-2">
      <div>
        <Button
          style={{ backgroundColor: "#10B981", color: "#fff" }}
          onClick={addNewSong}
        >
          + ADD NEW SONG
        </Button>
      </div>

      <div className="flex gap-8">
        <Button
          style={{ color: "#fff" }}
          variant="outlined"
          onClick={() => setShowTracks(!showTracks)}
        >
          {showTracks ? "Hide Tracks" : "Show Tracks"}
        </Button>

        <Button
          style={{ backgroundColor: "#6366F1" }}
          variant="contained"
          onClick={saveToLocalStorage}
        >
          SAVE ALL
        </Button>
      </div>
    </div>
  );
};

export default SetlistActions;
