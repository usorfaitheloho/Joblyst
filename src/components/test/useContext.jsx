import React, { useState } from 'react'

export const useContext = () => {
  const [isToggle, setIsToggle] =useState(false)

  return (
    <div>
      <h1> parent Component </h1>
      <ChildToggle setIsToggle={setIsToggle}/>
      <ChildDisplay isToggle={isToggle}/>

    </div>
  )
}

const ChildToggle=({setIsToggle}) =>{
  return (
    <button onClick={()=> setIsToggle((prev)=>!prev) }></button>
  )
}