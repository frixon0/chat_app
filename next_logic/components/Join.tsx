"use client"

import { useState } from "react"
import { Socketconnect } from "./Socketconnect"

type Props={
    open:boolean,
    onclose:()=>void
}

export const Join = ({open,onclose}:Props) => {
    const[id,setid]=useState("");
    const [roomId, setRoomId] = useState("");
    
    if(!open)  return null;
    if(roomId) return <Socketconnect roomId={roomId}/>
    
       
    
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === 'backdrop') {
      onclose();
    }
    }
    
  return (
    <div  id="backdrop"
      onClick={handleBackdropClick}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <input onChange={(e)=>{
            setid(e.target.value)
        }} placeholder="Enter Room Id"></input>
        <button
        onClick={() => setRoomId(id.trim())}  
        className="cursor-pointer border-2 rounded-md mr-2 ml-2 pl-2 pr-2 hover:text-green-600">Enter</button>
    </div>
  )
}

