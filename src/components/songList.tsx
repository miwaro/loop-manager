import React, { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { MdDragIndicator } from "react-icons/md";
import EditableDropdown from "./dropdown";
import { Button, TextField } from "@mui/material";

interface Song {
  id: number;
  isComplete: boolean;
  title: string;
  tracks: Track[];
}

interface Track {
  id: string;
  title: string;
  placeholder: string;
  loops: Loop[];
}

interface Loop {
  id: string;
  title: string;
  notes: string;
  placeholder: string;
}

const SongList: React.FC = () => {
  const [songs, setSongs] = useState<Song[][]>([
    [
      {
        id: 1,
        title: "",
        isComplete: false,
        tracks: [
          {
            id: "TR1",
            title: "",
            placeholder: "Main Beat",
            loops: [
              {
                id: "tr1loop1",
                title: "",
                placeholder: "Loop One",
                notes: "",
              },
            ],
          },
          {
            id: "TR2",
            title: "",
            placeholder: "Percussion",
            loops: [
              {
                id: "tr2loop1",
                title: "",
                placeholder: "Loop One",
                notes: "",
              },
            ],
          },
          {
            id: "TR3",
            title: "",
            placeholder: "Chords",
            loops: [
              {
                id: "tr3loop1",
                title: "",
                placeholder: "Loop One",
                notes: "",
              },
            ],
          },
          {
            id: "TR4",
            title: "",
            placeholder: "Bass",
            loops: [
              {
                id: "tr4loop1",
                title: "",
                placeholder: "Loop One",
                notes: "",
              },
            ],
          },
          {
            id: "TR5",
            title: "",
            placeholder: "Vocals",
            loops: [
              {
                id: "tr5loop1",
                title: "",
                placeholder: "Loop One",
                notes: "",
              },
            ],
          },
        ],
      },
    ],
  ]);

  const [currentSetlist, setCurrentSetlist] = useState(0);

  const handleSetlistChange = (newSetlistIndex: number) => {
    setSongs((prevSongs) => {
      if (!prevSongs[newSetlistIndex]) {
        const newSetlists = [...prevSongs];
        newSetlists[newSetlistIndex] = [
          {
            id: 1,
            title: "",
            isComplete: false,
            tracks: [
              {
                id: "TR1",
                title: "",
                placeholder: "Main Beat",
                loops: [
                  {
                    id: "tr1loop1",
                    title: "",
                    placeholder: "Loop One",
                    notes: "",
                  },
                ],
              },
              {
                id: "TR2",
                title: "",
                placeholder: "Percussion",
                loops: [
                  {
                    id: "tr2loop1",
                    title: "",
                    placeholder: "Loop One",
                    notes: "",
                  },
                ],
              },
              {
                id: "TR3",
                title: "",
                placeholder: "Chords",
                loops: [
                  {
                    id: "tr3loop1",
                    title: "",
                    placeholder: "Loop One",
                    notes: "",
                  },
                ],
              },
              {
                id: "TR4",
                title: "",
                placeholder: "Bass",
                loops: [
                  {
                    id: "tr4loop1",
                    title: "",
                    placeholder: "Loop One",
                    notes: "",
                  },
                ],
              },
              {
                id: "TR5",
                title: "",
                placeholder: "Vocals",
                loops: [
                  {
                    id: "tr5loop1",
                    title: "",
                    placeholder: "Loop One",
                    notes: "",
                  },
                ],
              },
            ],
          },
        ];
        return newSetlists;
      }
      return prevSongs;
    });

    setCurrentSetlist(newSetlistIndex);
  };

  useEffect(() => {
    console.log("songs", songs);
  }, [songs]);

  const deleteSetlist = (setId: number) => {
    console.log("setId", setId);
    setSongs((prev) => {
      return prev.filter((_, index) => index !== setId);
    });

    if (setId === 0) {
      setCurrentSetlist(0);
    } else {
      setCurrentSetlist(setId - 1);
    }
  };

  const deleteSong = (songId: number) => {
    setSongs((prevSongs) => {
      const updatedSetlists = [...prevSongs];
      updatedSetlists[currentSetlist] = updatedSetlists[currentSetlist].filter(
        (song) => song.id !== songId
      );
      return updatedSetlists;
    });
  };

  const deleteLoop = (loopId: string) => {
    setSongs((prevSongs) => {
      const updatedSetlists = [...prevSongs];
      updatedSetlists[currentSetlist] = updatedSetlists[currentSetlist].map(
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

  const editSong = (songId: number, updatedSong: Partial<Song>) => {
    setSongs((prevSongs) =>
      prevSongs.map((setlist, index) =>
        index === currentSetlist
          ? setlist.map((song) =>
              song.id === songId ? { ...song, ...updatedSong } : song
            )
          : setlist
      )
    );
  };

  const addNewSong = () => {
    const newId =
      songs[currentSetlist].length > 0
        ? songs[currentSetlist][songs[currentSetlist].length - 1].id + 1
        : 1;
    const newTracks: Track[] = [];
    for (let i = 1; i <= 5; i++) {
      newTracks.push({
        id: `TR${i + 1}`,
        title: `Track ${i}`,
        placeholder: `Track ${i}`,
        loops: [
          {
            id: `LP${i + 1}`,
            title: "",
            placeholder: "Loop One",
            notes: "",
          },
        ],
      });
    }
    setSongs((prevSongs) => {
      const updatedSetlists = [...prevSongs];
      updatedSetlists[currentSetlist] = [
        ...updatedSetlists[currentSetlist],
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
      updatedSetlists[currentSetlist] = updatedSetlists[currentSetlist].map(
        (song, i) => {
          if (i !== songIndex) return song;
          const updatedTracks = song.tracks.map((track) => {
            if (track.id !== trackId || track.loops.length >= 5) return track;
            return {
              ...track,
              loops: [
                ...track.loops,
                {
                  id: `LP${track.loops.length + 1}`,
                  title: "",
                  placeholder: `Loop${track.loops.length + 1}`,
                  notes: "",
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

  const handleSongCompletion = (index: number) => () => {
    setSongs((prevSongs) => {
      const updatedSetlists = [...prevSongs];
      updatedSetlists[currentSetlist] = updatedSetlists[currentSetlist].map(
        (song, i) =>
          i === index ? { ...song, isComplete: !song.isComplete } : song
      );
      return updatedSetlists;
    });
  };

  return (
    <>
      <div className="flex justify-between items-end mt-3 border-solid border-2 border-sky-700 rounded-lg p-3 bg-slate-400">
        <EditableDropdown
          onChange={handleSetlistChange}
          current={currentSetlist}
          onDelete={deleteSetlist}
        />
        <Button variant="contained">Save</Button>
      </div>
      <Reorder.Group
        values={songs[currentSetlist] || songs[currentSetlist - 1]}
        onReorder={(newOrder) => {
          const updatedSongs = [...songs];
          updatedSongs[currentSetlist] = newOrder;
          setSongs(updatedSongs);
        }}
      >
        {songs[currentSetlist]?.map((song, index) => (
          <Reorder.Item
            value={song === undefined ? [] : song}
            style={
              song.isComplete
                ? { textDecoration: "line-through", opacity: 0.4 }
                : { opacity: 1 }
            }
            className="flex flex-col gap-3 mb-5 border border-black p-3 my-3 rounded-lg bg-blue-950"
            key={song.id}
          >
            <div className="flex gap-3 items-center">
              <div className="flex gap-1 items-center">
                <MdDragIndicator style={{ color: "#fff", fontSize: "40px" }} />
                <h1 className="text-xl text-white">{index + 1}.)</h1>
                <TextField
                  style={{ background: "white" }}
                  type="text"
                  value={song.title}
                  variant="standard"
                  placeholder={`Song Title ${index + 1}`}
                  onChange={(e) => editSong(song.id, { title: e.target.value })}
                />
              </div>
              <div className="flex gap-3 items-center">
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
              {song.tracks.map((track) => (
                <div
                  className=" flex flex-col gap-1 border border-cyan-200 rounded"
                  key={track.id}
                >
                  <h3>
                    <div className="flex gap-1">
                      <div className="text-white">{track.id}</div>
                      <input
                        style={{ maxWidth: "180px" }}
                        type="text"
                        className="pl-1"
                        placeholder={track.placeholder}
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
      <button
        className="focus:outline-none w-64 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
        onClick={addNewSong}
      >
        + ADD NEW SONG
      </button>
    </>
  );
};

export default SongList;
