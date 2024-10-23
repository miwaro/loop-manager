import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  InputLabel,
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
  onDelete: (newSetlistIndex: number) => void;
  current: number;
}

const EditableDropdown: React.FC<EditableDropdownProps> = ({
  onChange,
  current,
  onDelete,
}) => {
  const [options, setOptions] = useState<Option[]>([
    { id: 1, label: "Setlist 1" },
  ]);
  const [newLabel, setNewLabel] = useState<string>("");
  const [newOptionLabel, setNewOptionLabel] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const textFieldRef = useRef<HTMLInputElement>(null);
  const newSetlistFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && textFieldRef.current) {
      textFieldRef.current.focus();
      textFieldRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    if (isAdding && newSetlistFieldRef.current) {
      newSetlistFieldRef.current.focus();
    }
  }, [isAdding]);

  const handleEdit = (): void => {
    setIsEditing(true);
    setNewLabel(options[current].label);
  };

  const handleDelete = (index: number): void => {
    if (options.length === 1) {
      return;
    }

    onDelete(index);
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleUpdate = (): void => {
    const hasSameLabel = options.some(
      () => options[currentIndex].label === newLabel
    );
    if (newLabel === "" || hasSameLabel) return;

    setOptions(
      options.map((opt) =>
        opt.id === currentIndex + 1
          ? {
              ...opt,
              label: newLabel,
            }
          : opt
      )
    );

    setIsEditing(false);
  };

  const handleAddOption = (): void => {
    if (newOptionLabel === "") return;
    setIsAdding(false);
    if (newOptionLabel.trim()) {
      const newOption: Option = {
        id: options.length > 0 ? options[options.length - 1].id + 1 : 1,
        label: newOptionLabel,
      };
      setOptions([...options, newOption]);
      setNewOptionLabel("");
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const selectedSetlist = parseInt(event.target.value as string, 10);
    setCurrentIndex(selectedSetlist);
    onChange(selectedSetlist);
  };

  return (
    <div className="flex gap-3 w-2/3 items-end">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Setlist</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={current}
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
      <div>
        {isEditing && !isAdding && (
          <div className="flex gap-3 items-end">
            <TextField
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              inputRef={textFieldRef}
              sx={{ background: "#fff", width: 200 }}
            />
            <Button
              variant="contained"
              sx={{ height: 40, width: 120 }}
              onClick={handleUpdate}
            >
              Update
            </Button>
            <Button
              color="error"
              variant="contained"
              sx={{ height: 40, width: 120 }}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        )}

        {!isEditing && !isAdding && (
          <div className="flex gap-3 items-end">
            <Button
              variant="contained"
              disabled={isAdding}
              sx={{ height: 40 }}
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              disabled={options.length === 1 || isAdding}
              color="error"
              variant="contained"
              sx={{ height: 40 }}
              onClick={() => handleDelete(currentIndex)}
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      <div>
        {isAdding && !isEditing && (
          <div className="flex gap-3 items-center">
            <TextField
              value={newOptionLabel}
              onChange={(e) => setNewOptionLabel(e.target.value)}
              placeholder="New Setlist"
              inputRef={newSetlistFieldRef}
              sx={{ height: 40 }}
            />
            <Button
              color="success"
              variant="contained"
              disabled={newOptionLabel === ""}
              sx={{ height: 40 }}
              onClick={handleAddOption}
            >
              Submit
            </Button>
            <Button
              color="error"
              variant="contained"
              sx={{ height: 40 }}
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </Button>
          </div>
        )}
        {!isAdding && !isEditing && (
          <div className="flex gap-3 items-center">
            <Button
              color="success"
              variant="contained"
              disabled={isEditing || options.length >= 5}
              sx={{ height: 40, width: 150 }}
              onClick={() => setIsAdding(true)}
            >
              Add SetList
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableDropdown;
