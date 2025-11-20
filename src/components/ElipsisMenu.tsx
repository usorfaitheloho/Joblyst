import React from "react";

interface ElipsisMenuProps {
  type: string;
  setOpenEditModal: () => void;
  setOpenDeleteModal: () => void;
}

const ElipsisMenu: React.FC<ElipsisMenuProps> = ({ type , setOpenEditModal, setOpenDeleteModal}) => {
  return (
    <div
      className={
        type === "Boards" ? "absolute top-16 right-5" : "absolute top-6 right-4"
      }
    >
      <div className="flex items-center justify-end">

        <div
        className="z-50 w-40 text-sm font-medium shadow-md shadow-[#364e7e1a] bg-white dark:bg-[#20212c] rounded-lg space-y-4 py-5 px-4
        h-auto pr-12"  
        >
          <p 
          className="text-gray-700 cursor-pointer dark:text-gray-400"
          onClick={()=>{
            setOpenEditModal()
          }}>
            Edit{type}
          </p>
          
          <p className="text-red-500 cursor-pointer "
          onClick={()=>{
            setOpenDeleteModal()
          }}
          >
            Delete {type}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ElipsisMenu;
