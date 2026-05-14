"use client"
import { customAlphabet } from "nanoid"
import { useState } from "react"
import { Socketconnect } from "./Socketconnect"

type Props={
    open:boolean,
    onclose:()=>void
}

export const Create = ({open,onclose}:Props) => {
    const[id,setid] = useState("");
    const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    function genid() : string {
        const nanoid = customAlphabet(alphabet, 4);
        return `${nanoid()}-${nanoid()}`;
    }
    if(!open)  return null;
    if(id) return <Socketconnect roomId={id}/>
    
       
    
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === 'backdrop') {
      onclose();
    }
    }
    
  return (
    <div  id="backdrop"
      onClick={handleBackdropClick}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        
        <button
        onClick={() => {
            const newid = genid();
            setid(newid);
        }
        }  
        className="cursor-pointer border-2 rounded-md mr-2 ml-2 pl-2 pr-2 hover:text-green-600">Enter</button>
    </div>
  )
}

