import React from "react";
import TabImport from "./tabImport";

function Track() {
  return (
    <div className="border flex flex-col">
      <textarea
        className="text-black"
        name=""
        id=""
        cols="30"
        rows="3"
      ></textarea>
      <TabImport />
      <div className="flex">
        <p>Track 1</p>
        <input type="text" className="border" />
      </div>
    </div>
  );
}

export default Track;
