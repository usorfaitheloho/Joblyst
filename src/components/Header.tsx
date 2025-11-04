import logo from "../assets/logo-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import { useState } from "react";
import HeaderDropdown from "./HeaderDropdown";
import AddEditBoardModal from "../modals/AddEditBoardModal";

// interface HeaderProps {
//   title: string;
// }

const Header = ({boardModalOpen, setBoardModalOpen}) => {
  
  const [openDropdown, setOpenDropDown] = useState<boolean>(false);
  
  return (
    <div className="fixed left-0 right-0 z-50 p-4 bg-white dark:bg-[#2b2c37]">
       <header className="flex items-center justify-between dark:text-white">
        {/* Left Side */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <img src={logo} alt="logo" className="w-6 h-6" />
          <h3 className="hidden font-sans font-bold md:inline-block md:text-4xl">
            kanban
          </h3>
          <div className="flex items-center">
            <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
              board Name
            </h3>

            <img
              src={openDropdown ? iconUp : iconDown}
              alt="dropdown icon"
              className="w-3 ml-2 cursor-pointer md:hidden"
              onClick={() => setOpenDropDown((prev) => !prev)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <button className="button">+ Add New Job</button>
          <button className="px-3 py-1 button md:hidden">+</button>
          <img src={ellipsis} alt="elipsis" className="h-6 cursor-pointer" />
        </div>
       
      </header>
        {
        openDropdown && <HeaderDropdown  setBoardModalOpen={setBoardModalOpen}
        setOpenDropDown={setOpenDropDown}/> 
      }
      
      {
        boardModalOpen && <AddEditBoardModal  setBoardModalOpen={setBoardModalOpen} />
      }
    </div>
     

     
  );
};

export default Header;
