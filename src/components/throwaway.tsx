import React, { useState } from "react";
import { Reorder } from "framer-motion";
import { MdDragIndicator } from "react-icons/md";

interface Track {
  id: number;
  title: string;
  loops: [];
}

interface Song {
  id: number;
  isComplete: boolean;
  title: string;
  tracks: Track[];
}

const SongList: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([
    {
      id: 1,
      title: "",
      isComplete: false,
      tracks: [
        { 
          id: 1,
          title: "Introduction",
          loops: [
          { 
            id: 'tr1loop1',
            title: "Intro",
            notes: "" 
          },

        ]
      },

      


  ]);

  const [songIsComplete, setSongIsComplete] = useState(false);

  // const addTrack = (songId: number, newTrack: Track) => {
  //   setSongs((prevSongs) =>
  //     prevSongs.map((song) => {
  //       if (song.id === songId) {
  //         return {
  //           ...song,
  //           tracks: [...song.tracks, { ...newTrack }],
  //         };
  //       }
  //       return song;
  //     })
  //   );
  // };

  // const deleteTrack = (songId: number, trackId: number) => {
  //   setSongs((prevSongs) =>
  //     prevSongs.map((song) => {
  //       if (song.id === songId) {
  //         return {
  //           ...song,
  //           tracks: song.tracks.filter((track) => track.id !== trackId),
  //         };
  //       }
  //       return song;
  //     })
  //   );
  // };

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
      newTracks.push({ id: i, title: `Track ${i}`, duration: "0:00" });
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

  const handleSongCompletion = (index: number) => () => {
    setSongs((prevSongs) =>
      prevSongs.map((song, i) =>
        i === index ? { ...song, isComplete: !song.isComplete } : song
      )
    );
  };

  console.log("songs", songs);

  return (
    <>
      <Reorder.Group values={songs} onReorder={setSongs}>
        {songs.map((song, index) => (
          <Reorder.Item
            value={song}
            style={
              songIsComplete
                ? { textDecoration: "line-through", opacity: 0.4 }
                : { opacity: 1 }
            }
            className="flex gap-3 mb-5 border border-black p-3 my-3 rounded-lg  bg-blue-950"
            key={song.id}
          >
            <div className="flex flex-col gap-3">
              <div className="flex gap-1">
                <MdDragIndicator style={{ color: "#fff", fontSize: "40px" }} />
                {/* <h1 className="text-xl text-cyan-700">{index + 1}.)</h1>
                <input
                  type="text"
                  value={song.title}
                  onChange={(e) => editSong(song.id, { title: e.target.value })}
                /> */}
              </div>

              <div className="flex gap-3 items-center">
                <div
                  onClick={handleSongCompletion(index)}
                  style={
                    songIsComplete
                      ? { backgroundColor: "green" }
                      : { color: "transparent" }
                  }
                  className="border border-green-600 rounded p-2 flex gap-3"
                >
                  <h4 className="text-white">Complete</h4>
                  <input
                    onChange={handleSongCompletion(index)}
                    type="checkbox"
                    checked={songIsComplete}
                    value={songIsComplete ? "true" : "false"}
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
            <div></div>
            {song.tracks.map((track) => (
              <div
                className=" flex flex-col gap-1 border border-cyan-200 rounded"
                key={track.id}
              >
                <h3>
                  <div className="flex gap-1">
                    <div className="text-white">TR{track.id}</div>
                    <input type="text" placeholder="track title" />
                  </div>
                </h3>

                <textarea rows={2} cols={20} placeholder="Enter Notes..." />
              </div>
            ))}
            {/* <TrackInput songId={song.id} addTrack={addTrack} /> */}
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

// interface TrackInputProps {
//   songId: number;
//   addTrack: (songId: number, newTrack: Track) => void;
// }

// const TrackInput: React.FC<TrackInputProps> = ({ songId, addTrack, songs }) => {
//   const [title, setTitle] = useState("");
//   const [duration, setDuration] = useState("");

//   const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setTitle(event.target.value);
//   };

//   const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setDuration(event.target.value);
//   };

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     if (title.trim() && duration.trim() && songs.length < 5) {
//       addTrack(songId, {
//         title,
//         duration,
//         id: 0,
//       });
//       setTitle("");
//       setDuration("");
//     }
//   };

//   return (
//     <>
//       {songs?.length < 5 && (
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={title}
//             onChange={handleTitleChange}
//             placeholder="Track title"
//           />
//           <input
//             type="text"
//             value={duration}
//             onChange={handleDurationChange}
//             placeholder="Track duration"
//           />
//           <button
//             className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
//             type="submit"
//           >
//             Add Track
//           </button>
//         </form>
//       )}
//     </>
//   );
// };

export default SongList;
