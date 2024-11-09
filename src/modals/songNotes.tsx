import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import NotesIcon from "@mui/icons-material/Notes";

interface AddNoteModalProps {
  open: boolean;
  handleClose: () => void;
  id: string;
  notes: string | undefined;
  onSave: (note: string, id: string) => void;
}

const useStyles = makeStyles(() => ({
  modalStyle: {
    position: "fixed",
    top: 0,
    right: 0,
    height: "100%",
    width: 400,
    backgroundColor: "white",
    borderRadius: "8px 0 0 8px",
    padding: 16,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    outline: "none",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  textFieldContainer: {
    flexGrow: 1,
    marginTop: 16,
  },
  buttonGroup: {
    margin: 12,
    display: "flex",
    justifyContent: "space-between",
  },
}));

const SongNotes: React.FC<AddNoteModalProps> = ({ id, notes, onSave }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState<any>(notes);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (notes !== undefined) {
      setNote(notes);
    }
  }, [notes]);

  const handleSave = () => {
    onSave(note, id);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Add Notes" placement="right-start">
        <Button
          component="label"
          variant="outlined"
          tabIndex={-1}
          startIcon={<NotesIcon />}
          onClick={handleOpen}
          style={{
            backgroundColor: "#4F46E5",
            cursor: "pointer",
            color: "#F3F4F6",
            margin: "0 5px",
          }}
          size="small"
        >
          SONG NOTES
        </Button>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        <Box className={classes.modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            Add a Note <span className="text-sm">(lyrics, key, bpm, etc.)</span>
          </Typography>

          <Box className={classes.textFieldContainer}>
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#aeaeae",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4F46E5",
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "1.25rem",
                  },
                },
              }}
              fullWidth
              variant="outlined"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              multiline
              rows={32}
              style={{ height: "100%" }}
            />
          </Box>

          <Box className={classes.buttonGroup}>
            <Button
              style={{ color: "white", backgroundColor: "#57534E" }}
              variant="outlined"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              style={{ color: "white", backgroundColor: "#4F46E5" }}
              variant="contained"
              onClick={handleSave}
            >
              Save Note
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SongNotes;
