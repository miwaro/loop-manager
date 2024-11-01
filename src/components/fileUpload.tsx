import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Modal, Box } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";

interface FileUploadProps {
  setlistIndex: number;
  trackId: string;
  loopId: string;
  onFileUpload: (
    setlistIndex: number,
    trackId: string,
    loopId: string,
    file: string | null
  ) => void;
  savedFile?: string | null;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FileUpload: React.FC<FileUploadProps> = ({
  setlistIndex,
  trackId,
  loopId,
  onFileUpload,
  savedFile,
}) => {
  const [fileUrl, setFileUrl] = useState<string>(savedFile || "");
  const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setFileUrl(savedFile || "");
  }, [savedFile]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setFileUrl(reader.result as string);
          onFileUpload(setlistIndex, trackId, loopId, reader.result as string);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePreview = () => {
    setIsPreviewVisible(true);
  };

  const handleClose = () => {
    setIsPreviewVisible(false);
  };

  const handleDelete = () => {
    setFileUrl("");
    setIsPreviewVisible(false);
    onFileUpload(setlistIndex, trackId, loopId, null);
  };

  return (
    <div>
      {!fileUrl && (
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          style={{
            color: "#F3F4F6",
            width: "100%",
            backgroundColor: "#6366F1",
          }}
          startIcon={<CloudUploadIcon />}
          size="small"
        >
          Upload file
          <VisuallyHiddenInput
            type="file"
            accept="video/*, .pdf, .doc, .docx, .png, .jpg, .jpeg"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </Button>
      )}
      {fileUrl && (
        <div className="flex justify-between">
          <div>
            <button
              className="focus:outline-none px-2 py-1 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded text-sm"
              onClick={handlePreview}
            >
              PREVIEW FILE
            </button>
          </div>
          <div>
            <button
              className="focus:outline-none  px-2 py-1 text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:ring-rose-300 font-medium rounded text-sm"
              onClick={handleDelete}
            >
              DELETE FILE
            </button>
          </div>
        </div>
      )}
      <Modal open={isPreviewVisible} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          {fileUrl &&
            (fileUrl.startsWith("data:video") ? (
              <video width="400" controls>
                <source src={fileUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : fileUrl.startsWith("data:image") ? (
              <img src={fileUrl} alt="Uploaded Preview" width="400" />
            ) : (
              <iframe
                src={fileUrl}
                width="400"
                height="500"
                title="File Preview"
                frameBorder="0"
              />
            ))}
        </Box>
      </Modal>
    </div>
  );
};

export default FileUpload;
