"use client"

import { useState } from "react"
import { Join } from "./Join"



export const JoinRoom = () => {
    const [open,setopen] =useState(false);
    const joinhandle = ()=>{
   setopen(true);
}
  return (
    <div><button onClick={joinhandle} className="cursor-pointer border-2 rounded-md mr-2 ml-2 pl-2 pr-2 hover:text-green-600">Join Room</button>
     {open && (
        <Join
          open={open}
          onclose={() => setopen(false)}
        />
      )}
      </div>
  )
}
