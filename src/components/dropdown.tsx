import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

type Option = {
  id: number;
  label: string;
};

interface EditableDropdownProps {
  onChange: (newSetlistIndex: number) => void;
  setlistIndex: number;
}

const EditableDropdown: React.FC<EditableDropdownProps> = ({
  onChange,
  setlistIndex,
}) => {
  const [options, setOptions] = useState<Option[]>([
    { id: 1, label: "Setlist 1" },
    { id: 2, label: "Setlist 2" },
    { id: 3, label: "Setlist 3" },
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedOptions = localStorage.getItem("setlists");
      if (savedOptions) {
        setOptions(JSON.parse(savedOptions));
      }
    }
  }, []);

  const [newLabel, setNewLabel] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const textFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem("setlists", JSON.stringify(options));
  }, [options]);

  useEffect(() => {
    if (isEditing && textFieldRef.current) {
      textFieldRef.current.focus();
      textFieldRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = (): void => {
    setIsEditing(true);
    setNewLabel(options[setlistIndex].label);
  };

  const handleUpdate = (): void => {
    const hasSameLabel = options.some(
      () => options[setlistIndex].label === newLabel
    );
    if (newLabel === "" || hasSameLabel) return;

    setOptions(
      options.map((opt) =>
        opt.id === setlistIndex + 1
          ? {
              ...opt,
              label: newLabel,
            }
          : opt
      )
    );

    setIsEditing(false);
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const selectedSetlist = parseInt(event.target.value as string, 10);
    onChange(selectedSetlist);
  };

  return (
    <div className="flex m-auto">
      <div className="flex gap-3">
        {!isEditing && (
          <div className="flex gap-2 items-center">
            <button
              className="focus:outline-none text-white bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:ring-stone-300 font-lg rounded-lg text-md px-3 py-1"
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>
        )}
        {!isEditing && (
          <FormControl variant="standard" sx={{ width: 300 }} size="small">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={setlistIndex}
              label="Setlist 1"
              onChange={handleSelectChange}
            >
              {options.map((option, index) => (
                <MenuItem key={option.id} value={index}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <div>
          {isEditing && (
            <div className="flex gap-2 items-end">
              <TextField
                size="small"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                inputRef={textFieldRef}
                sx={{ background: "#fff", width: 200 }}
              />
              <Button
                variant="contained"
                sx={{ height: 36, width: 85, background: "#4F46E5" }}
                onClick={handleUpdate}
              >
                Update
              </Button>
              <Button
                variant="contained"
                sx={{ height: 36, width: 85, background: "#3F3F46" }}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditableDropdown;
