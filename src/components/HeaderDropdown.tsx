import { useSelector } from "react-redux";
import boardIcon from "../assets/icon-board.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import darkIcon from "../assets/icon-dark-theme.svg";

function HeaderDropdown({ setOpenDropDown }) {
  const boards = useSelector((state) => state.boards);
  console.log("boards=", boards);
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
        <h3 className="mx-4 mb-8 font-serif text-gray-600 dark:text-gray-300">
          All boards({boards?.length})
        </h3>
        <div>
          {boards.map((board, index:number) => (
            <div
              className={`flex items-baseline space-x-2 px-5 py-4 ${board.isActive && "bg-[#635fc7] rounded-r-full text-white mr-8"}`}
              key={index}
            >
              <img src={boardIcon} className="h-4" />
              <p className="text-lg font-bold">{board.name}</p>
            </div>
          ))}
          
          <div
          className="flex items-baseline space-x-2 text-[#635fc7] px-5 py-4">
            <img src={boardIcon} className="h-4"/>
            <p
            className="text-lg font-bold">
              Create New Board
            </p>
          </div>
          
          <div
          className="p-4 mx-2 space-x-2 bg-slate-100 dark:bg-[#20212c]
           flex justify-center items-center rounded-lg"
          >
              <img src={lightIcon} className="h-4"/>
              
              {/* Switch*/}
              
              <img src={darkIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropdown;
