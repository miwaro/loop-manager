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
    <div className="flex justify-center gap-80 items-end mt-3 mb-1 mx-1">
      <div className="flex items-end">
        <h1 className="font-rock3d text-4xl p-2 font-semibold bg-emerald-500 rounded-md border-4 border-indigo-500">
          Loop-List
        </h1>

        <h3 className="text-stone-950 italic font-medium  mx-3">
          ...a setlist manager for loop artists
        </h3>
        <InfoModal />
      </div>
      <div>
        <EditableDropdown onChange={onChange} setlistIndex={setlistIndex} />
      </div>
    </div>
  );
};

export default Navbar;
