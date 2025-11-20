import React from "react";

const DeleteModal = ({
  type,
  title,
  onDeleteBtnClick,
  setIsDeleteModalOpen,
}) => {
  return (
    //Modal Container
    <div
      className="fixed bottom-0 top-0 left-0 right-0 z-50 flex items-center justify-center bg-[#00000080] px-2 py-4 overflow-scroll"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsDeleteModalOpen(false);
      }}
    >
      {/* Delete Modal*/}

      <div className="max-w-lg w-full max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white px-8 py-8 rounded-xl">
        <h3 className="text-xl font-bold text-red-500">Delete this {type}?</h3>

        {type === "task" ? (
          <p className="pt-6 text-sm font-semibold tracking-wide text-gray-500">
            Are you sure you want to delete the {title} task and its subtask?
            This action cannot be reversed
          </p>
        ) : (
          <p className="pt-6 text-sm font-semibold tracking-wide text-gray-500">
            Are you sure you want to delete the {title} board? This action
            cannot be reversed
          </p>
        )}

        <div className="flex items-center justify-center w-full mt-4 space-x-4">
          <button
            onClick={onDeleteBtnClick}
            className="items-center w-full py-2 font-semibold text-white bg-red-500 rounded-full hover:opacity-75"
          >
            Delete
          </button>
          <button
            onClick={()=>setIsDeleteModalOpen(false)}
            className="items-center w-full py-2 font-semibold bg-[#635fc71a] rounded-full text-[#635fc7] hover:opacity-75"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
