"use client"

import { useState } from "react"
import { Create } from "./Create";

export const CreateRoom = () => {
    const [open,setopen] =useState(false);
    const createhandle=()=>{
        setopen(true);
    }
  return (
    <div><button onClick={createhandle}className="cursor-pointer border-2 rounded-md mr-2 ml-2 pl-2 pr-2 hover:text-green-600">Create Room</button>
    {open&&(
        <Create
        open ={open}
        onclose={()=>setopen(false)}/>
    )}
    </div>
  )
}
