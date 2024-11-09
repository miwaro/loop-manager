import { Button, Tooltip } from "@mui/material";
import React from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";

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
    <div className="flex justify-between gap-20 md:gap-60 bg-stone-200 border-2 border-stone-500 rounded-lg p-1 md:p-2 font-small md:font-medium max-w-[1300px] mx-auto mt-4 mb-12">
      <div>
        <Button
          startIcon={<AddBoxIcon />}
          style={{ backgroundColor: "#10B981", color: "#fff" }}
          onClick={addNewSong}
        >
          ADD NEW SONG TO SETLIST
        </Button>
      </div>

      <div className="flex gap-8">
        <Button
          style={{ color: "#0C0A09" }}
          variant="outlined"
          onClick={() => setShowTracks(!showTracks)}
        >
          {showTracks ? "Hide All Tracks" : "Show Tracks"}
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
