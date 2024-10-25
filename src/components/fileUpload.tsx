import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal, Box } from "@mui/material";

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

const FileUpload: React.FC<FileUploadProps> = ({
  setlistIndex,
  trackId,
  loopId,
  onFileUpload,
  savedFile,
}) => {
  const [fileUrl, setFileUrl] = useState<string>(savedFile || "");
  const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(false);

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

  const handlePreview = () => {
    setIsPreviewVisible(true);
  };

  const handleClose = () => {
    setIsPreviewVisible(false);
  };

  const handleDelete = () => {
    setFileUrl("");
    setFileUrl("");
    setIsPreviewVisible(false);
    onFileUpload(setlistIndex, trackId, loopId, null);
  };

  return (
    <div style={{ color: "white", maxWidth: 216 }}>
      <input
        type="file"
        accept="video/*, .pdf, .doc, .docx, .png, .jpg, .jpeg"
        onChange={handleFileChange}
      />
      {fileUrl && (
        <div>
          <div className="flex justify-between m-3">
            <div>
              <button
                className="focus:outline-none px-4 py-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                onClick={handlePreview}
              >
                Preview
              </button>
            </div>
            <div>
              <button
                className="focus:outline-none py-2 text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:ring-rose-300 font-medium rounded-lg text-sm px-4 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-900"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
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
