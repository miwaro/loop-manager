"use client";

import { useEffect, useState } from "react";
import { Tooltip, Button } from "@mui/material";
import React, { MouseEventHandler } from "react";
import FileUpload from "./fileUpload";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NotesIcon from "@mui/icons-material/Notes";

interface TrackProps {
  showTracks: boolean;
  song: {
    id: string;
    isComplete: boolean;
    tracks: {
      id: string;
      placeholder: string;
      title: string;
      loops: {
        id: string;
        placeholder: string;
        title: string;
        notes: string;
        file?: string | null;
      }[];
    }[];
  };
  index: number;
  editTrack: (songId: string, trackId: string, data: { title: string }) => void;
  editLoop: (
    songId: string,
    trackId: string,
    loopId: string,
    data: { title: string; notes?: string }
  ) => void;
  deleteLoop: (loopId: string) => void;
  updateLoopFile: (
    setlistIndex: number,
    trackId: string,
    loopId: string,
    file: string | null
  ) => void;
  handleAddLoop: (trackId: string, index: number) => MouseEventHandler;
  setlistIndex: number;
}

function Tracks({
  showTracks,
  song,
  index,
  editTrack,
  editLoop,
  deleteLoop,
  updateLoopFile,
  handleAddLoop,
  setlistIndex,
}: TrackProps) {
  const [showNotes, setShowNotes] = useState<{ [key: string]: boolean }>({});

  const toggleNotes = (loopId: string) => {
    setShowNotes((prev) => ({
      ...prev,
      [loopId]: !prev[loopId],
    }));
  };

  useEffect(() => {
    const notes = song.tracks.reduce((acc, track) => {
      const loopNotes = track.loops.reduce((acc, loop) => {
        if (loop.notes !== "") {
          acc[loop.id] = true;
        }
        return acc;
      }, {} as { [key: string]: boolean });
      return { ...acc, ...loopNotes };
    }, {} as { [key: string]: boolean });
    setShowNotes(notes);
  }, [song.tracks]);

  return (
    <div className="flex flex-col md:flex-row justify-evenly gap-2">
      {showTracks &&
        song.tracks.map((track, i) => (
          <div
            style={{ opacity: song.isComplete ? 0.2 : 1 }}
            className=" flex flex-col gap-1 border border-stone-300 rounded-md pt-1"
            key={track.id}
          >
            <div className="flex gap-1">
              <div className="text-white text-sm ml-1 bg-stone-700 rounded px-1">{`TR${
                i + 1
              }`}</div>
              <input
                type="text"
                className="pl-1 rounded"
                placeholder={track.placeholder}
                value={track.title}
                onChange={(e) =>
                  editTrack(song.id, track.id, {
                    title: e.target.value,
                  })
                }
              />
            </div>

            {track.loops.map((loop, loopIndex) => (
              <div
                className="flex flex-col gap-1 border-y-2 p-1 border-slate-600"
                key={loop.id}
              >
                <div className="flex gap-1">
                  <div className="text-white text-sm bg-stone-700 rounded px-1">{`LP${
                    loopIndex + 1
                  }`}</div>
                  <input
                    type="text"
                    className="pl-1 rounded"
                    placeholder="Loop Title"
                    value={loop.title}
                    onChange={(e) =>
                      editLoop(song.id, track.id, loop.id, {
                        title: e.target.value,
                      })
                    }
                  />
                  {track.loops.length > 1 && (
                    <Tooltip title="Remove Loop">
                      <RemoveCircleIcon
                        color="error"
                        fontSize="medium"
                        onClick={() => deleteLoop(loop.id)}
                        style={{ cursor: "pointer" }}
                      />
                    </Tooltip>
                  )}
                </div>
                <Tooltip title="Add Notes">
                  <Button
                    component="label"
                    variant="outlined"
                    tabIndex={-1}
                    startIcon={<NotesIcon />}
                    onClick={() => toggleNotes(loop.id)}
                    style={{
                      backgroundColor: "#B45309",
                      cursor: "pointer",
                      color: "#F3F4F6",
                      width: "100%",
                    }}
                    size="small"
                  >
                    {showNotes[loop.id] ? "HIDE NOTES" : "SHOW NOTES"}
                  </Button>
                </Tooltip>
                {showNotes[loop.id] && (
                  <textarea
                    className="rounded"
                    rows={2}
                    cols={15}
                    placeholder="Enter Loop Notes..."
                    value={loop.notes}
                    onChange={(e) =>
                      editLoop(song.id, track.id, loop.id, {
                        title: loop.title,
                        notes: e.target.value,
                      })
                    }
                  />
                )}
                <FileUpload
                  setlistIndex={setlistIndex}
                  trackId={track.id}
                  loopId={loop.id}
                  onFileUpload={updateLoopFile}
                  savedFile={loop?.file}
                />
                <div className="flex justify-center gap-x-3 items-center">
                  {loopIndex === track.loops.length - 1 && (
                    <div className="w-full">
                      <Tooltip title="Add Loop">
                        <Button
                          component="label"
                          variant="outlined"
                          tabIndex={-1}
                          startIcon={<AddBoxIcon />}
                          onClick={handleAddLoop(track.id, index)}
                          style={{
                            backgroundColor: "#10B981",
                            cursor: "pointer",
                            color: "#F3F4F6",
                            width: "100%",
                          }}
                          size="small"
                        >
                          ADD LOOP
                        </Button>
                      </Tooltip>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

export default Tracks;
