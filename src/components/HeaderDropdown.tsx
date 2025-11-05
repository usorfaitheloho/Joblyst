import { useDispatch, useSelector } from "react-redux";
import boardIcon from "../assets/icon-board.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import { Switch } from "@headlessui/react";
import useDarkMode from "../Hooks/useDarkMode";
import { useState } from "react";
import boardsSlice from "../redux/boardsSlice";

interface Board {
  name: string;
  isActive: boolean;
  columns?: unknown[];
}

interface RootState {
  boards: Board[];
}

interface HeaderDropdownProps {
  setOpenDropDown: (value: boolean) => void;
  setBoardModalOpen:(value: boolean) => void;
}

function HeaderDropdown({ setBoardModalOpen,setOpenDropDown }: HeaderDropdownProps) {
  const [colorTheme, setTheme] = useDarkMode();
  const dispatch = useDispatch()
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked: boolean) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state: RootState) => state.boards);

  return (
    <div
      className="absolute left-0 right-0 px-6 py-10 bottom-[-100vh] top-16 bg-[#00000080]"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropDown(false);
      }}
    >
      {/* Dropdown modal */}

      <div className="bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] w-full py-4 rounded-xl">
        <h3 className="mx-4 mb-8 font-semibold text-gray-600 dark:text-gray-300">
          ALL BOARDS({boards?.length})
        </h3>
        <div>
          {boards.map((board: Board, index: number) => (
            <div
              key={index}

              className={`flex items-baseline space-x-2 px-5 py-4 text-gray-600 dark:text-white
                ${
                  board.isActive &&
                  "bg-[#635fc7] rounded-r-full text-white mr-8"
                }`}
                onClick={()=>{
                  dispatch(boardsSlice.actions.setBoardActive({
                    index
                  }))
                }}
            >
              <img src={boardIcon} className="h-4" />
              <p className="text-lg font-bold">{board.name}</p>
            </div>
          ))}

          <div 
            className="flex items-baseline space-x-2 text-[#635fc7] px-5 py-4"
            onClick={()=> {
              setBoardModalOpen(true)
              setOpenDropDown(false)
            }}
          >
            <img src={boardIcon} className="h-4" />
            <p className="text-lg font-bold">
              Create New Board
            </p>
          </div>

          <div
            className="p-4 mx-2 space-x-2 bg-slate-100 dark:bg-[#20212c]
           flex justify-center items-center rounded-lg"
          >
            <img
              src={lightIcon}
              className="h-4"
              alt="lightmode with sun icon"
            />

            {/* Switch*/}
            <Switch
              checked={darkSide}
              onChange={toggleDarkMode}
              className={` $ {
                darkSide ? "bg-[#635fc7]"
                 : "bg-gray-200"}
                 relative inline-flex h-6 w-11
                 items-center rounded-full
                `}
            >
              <span
                className={`${darkSide ? "translate-x-6" : "translate-x-1"}
              inline-block h-4 w-4 transform
              rounded-full bg-white transition
              `}
              />
            </Switch>

            <img src={darkIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropdown;
