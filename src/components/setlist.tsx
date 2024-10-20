import React, { ChangeEventHandler, MouseEventHandler } from "react";

type SetlistProps = {
  addSetlist: MouseEventHandler<HTMLButtonElement>;
  setLists: string[];
  handleSelect: ChangeEventHandler<HTMLSelectElement>;
  toggleMenu: MouseEventHandler<HTMLButtonElement>;
};

function Setlist({
  addSetlist,
  handleSelect,
  setLists,
  toggleMenu,
}: SetlistProps) {
  return (
    <div className="flex gap-5">
      <select
        // multiple={true}
        value={setLists}
        onChange={handleSelect}
        className="text-black"
      >
        {setLists?.map((setList, index) => (
          <option key={index}>{setList}</option>
        ))}
      </select>
      <button
        onClick={addSetlist}
        type="button"
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
      >
        Add new SetList
      </button>
      {/* <button
        onClick={addSetlist}
        type="button"
        className="focus:outline-none text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-900"
      >
        Edit
      </button>
      <button
        onClick={addSetlist}
        type="button"
        className="focus:outline-none text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-900"
      >
        Remove Setlist
      </button> */}
    </div>
  );
}

export default Setlist;
