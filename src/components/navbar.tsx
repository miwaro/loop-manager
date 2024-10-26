"use client";

import React from "react";
import InfoModal from "@/modals/infoModal";
import EditableDropdown from "./dropdown";

interface EditableDropdownProps {
  onChange: (newSetlistIndex: number) => void;
  setlistIndex: number;
}

const Navbar: React.FC<EditableDropdownProps> = ({
  onChange,
  setlistIndex,
}) => {
  return (
    <div className="flex gap-2 justify-between items-center mt-6 mx-1">
      <div className="flex items-center">
        <h1 className="text-white text-[26px]">Loop Tracker </h1>
        <h3 className="text-white italic  mx-3">--- A setlist manager for loop artists</h3>
        <InfoModal />
      </div>
      <div>
        <EditableDropdown onChange={onChange} setlistIndex={setlistIndex} />
      </div>
    </div>
  );
};

export default Navbar;
