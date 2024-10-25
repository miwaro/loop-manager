import React, { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { MdDragIndicator } from "react-icons/md";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import InitializedSetlists from "./initializedSetlists";
import { Set, Track } from "../types/setlistTypes";
import { v4 as uuidv4 } from "uuid";
import FileUpload from "./fileUpload";

interface SonglistProps {
  setlistIndex: number;
}
const SongList: React.FC<SonglistProps> = ({ setlistIndex }) => {
  const [songs, setSongs] = useState<Set[][]>(InitializedSetlists);

  useEffect(() => {
    const savedSongs = localStorage.getItem("songs");
    if (savedSongs) {
      setSongs(JSON.parse(savedSongs));
    }
  }, []);

  useEffect(() => {
    console.log("songs", songs);
  }, [songs]);

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
      updatedSetlists[setlistIndex] = updatedSetlists[setlistIndex].map(
        (song, i) =>
          i === index ? { ...song, isComplete: !song.isComplete } : song
      );
      return updatedSetlists;
    });
  };

  const saveToLocalStorage = () => {
    console.log("songs", songs);
    try {
      localStorage.setItem("songs", JSON.stringify(songs));
      toast.success("Data saved successfully!");
    } catch (error) {
      toast.error("Failed to save data.");
    }
  };

  const currentSetlist = songs[setlistIndex] || [];

  return (
    <>
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
              initial={{ y: -70, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              value={song}
              style={song.isComplete ? { opacity: 0.4 } : { opacity: 1 }}
              className="flex flex-col gap-3 mb-5 border border-black p-3 my-3 rounded-lg bg-stone-950"
              key={song.id}
            >
              <div className="flex gap-3 items-center">
                <div className="flex gap-1 items-center">
                  <MdDragIndicator
                    style={{ color: "#fff", fontSize: "40px" }}
                  />
                  <h1 className="text-xl text-white">{index + 1}.)</h1>
                  <TextField
                    style={{ background: "white" }}
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
                  <div
                    style={
                      song.isComplete
                        ? { backgroundColor: "green" }
                        : { color: "transparent" }
                    }
                    className="border border-green-600 rounded p-2 flex gap-3"
                  >
                    <h4 className="text-white">Complete</h4>
                    <input
                      type="checkbox"
                      checked={song.isComplete}
                      onChange={handleSongCompletion(index)}
                      value={song.isComplete ? "true" : "false"}
                    />
                  </div>
                  <div className="border border-red-600 rounded p-2 flex gap-3">
                    <h4 className="text-white">Delete</h4>
                    <button
                      className="focus:outline-none text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:ring-rose-300 font-medium rounded-lg text-sm px-2 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-900"
                      onClick={() => deleteSong(song.id)}
                    >
                      &times;
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-around">
                {song.tracks.map((track, i) => (
                  <div
                    className=" flex flex-col gap-1 border border-cyan-200 rounded"
                    key={track.id}
                  >
                    <h3>
                      <div className="flex gap-1">
                        <div className="text-white">{`TR${i + 1}`}</div>
                        <input
                          style={{ maxWidth: "180px" }}
                          type="text"
                          className="pl-1"
                          placeholder={track.placeholder}
                          value={track.title}
                          onChange={(e) =>
                            editTrack(song.id, track.id, {
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                    </h3>
                    {track.loops.map((loop) => (
                      <div className="flex  flex-col gap-1" key={loop.id}>
                        <div className="flex">
                          <input
                            style={{ maxWidth: "180px" }}
                            type="text"
                            className="pl-1"
                            placeholder={loop.placeholder}
                            value={loop.title}
                            onChange={(e) =>
                              editLoop(song.id, track.id, loop.id, {
                                title: e.target.value,
                              })
                            }
                          />
                          <button
                            className="focus:outline-none text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:ring-rose-300 font-medium rounded-lg text-sm px-2 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-900"
                            onClick={() => deleteLoop(loop.id)}
                          >
                            &times;
                          </button>
                        </div>
                        <textarea
                          style={{ width: "auto" }}
                          rows={2}
                          cols={20}
                          placeholder="Enter Notes"
                          value={loop.notes}
                          onChange={(e) =>
                            editLoop(song.id, track.id, loop.id, {
                              notes: e.target.value,
                            })
                          }
                        />
                        <FileUpload
                          setlistIndex={setlistIndex}
                          trackId={track.id}
                          loopId={loop.id}
                          onFileUpload={updateLoopFile}
                          savedFile={loop?.file}
                        />
                      </div>
                    ))}
                    {track.loops.length < 5 && (
                      <button
                        onClick={handleAddLoop(track.id, index)}
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                      >
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
      <div className="flex justify-between">
        <Button variant="contained" color="success" onClick={addNewSong}>
          + ADD NEW SONG
        </Button>
        <div>
          <Button variant="contained" onClick={saveToLocalStorage}>
            SAVE ALL
          </Button>
        </div>
      </div>
    </>
  );
};

export default SongList;
