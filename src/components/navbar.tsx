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
    <div className="flex flex-col sm:flex-row justify-center gap-0 md:gap-60 items-end mt-3 mb-1 mx-0 sm:mx-1">
      <div className="flex flex-col m-auto sm:m-0 sm:flex-row items-end">
        <h1 className="font-rock3d text-4xl sm:mb-0  p-2 font-semibold bg-emerald-500 rounded-md border-4 border-indigo-500">
          Loop-List
        </h1>
        <div className="flex">
          <h3 className="text-stone-950 italic font-medium mx-2">
            ...a setlist manager for loop artists
          </h3>
          <InfoModal />
        </div>
      </div>
      <div>
        <EditableDropdown onChange={onChange} setlistIndex={setlistIndex} />
      </div>
    </div>
  );
};

export default Navbar;
