import React from "react";

function SongInfo() {
  return (
    <div className="flex justify-between">
      <div className="flex gap-3">
        Song Title: <input type="text" className="text-black" />
        <div className="dropdown">
          <button className="dropdown-toggle" onClick={toggleMenu}>
            Key:{" "}
          </button>
          {isOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => handleItemClick("Option 1")}>Option 1</li>
              <li onClick={() => handleItemClick("Option 2")}>Option 2</li>
              <li onClick={() => handleItemClick("Option 3")}>Option 3</li>
            </ul>
          )}
        </div>
        Tempo: <input type="number" value="140" className="text-black" />
        Duration: <input type="number" value="140" className="text-black" />
      </div>
    </div>
  );
}

export default SongInfo;
