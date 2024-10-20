import React, { useState } from "react";

function Tracks() {
  const [tracks, setTracks] = useState([
    { id: 1, title: "", placeholder: "Main Beat" },
    { id: 2, title: "", placeholder: "Percussion" },
    { id: 3, title: "", placeholder: "Chords" },
    { id: 4, title: "", placeholder: "Bass" },
    { id: 5, title: "", placeholder: "Vocals" },
  ]);

  return <div>T</div>;
}

export default Tracks;
