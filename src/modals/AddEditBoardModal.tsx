import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";

interface AddEditBoardModalProps {
  setBoardModalOpen: (value: boolean) => void;
  type: "add" | "edit";
}

function AddEditBoardModal({
  setBoardModalOpen,
  type,
}: AddEditBoardModalProps) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  const [newColumns, setNewColumns] = useState([
    { name: "Todo", task: [], id: uuidv4() },
    { name: "Doing", task: [], id: uuidv4() },
  ]);

  // Initialize form fields when editing an existing board.
  // Use useEffect to avoid setting state during render.
  useEffect(() => {
    if (type === "edit" && isFirstLoad && board) {
      setNewColumns(
        board.columns.map((col) => {
          return { ...col, id: uuidv4() };
        })
      );
      setName(board.name);
      setIsFirstLoad(false);
    }
  }, [type, isFirstLoad, board]);

  const handleOnChange = (id: string, newValue: string) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      if (column) {
        column.name = newValue;
      }
      return newState;
    });
  };

  const handleDelete = (id: string) => {
    setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
  };

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }

    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }

    setIsValid(true);
    return true;
  };

  const onSubmit = (type: "add" | "edit") => {
    try {
      setIsLoading(true);
      if (type === "add") {
        dispatch(boardsSlice.actions.addBoard({ name, newColumns }));
      } else {
        dispatch(boardsSlice.actions.editBoard({ name, newColumns }));
      }
      setBoardModalOpen(false);
    } catch (error) {
      console.error("Error submitting board:", error);
      setIsLoading(false);
    }
  };

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
          {!isValid && !name.trim() && (
            <p className="text-xs text-red-500">Board name is required</p>
          )}
        </div>

        {/* Board Columns*/}

        <div className="flex flex-col mt-8 space-y-3">
          <label className="text-sm text-gray-500 dark:text-white">
            Board Columns
          </label>

          {newColumns.map((column) => (
            <div key={column.id} className="flex items-center w-full">
              <input
                className="flex-grow px-4 py-2 text-sm bg-transparent border border-gray-600 rounded-md outline-none focus:outline-[#635fc7]"
                onChange={(e) => {
                  handleOnChange(column.id, e.target.value);
                }}
                value={column.name}
                type="text"
              />
              <img
                src={crossIcon}
                alt="cross icon"
                className="m-4 cursor-pointer"
                onClick={() => {
                  handleDelete(column.id);
                }}
              />
            </div>
          ))}
        </div>

        <div>
          <button
            className="w-full items-center hover:opacity-75 dark:text-[#635fc7]
                      dark:bg-white text-white bg-[#635fc7] mt-2 py-2 rounded-full"
            onClick={() => {
              setNewColumns((state) => [
                ...state,
                { name: "", task: [], id: uuidv4() },
              ]);
            }}
          >
            +Add new column
          </button>
          <button
            className="w-full items-center hover:opacity-75 dark:text-white
                      dark:bg-[#635fc7] mt-8 relative text-white bg-[#635fc7] py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              const isValid = validate();
              if (isValid === true) onSubmit(type);
            }}
            disabled={isLoading}
          >
            {isLoading
              ? "Processing..."
              : type === "add"
                ? "Create New Board"
                : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditBoardModal;
