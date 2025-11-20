import { useState, type Dispatch } from "react";
import { v4 as uuidv4} from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";

interface AddEditTaskModalProps {
  type: "edit" | "add";
  device: "mobile" | "desktop";
  setOpenAddEditTask: Dispatch<SetStateAction<boolean>>;
  taskIndex?: number
  prevColIndex?: number
}
interface SubTaskProps {
  title: string;
  isCompleted: boolean;
  id: string
}

function AddEditTaskModal({ type, device, setOpenAddEditTask,taskIndex, prevColIndex = 0 }: AddEditTaskModalProps) {
  const [title, setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch()
  
  
  const board = useSelector((state) => state.boards).find((board)=> board.isActive)
  const columns = board.columns
  const column = columns.find((col, index) => index === prevColIndex)
  const [status, setStatus] = useState(columns[prevColIndex].name)
  const [newColIndex, setNewColIndex] = useState(prevColIndex)
  
  const [subtasks, setSubtasks] = useState<SubTaskProps[]>(
    [
    {title: '', isCompleted : false, id: uuidv4() },
    {title: '', isCompleted : false, id: uuidv4() }

   ]
)

const handleDelete = (id: string) => {
    setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
  };

  
const handleOnChange = (id: string, newValue: string) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((subtask) => subtask.id === id);
      if (subtask) {
        subtask.title = newValue;
      }
      return newState;
    });
  };

    const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }

    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }

    setIsValid(true);
    return true;
  };

  const onSubmit = (type) => {
    if (type === "add"){
      dispatch(boardsSlice.actions.addTask({
        title,
        description,
        subtasks,
        status,
        newColIndex
      })
      )
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex
          
        })
      )
    }
  }
  
  const onChangeStatus = (e) => {
    setStatus(e.target.value)
    setNewColIndex(e.target.selectedIndex)
    
  }
  
  return (
    <div
      className={
        device === "mobile"
          ? "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex justify-center items-center right-0 bottom-[-100vh] top-0 bg-[#00000080]"
          : "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex justify-center items-center right-0 bottom-0 top-0 bg-[#00000080] "
      }
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenAddEditTask(false);
      }}
    >
      <div
        className="overflow-y-scroll scrollbar-hide max-h-[95vh] bg-white
       dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl "
      >
        <h3 className="text-lg">{type == "edit" ? "Edit" : "Add New"} Task</h3>
        {/* Task Name */}
        <div className="flex flex-col mt-8 space-y-1">
          <label
            className="text-sm text-gray-500 dark:text-white">
            Task Name
          </label>
          <input 
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            className="px-4 py-2 text-sm bg-transparent border border-gray-600 rounded-md outline-none focus:border-0 focus:outline-[#635fc7] ring-0"
            placeholder="eg take coffe break"
            type="text" />
            
        </div>
        
        <div className="flex flex-col mt-8 space-y-1">
          <label
            className="text-sm text-gray-500 dark:text-white">
            Task Name
          </label>
          <textarea 
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
            className="px-4 py-2  text-sm bg-transparent border border-gray-600 rounded-md outline-none focus:border-0 focus:outline-[#635fc7] ring-0 min-h-[200px] "
            placeholder="eg it's always good to take a break. This 15 minute break will recharge th"
            />
            
        </div>

        {/* Subtasks Section */}
        
        <div className="flex flex-col mt-8 space-y-1">
          <label
            className="text-sm text-gray-500 dark:text-white">
            Subtasks
          </label>
            
            {
              subtasks.map((subtask, index) => (
                  <div
                  key={index}
                  className="flex items-center w-full">
                    <input
                    onChange={(e)=>{
                      handleOnChange(subtask.id,e.target.value)
                    }}
                      type="text"
                      value={subtask.title}
                      className="flex-grow px-4 py-2 text-sm bg-transparent
                       border-gray-600 rounded-md outline-none 
                      focus:border-0 focus:outline-[#635fc7] border" 
                      placeholder="e.g Take coffe break"    
                      />
                      <img src={
                        crossIcon
                      }
                      className="m-4 cursor-pointer"
                      onClick={()=>{
                        handleDelete(subtask.id)
                      }}
                      />
                  </div>
              ))
            }
            <button 
              onClick={()=>{
              setSubtasks((state)=>[
                ...state,
                 {title: '', isCompleted : false, id: uuidv4() } ,
                ])
            }}
                className=" w-full py-2 font-bold border rounded-full dark:bg-white dark:text-[#635fc7] text-white">
                  + Add New Subtask
            </button>
        </div>
        
        <div 
          className="flex flex-col mt-8 space-y-3">
          <label className="text-sm text-gray-500 dark:text-white">
            Current status
          </label>
          <select
           value={status}
           onChange={(e) => onChangeStatus(e)}
            className="flex flex-grow text-sm bg-transparent border border-gray-300 rounded-md select-status focus:outline-[#635fc] outline-none">
              { columns.map((column,index) =>
              <option
              value={column.name}
              key={index}>
                {column.name}
              </option>
              )}
          </select>
          
          <button
          className="items-center w-full text-white bg-[#635fc7] py-2 rounded-full"
          onClick={()=> {
            const isValid = validate()
            if (isValid){
              onSubmit(type)
              setOpenAddEditTask(false)
            }
          }}>
            {
              type === "edit" ? "save edit" : "Create Task"
            }
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditTaskModal;
