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

const useStyles = makeStyles((theme) => ({
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    borderRadius: 8,
    p: 4,
    outline: "none",
    padding: 16,
  },
  buttonGroup: {
    marginTop: 16,
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
  };

  return (
    <>
      <Tooltip title="Add Notes">
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
            Add a Note for the Song
          </Typography>
          <TextField
            fullWidth
            label="Your Note"
            variant="outlined"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            multiline
            rows={4}
          />
          <Box className={classes.buttonGroup}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save Note
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SongNotes;
