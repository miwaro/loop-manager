import { Button, Tooltip } from "@mui/material";
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
    <div className="flex justify-between gap-20 md:gap-60 bg-stone-200 border border-stone-500 rounded-lg p-1 md:p-2 font-small md:font-medium max-w-[1300px] mx-auto mt-2">
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
          style={{ color: "#0C0A09" }}
          variant="outlined"
          onClick={() => setShowTracks(!showTracks)}
        >
          {showTracks ? "Hide Tracks" : "Show Tracks"}
        </Button>
        <Tooltip title="Saves all data to local storage">
          <Button
            style={{ backgroundColor: "#6366F1" }}
            variant="contained"
            onClick={saveToLocalStorage}
          >
            SAVE ALL
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default SetlistActions;
