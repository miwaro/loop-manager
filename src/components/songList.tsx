import React, { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { MdDragIndicator } from "react-icons/md";
import {
  Button,
  FormControlLabel,
  FormGroup,
  TextField,
  Tooltip,
} from "@mui/material";
import { toast } from "react-toastify";
import InitializedSetlists from "./initializedSetlists";
import { Set, Track } from "../types/setlistTypes";
import { v4 as uuidv4 } from "uuid";
import FileUpload from "./fileUpload";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SetlistActions from "./setlistActions";
interface SonglistProps {
  setlistIndex: number;
}
const SongList: React.FC<SonglistProps> = ({ setlistIndex }) => {
  const [songs, setSongs] = useState<Set[][]>(InitializedSetlists);
  const [showTracks, setShowTracks] = useState(true);

  useEffect(() => {
    const savedSongs = localStorage.getItem("songs");
    if (savedSongs) {
      setSongs(JSON.parse(savedSongs));
    }
  }, []);

  const deleteSong = (songId: string) => {
    setSongs((prevSongs) => {
      const updatedSetlists = [...prevSongs];
      updatedSetlists[setlistIndex] = updatedSetlists[setlistIndex].filter(
        (song) => song.id !== songId
      );
      return updatedSetlists;
    });
  };

  const deleteLoop = (loopId: string) => {
    setSongs((prevSongs) => {
      const updatedSetlists = [...prevSongs];
      updatedSetlists[setlistIndex] = updatedSetlists[setlistIndex].map(
        (song) => {
          const updatedTracks = song.tracks.map((track) => {
            const updatedLoops = track.loops.filter(
              (loop) => loop.id !== loopId
            );
            return { ...track, loops: updatedLoops };
          });
          return { ...song, tracks: updatedTracks };
        }
      );
      return updatedSetlists;
    });
  };

  const editSong = (songId: string, updatedSong: Partial<Set>) => {
    setSongs((prevSongs) =>
      prevSongs.map((setlist, index) =>
        index === setlistIndex
          ? setlist.map((song) =>
              song.id === songId ? { ...song, ...updatedSong } : song
            )
          : setlist
      )
    );
  };

  const addNewSong = () => {
    const newId =
      songs[setlistIndex].length > 0
        ? `song-${songs[setlistIndex][songs[setlistIndex].length - 1].id + 1}`
        : "song-1";
    const newTracks: Track[] = [];
    for (let i = 1; i <= 5; i++) {
      newTracks.push({
        id: `TR${i + 1}`,
        title: "",
        placeholder: `Track ${i}`,
        loops: [
          {
            id: `LP${i + 1}`,
            title: "",
            placeholder: "Loop One",
            notes: "",
            file: null,
          },
        ],
      });
    }
    setSongs((prevSongs) => {
      const updatedSetlists = [...prevSongs];
      updatedSetlists[setlistIndex] = [
        ...updatedSetlists[setlistIndex],
        {
          id: newId,
          title: "",
          isComplete: false,
          tracks: newTracks,
        },
      ];
      return updatedSetlists;
    });
  };

  const handleAddLoop = (trackId: string, songIndex: number) => () => {
    setSongs((prevSongs) => {
      const updatedSetlists = [...prevSongs];
      updatedSetlists[setlistIndex] = updatedSetlists[setlistIndex].map(
        (song, i) => {
          if (i !== songIndex) return song;
          const updatedTracks = song.tracks.map((track) => {
            if (track.id !== trackId || track.loops.length >= 5) return track;
            return {
              ...track,
              loops: [
                ...track.loops,
                {
                  id: uuidv4(),
                  title: "",
                  placeholder: `Loop${track.loops.length + 1}`,
                  notes: "",
                  file: null,
                },
              ],
            };
          });
          return { ...song, tracks: updatedTracks };
        }
      );
      return updatedSetlists;
    });
  };

  const editLoop = (
    songId: string,
    trackId: string,
    loopId: string,
    updatedLoop: Partial<Track["loops"][0]>
  ) => {
    setSongs((prevSongs) =>
      prevSongs.map((setlist, index) =>
        index === setlistIndex
          ? setlist.map((song) =>
              song.id === songId
                ? {
                    ...song,
                    tracks: song.tracks.map((track) =>
                      track.id === trackId
                        ? {
                            ...track,
                            loops: track.loops.map((loop) =>
                              loop.id === loopId
                                ? { ...loop, ...updatedLoop }
                                : loop
                            ),
                          }
                        : track
                    ),
                  }
                : song
            )
          : setlist
      )
    );
  };

  const editTrack = (
    songId: string,
    trackId: string,
    updatedTrack: Partial<Track>
  ) => {
    setSongs((prevSongs) =>
      prevSongs.map((setlist, index) =>
        index === setlistIndex
          ? setlist.map((song) =>
              song.id === songId
                ? {
                    ...song,
                    tracks: song.tracks.map((track) =>
                      track.id === trackId
                        ? { ...track, ...updatedTrack }
                        : track
                    ),
                  }
                : song
            )
          : setlist
      )
    );
  };

  const updateLoopFile = (
    setId: number,
    trackId: string,
    loopId: string,
    file: string | null
  ) => {
    setSongs((prevSongs) => {
      return prevSongs.map((setlist, setlistIndex) => {
        if (setlistIndex !== setId) {
          return setlist;
        }
        return setlist.map((set) => {
          return {
            ...set,
            tracks: set.tracks.map((track) => {
              if (track.id !== trackId) {
                return track;
              }
              return {
                ...track,
                loops: track.loops.map((loop) => {
                  if (loop.id !== loopId) {
                    return loop;
                  }
                  return {
                    ...loop,
                    file,
                  };
                }),
              };
            }),
          };
        });
      });
    });
  };

  const handleSongCompletion = (index: number) => () => {
    setSongs((prevSongs) => {
      const updatedSetlists = [...prevSongs];
      const updatedSongs = updatedSetlists[setlistIndex].map((song, i) =>
        i === index ? { ...song, isComplete: !song.isComplete } : song
      );
      const incompleteSongs = updatedSongs.filter((song) => !song.isComplete);
      const completedSongs = updatedSongs.filter((song) => song.isComplete);
      updatedSetlists[setlistIndex] = [...incompleteSongs, ...completedSongs];

      return updatedSetlists;
    });
  };

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem("songs", JSON.stringify(songs));
      toast.success("Data saved successfully!");
    } catch (error) {
      toast.error("Failed to save data.");
    }
  };

  const currentSetlist = songs[setlistIndex] || [];

  return (
    <div className="max-w-[1300px] mx-auto">
      <div className=" mt-2 border-dotted border-2 border-emerald-600 rounded px-2">
        {songs[setlistIndex] && (
          <Reorder.Group
            values={currentSetlist}
            onReorder={(newOrder) => {
              const updatedSongs = [...songs];
              updatedSongs[setlistIndex] = newOrder;
              setSongs(updatedSongs);
            }}
          >
            {songs[setlistIndex]?.map((song, index) => (
              <Reorder.Item
                initial={{ y: -100, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: song.isComplete ? 0.4 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 90,
                  duration: 0.4,
                  delay: index * 0.2,
                  ease: "easeIn",
                }}
                value={song}
                className="flex flex-col gap-2 mb-2 border border-stone-500 p-2 my-1 rounded-lg bg-stone-950 hover:bg-stone-900 cursor-grab"
                key={song.id}
              >
                <div className="flex gap-3 items-center max-h-10">
                  <div className="flex gap-1 items-center">
                    <MdDragIndicator
                      style={{ color: "#fff", fontSize: "50px" }}
                    />
                    <h1
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        border: "#6366F1 2px solid",
                        padding: 0,
                        fontSize: "16px",
                        marginRight: "10px",
                      }}
                    >
                      {index + 1}
                    </h1>

                    <TextField
                      style={{
                        background: "white",
                        width: 200,
                        borderRadius: "6px",
                      }}
                      type="text"
                      value={song.title}
                      variant="standard"
                      placeholder={`Song Title ${index + 1}`}
                      onChange={(e) =>
                        editSong(song.id, { title: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <FormGroup>
                      <FormControlLabel
                        style={{ color: "white" }}
                        control={
                          <Checkbox
                            onChange={handleSongCompletion(index)}
                            checked={song.isComplete}
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 36,
                                color: "#FFF",
                              },
                            }}
                          />
                        }
                        label="Complete Song"
                        color="success"
                      />
                    </FormGroup>
                    <div className="rounded flex gap-3 mr-3">
                      <Button
                        color="error"
                        onClick={() => deleteSong(song.id)}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-evenly gap-2">
                  {showTracks &&
                    song.tracks.map((track, i) => (
                      <div
                        className=" flex flex-col gap-1 border border-stone-300 rounded-md"
                        key={track.id}
                      >
                        <div className="flex gap-1">
                          <div className="text-white ml-1">{`TR${i + 1}`}</div>
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

                        {track.loops.map((loop) => (
                          <div
                            className="flex flex-col gap-1 border-y-2 p-1 border-slate-600"
                            key={loop.id}
                          >
                            <div className="flex">
                              <input
                                type="text"
                                className="pl-1 rounded"
                                placeholder={loop.placeholder}
                                value={loop.title}
                                onChange={(e) =>
                                  editLoop(song.id, track.id, loop.id, {
                                    title: e.target.value,
                                  })
                                }
                              />
                              <Tooltip title="Remove Loop">
                                <RemoveCircleIcon
                                  color="error"
                                  onClick={() => deleteLoop(loop.id)}
                                  style={{ cursor: "pointer" }}
                                />
                              </Tooltip>
                            </div>
                            <textarea
                              style={{ width: "auto" }}
                              className="rounded"
                              rows={2}
                              cols={15}
                              placeholder="Enter Notes..."
                              value={loop.notes}
                              onChange={(e) =>
                                editLoop(song.id, track.id, loop.id, {
                                  notes: e.target.value,
                                })
                              }
                            />

                            <div className="flex justify-center gap-x-3 items-center">
                              <FileUpload
                                setlistIndex={setlistIndex}
                                trackId={track.id}
                                loopId={loop.id}
                                onFileUpload={updateLoopFile}
                                savedFile={loop?.file}
                              />
                              <Tooltip title="Add Loop">
                                <AddBoxIcon
                                  style={{
                                    color: "#10B981",
                                    cursor: "pointer",
                                  }}
                                  fontSize="large"
                                  onClick={handleAddLoop(track.id, index)}
                                />
                              </Tooltip>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </div>
      <SetlistActions
        addNewSong={addNewSong}
        showTracks={showTracks}
        setShowTracks={setShowTracks}
        saveToLocalStorage={saveToLocalStorage}
      />
    </div>
  );
};

export default SongList;
