import logo from "../assets/logo-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import { useState } from "react";
import HeaderDropdown from "./HeaderDropdown";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import ElipsisMenu from "./ElipsisMenu";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";

interface HeaderProps {
  boardModalOpen: boolean;
  setBoardModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({boardModalOpen, setBoardModalOpen}: HeaderProps) => {
  
  const dispatch = useDispatch()  
  
  const [openDropdown, setOpenDropDown] = useState<boolean>(false)
  const  [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [openAddEditTask, setOpenAddEditTask] = useState(false)
  const [isElipsisOpen, setIsElipsisOpen] = useState(false)
  const [boardType,setBoardType] = useState<"add" | "edit">("add")
  
  const boards = useSelector((state) => state.boards)
  const board = boards.find(board => board.isActive)

  const setOpenEditModal = ( )=> {
    setBoardModalOpen(true)
    setIsElipsisOpen(false)
  }
  const setOpenDeleteModal = ( )=> {
    setIsDeleteModalOpen(true)
    setIsElipsisOpen(false)
  }

  const onDeleteBtnClick = () => {
    dispatch(boardsSlice.actions.deleteBoard())
    dispatch(boardsSlice.actions.setBoardActive({index:0}))
    setIsDeleteModalOpen(false)
  }
  
  const onDropdownClick = () => {
    setOpenDropDown(state => !state)
    setIsElipsisOpen(false)
    setBoardType("add")
  } 
  
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
              {board.name}
            </h3>

            <img
              src={openDropdown ? iconUp : iconDown}
              alt="dropdown icon"
              className="w-3 ml-2 cursor-pointer md:hidden"
              onClick={ onDropdownClick}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <button className="button"
             onClick={
              ()=>{
                setOpenAddEditTask(state => !state)
              }
          }
          >+ Add New Task</button>
          <button 
            className="px-3 py-1 button md:hidden"
            onClick={
              ()=>{
                setOpenAddEditTask(state => !state)
              }
          }>+</button>
          <img 
            src={ellipsis} 
            onClick={()=>{
              setBoardType("edit")
              setOpenDropDown(false)
              setIsElipsisOpen(state =>!state)
            }}
            alt="elipsis" 
            className="h-6 cursor-pointer" />
          {
            isElipsisOpen && <ElipsisMenu  
            setOpenEditModal={setOpenEditModal}
             setOpenDeleteModal={setOpenDeleteModal}
            type= "Boards"/>
          }
        </div>
       
      </header>
        {
        openDropdown && <HeaderDropdown  setBoardModalOpen={setBoardModalOpen}
        setOpenDropDown={setOpenDropDown}/> 
      }
      
      {
        boardModalOpen && <AddEditBoardModal type={boardType}  setBoardModalOpen={setBoardModalOpen} />
      }

      {
        openAddEditTask && <AddEditTaskModal setOpenAddEditTask={setOpenAddEditTask} device="mobile" type="add" />
      }
      
      {
        isDeleteModalOpen && <DeleteModal   setIsDeleteModalOpen={ setIsDeleteModalOpen} onDeleteBtnClick={onDeleteBtnClick} title={board.name} type="board"/>
      }
    </div>
     

     
  );
};

export default Header;
