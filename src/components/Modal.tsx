import React from "react";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";

const Modal = ({
  cancel,
  confirm,
  content,
  isCancel,
  confirmText,
  cancelText,
  title,
}: any) => {
  const handleConfirm = async () => {
    await confirm();
    cancel();
  };

  return (
    <div className="h-screen flex justify-center items-center bg-shade-500 fixed inset-0 z-[1000] overflow-auto bg-opacity-80 font-sarala text-[16px]">
      <motion.div
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 1 }}
        animate={{ y: 100 }}
        transition={{
          type: "spring",
          stiffness: 100,
          duration: 3,
          x: { duration: 1 },
        }}
        className="w-11/12 md:w-3/12 h-[25%] flex flex-col justify-center items-center bg-neutral-300 rounded-2xl -mt-[200px]"
      >
        <>
          <div className="flex items-center px-5 h-[20%] w-full bg-neutral-900 overflow-hidden rounded-t-2xl text-neutral-300 justify-between">
            <p>{title}</p>
            <div onClick={cancel} className="text-[20px] cursor-pointer">
              <MdClose />
            </div>
          </div>
          <div className="w-full h-[80%] px-5 py-5 flex flex-col justify-between">
            <p className=" text-neutral-900 text-[16px] font-bold">{content}</p>
            <div className="w-full flex justify-end gap-2">
              {isCancel ? (
                <button
                  onClick={cancel}
                  className="px-6 py-1 bg-shade-500 rounded-xl text-neutral-500"
                >
                  {cancelText}
                </button>
              ) : null}
              <button
                onClick={handleConfirm}
                className="px-5 py-1 bg-blue-500 rounded-xl text-neutral-100"
              >
                {confirmText}
              </button>
            </div>
          </div>
        </>
      </motion.div>
    </div>
  );
};

export default Modal;
