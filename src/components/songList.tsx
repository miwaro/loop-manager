import React, { useState } from "react";
import { Reorder } from "framer-motion";
import { MdDragIndicator } from "react-icons/md";

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
  const [songs, setSongs] = useState<Song[]>([
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
  ]);

  const deleteSong = (songId: number) => {
    setSongs((prevSongs) => prevSongs.filter((song) => song.id !== songId));
  };

  const editSong = (songId: number, updatedSong: Partial<Song>) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId ? { ...song, ...updatedSong } : song
      )
    );
  };

  const addNewSong = () => {
    const newId = songs.length > 0 ? songs[songs.length - 1].id + 1 : 1;
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
    setSongs((prevSongs) => [
      ...prevSongs,
      {
        id: newId,
        title: "",
        isComplete: false,
        tracks: newTracks,
      },
    ]);
  };

  const handleAddLoop = (trackId: string, songIndex: number) => () => {
    setSongs((prevSongs) =>
      prevSongs.map((song, i) => {
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
        return {
          ...song,
          tracks: updatedTracks,
        };
      })
    );
  };

  const handleSongCompletion = (index: number) => () => {
    console.log("index", index);
    setSongs((prevSongs) =>
      prevSongs.map((song, i) =>
        i === index ? { ...song, isComplete: !song.isComplete } : song
      )
    );
  };

  // console.log("songs", songs);

  return (
    <>
      <Reorder.Group values={songs} onReorder={setSongs}>
        {songs.map((song, index) => (
          <Reorder.Item
            value={song}
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
                <input
                  type="text"
                  value={song.title}
                  placeholder={`Song Title ${index + 1}`}
                  onChange={(e) => editSong(song.id, { title: e.target.value })}
                />
              </div>

              <div className="flex gap-3 items-center">
                <div
                  onClick={handleSongCompletion(index)}
                  style={
                    song.isComplete
                      ? { backgroundColor: "green" }
                      : { color: "transparent" }
                  }
                  className="border border-green-600 rounded p-2 flex gap-3"
                >
                  <h4 className="text-white">Complete</h4>
                  <input
                    onChange={handleSongCompletion(index)}
                    type="checkbox"
                    checked={song.isComplete}
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
                  {track.loops.map((loop, index) => (
                    <div className="flex  flex-col gap-1" key={loop.id}>
                      <div className="flex">
                        <input
                          style={{ maxWidth: "180px" }}
                          type="text"
                          className="pl-1"
                          placeholder={loop.placeholder}
                        />
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
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
        onClick={addNewSong}
      >
        Add New Song
      </button>
    </>
  );
};

export default SongList;
