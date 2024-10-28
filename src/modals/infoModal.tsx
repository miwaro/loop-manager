/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FaCircleInfo } from "react-icons/fa6";
import { FaPaypal } from "react-icons/fa6";
import { FaSquareXmark } from "react-icons/fa6";
import { motion } from "framer-motion";
import { IconContext } from "react-icons";

export default function InfoModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <FaCircleInfo className="icon_btn" onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="info_box relative">
          <IconContext.Provider
            value={{ color: "#F9FAFB", className: "closeIcon" }}
          >
            <FaSquareXmark
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                cursor: "pointer",
                fontSize: "30px",
              }}
              onClick={handleClose}
            />
          </IconContext.Provider>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h5"
            className="modal-header rounded"
          >
            <div className="p-2">Welcome to Loop List!</div>
          </Typography>
          <div style={{ margin: "20px", color: "#fff" }}>
            <p>
              Hi, my name is Michael. I spent a good amount of time creating
              this app and it is free, so if you find it to be useful, please
              consider making a donation!
            </p>
          </div>
          <p style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
            <motion.button
              className="p-3 rounded-lg border border-white"
              whileTap={{ scale: 0.92 }}
              style={{
                padding: "12px",
                display: "flex",
                backgroundColor: "#0284C7",
              }}
            >
              <a
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                }}
                href="https://paypal.me/michaelrooze?locale.x=en_US"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="mr-3">DONATE</span>
                <FaPaypal />
              </a>
            </motion.button>
          </p>
          <hr className="mt-3" />

          <div style={{ margin: "16px", color: "#fff" }}>
            <p>
              The idea for this app came from my own need to organize my songs,
              but maybe even more importantly, to remember what the heck I did
              in the first place!
            </p>
            <br />
            <p>
              This app allows you to not only create notes for each loop for
              each track for each song for multiple setlists, but you can also
              upload documents like tablature, lyrics, or even a video of
              yourself playing whatever instrument you play so you will always
              have a reference of what you played.
            </p>
            <br />
            <p className="text-sm">
              If you have questions or suggestions for the app, feel free to
              email me at{" "}
              <a className="underline" href="mailto:mikerooze12@gmail.com">
                mikerooze12@gmail.com.
              </a>
            </p>
          </div>
        </Box>
      </Modal>
    </>
  );
}
