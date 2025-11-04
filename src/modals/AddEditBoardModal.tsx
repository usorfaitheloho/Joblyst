import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface AddEditBoardModalProps {
  setBoardModalOpen: (value: boolean) => void;
}

function AddEditBoardModal({
  setBoardModalOpen,
  type,
}: AddEditBoardModalProps) {
  const [name, setName] = useState("");
  
  const [newColumns, setNewColumns] = useState(
    [
    
    { name: "Todo", task: [], id: uuidv4() },
    { name: "Todo", task: [], id: uuidv4() },
    
  ]
)

  const handleOnChange = (id: string, newValue: string)=>{
  setNewColumns((prevState)=> {
    const newState = [...prevState]
    const column = newState.find((col) => col.id===id)
    if (column) {
      column.name = newValue
    }
    return newState
  })
}
  return (
    <div
      className="
      fixed bottom-0 left-0 top-0 right-0 z-50 px-2 py-4 overflow-scroll 
      justify-center items-center flex bg-[#00000080]
      "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardModalOpen(false);
      }}
    >
      <div
        className="overflow-y-scroll scrollbar-hide max-h-[95v] bg-white 
        dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] 
        max-w-md mx-auto w-full px-8 py-8 rounded-xl
        "
      >
        <h3 className="text-lg">
          {type === "edit" ? "Edit" : "Add New"} Board
        </h3>

        {/* Task Name */}
        <div className="flex flex-col mt-8 space-y-3">
          <label className="text-sm text-gray-500 dark:text-white">
            Board Name
          </label>
          <input
            className="px-4 py-2 text-sm border border-gray-600 rounded-md focus:outline-[#635fc7] 
              outline-1 ring-0 outline-none bg-transparent"
            placeholder="e.g software engineer"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="board-name-input"
          />
        </div>

        {/* Board Columns*/}

        <div className="flex flex-col mt-8 space-y-3">
          <label className="text-sm text-gray-500 dark:text-white">
            Board Columns
          </label>

          {
          newColumns.map((column,index)=>(
          <div key={index} className="flex items-center w-full ">
            <input 
            className="flex-grow px-4 py-2 text-sm bg-transparent border border-gray-600 rounded-md outline-none focus:outline-[#735fc7]
            "
            onChange={(e)=>{
              handleOnChange(column.id, e.target.value)
            }}
            value={column.name}
            type="text"  
            />
          </div>
          ) )
          }
        </div>
      </div>
    </div>
  );
}

export default AddEditBoardModal;
