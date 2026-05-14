"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
    roomId: string
}

export const Socketconnect = ({ roomId }: Props) => {
    const socketref = useRef<WebSocket | null>(null)
    const [allmsg,setallmsg] = useState<string[]>([]);
    const [msg,setmsg] =useState("");
    const [isConnected, setIsConnected] = useState(false);
    useEffect(()=>{
        const socket = new WebSocket(`ws://localhost:8080?roomId=${roomId}`)
        
        socket.onopen = ()=>{
            setIsConnected(true);
            
        }
        socketref.current = socket;

        socket.onmessage = (event)=>{
            try {
                const data = JSON.parse(event.data);
                setallmsg((prev)=>[...prev,data.message ?? event.data]);
            } catch {
                setallmsg((prev)=>[...prev, event.data]);
            }
        }

        

        socket.onclose = ()=>{
            setIsConnected(false);
        }

        return ()=>{
            socket.close();
        }
    },[roomId])
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-white backdrop-blur-sm">
      <div className="flex h-[80vh] w-full max-w-md flex-col gap-3 px-4">
        <p className="shrink-0 text-center">{isConnected ? `CONNECTED TO ${roomId}` : "Connecting..."}</p>
        <div className="flex min-h-0 flex-1 flex-col items-start gap-2 overflow-y-auto rounded-md border border-white/30 p-3">

           {allmsg.map((msg, index) => (

            <div className="max-w-full rounded-md border-2 p-2 text-left" key={index}>
                {msg}
            </div>

             ))}

        </div>
        <div className="flex shrink-0">
        <input className="border rounded-md ml-2 mr-2 px-2 py-1" placeholder="Type a message" onChange={(e)=>{
            setmsg(e.target.value);
        }}></input>
        <button disabled={!isConnected} onClick={()=>{
            if(msg!=""&&socketref.current&&socketref.current.readyState==WebSocket.OPEN){
                socketref.current.send(JSON.stringify({
                    message: msg
                }))
            }
        }} 
        className="cursor-pointer border-2 rounded-md mr-2 ml-2 pl-2 pr-2 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-50">Send</button>
        </div>
        
        <button onClick={()=>{socketref.current?.close()
            }}
         className="shrink-0 cursor-pointer border-2 rounded-md mr-2 ml-2 pl-2 pr-2 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-50">Close</button>
      </div>
    </div>
  )
}
