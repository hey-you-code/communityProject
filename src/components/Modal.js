import React, { forwardRef, useRef, useImperativeHandle, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  
  useImperativeHandle(ref, () => {
    return {
      open: () => setOpen(true),
      close: () => setOpen(false),
    };
  });
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                delay: 0.3,
              },
            }}
            onClick={() => setOpen(false)}
            className="fixed top-0 left-0 h-screen w-screen"
            style={{
              background: "rgba(0, 0, 0, 0.6)",
            }}
          />
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              scale: 0,
              transition: {
                delay: 0.3,
              },
            }}
            className="bg-white fixed w-4/5 h-4/5 inset-0 m-auto rounded-2xl z-20"
          >
            <motion.div
              initial={{
                x: 500,
                //   opacity: 0,
              }}
              animate={{
                x: 0,
                //   opacity: 1,
                transition: {
                  delay: 0.3,
                  duration: 0.3,
                },
              }}
              exit={{
                x: 500,
                opacity: 0,
                transition: {
                  duration: 0.3,
                },
              }}
            >
              {props.children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

export default Modal;
