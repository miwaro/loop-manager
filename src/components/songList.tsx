import React, { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { MdDragIndicator } from "react-icons/md";
import { Button, FormControlLabel, FormGroup, TextField } from "@mui/material";
import { toast } from "react-toastify";
import InitializedSetlists from "./initializedSetlists";
import { Set, Track } from "../types/setlistTypes";
import { v4 as uuidv4 } from "uuid";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import SetlistActions from "./setlistActions";
import Tracks from "./tracks";
import SongNotes from "@/modals/songNotes";

interface SonglistProps {
  setlistIndex: number;
}
const SongList: React.FC<SonglistProps> = ({ setlistIndex }) => {
  const [songs, setSongs] = useState<Set[][]>(InitializedSetlists);
  const [showTracks, setShowTracks] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          notes: "",
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

  const handleSaveNote = (note: any, id: string) => {
    const updatedSetlists = songs.map((setlist, setIndex) => {
      if (setIndex === setlistIndex) {
        return setlist.map((song) => {
          if (song.id === id) {
            return {
              ...song,
              notes: note,
            };
          }
          return song;
        });
      }
      return setlist;
    });

    setSongs(updatedSetlists);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
    <div className="max-w-[1300px] mx-auto mt-8">
      <div className=" mt-2 border-dashed border-2 border-emerald-500 rounded px-2">
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
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 10,
                  duration: 0.3,
                  delay: index * 0.1,
                }}
                value={song}
                className="flex flex-col gap-2 mb-2 border border-stone-500 p-2 my-1 rounded-lg bg-neutral-900 cursor-grab active:cursor-grabbing"
                key={song.id}
              >
                <div className="flex gap-3 items-center max-h-10">
                  <div className="flex gap-1 items-center">
                    <MdDragIndicator
                      style={{ color: "#fff", fontSize: "40px" }}
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
                        border: "#6366F1 2px solid",
                        marginRight: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      {index + 1}
                    </h1>
                    <TextField
                      style={{
                        background: "white",
                        width: 200,
                        borderRadius: "6px",
                        textDecoration: song.isComplete
                          ? "line-through"
                          : "none",
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
                  <div className="flex items-center justify-between gap-3 w-full">
                    <div className="flex items-center">
                      <FormGroup>
                        <FormControlLabel
                          style={{ color: "#eff4f6" }}
                          control={
                            <Checkbox
                              onChange={handleSongCompletion(index)}
                              checked={song.isComplete}
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  color: "#eff4f6",
                                },
                              }}
                            />
                          }
                          label="COMPLETE SONG"
                          sx={{
                            "& .MuiTypography-root": {
                              fontSize: "0.9rem",
                            },
                          }}
                          color="success"
                        />
                      </FormGroup>
                      <SongNotes
                        open={isModalOpen}
                        handleClose={handleCloseModal}
                        onSave={handleSaveNote}
                        id={song.id}
                        notes={song.notes}
                      />
                    </div>

                    <div className="rounded flex gap-3 mr-3">
                      <Button
                        style={{
                          color: "#A1A1AA",
                          border: "#3F3F46 2px solid",
                        }}
                        onClick={() => deleteSong(song.id)}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                      >
                        Delete Song
                      </Button>
                    </div>
                  </div>
                </div>
                <Tracks
                  showTracks={showTracks}
                  song={song}
                  editTrack={editTrack}
                  editLoop={editLoop}
                  deleteLoop={deleteLoop}
                  handleAddLoop={handleAddLoop}
                  updateLoopFile={updateLoopFile}
                  setlistIndex={setlistIndex}
                  index={index}
                />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </div>
      <div className="shadow hover:shadow-lg">
        <SetlistActions
          addNewSong={addNewSong}
          showTracks={showTracks}
          setShowTracks={setShowTracks}
          saveToLocalStorage={saveToLocalStorage}
        />
      </div>
    </div>
  );
};

export default SongList;
