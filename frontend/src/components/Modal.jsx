import React from "react";

const Modal = ({ isOpen, isClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50">
            <div className="absolute bg-white p-4 rounded-lg top-[40%] right-[45%] z-50 text-right">
              <button
                className="mr-2 font-semibold text-black hover:text-gray-700 focus:outline-none "
                onClick={isClose}
              >
                X
              </button>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
