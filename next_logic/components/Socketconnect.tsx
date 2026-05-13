"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

type Props = {
    roomId: string
}

export const Socketconnect = ({ roomId }: Props) => {
    const socketref = useRef<WebSocket | null>(null)
    const [latestmsg,setlatestmsg] = useState("");
    const [msg,setmsg] =useState("");
    const [isConnected, setIsConnected] = useState(false);
    useEffect(()=>{
        const socket = new WebSocket(`ws://localhost:8080?roomId=${roomId}`)
        
        socket.onopen = ()=>{
            setIsConnected(true);
            setlatestmsg(`connected to room, ${roomId}`)
        }
        socketref.current = socket;

        socket.onmessage = (event)=>{
            try {
                const data = JSON.parse(event.data);
                setlatestmsg(data.message ?? event.data);
            } catch {
                setlatestmsg(event.data);
            }
        }

        socket.onerror = ()=>{
            setlatestmsg("socket error: check that the websocket server is running on port 8080");
        }

        socket.onclose = ()=>{
            setIsConnected(false);
        }

        return ()=>{
            socket.close();
        }
    },[roomId])
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-black/50 text-white backdrop-blur-sm">
        <p>{isConnected ? `Connected to ${roomId}` : "Connecting..."}</p>
        <div>
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
        <p>Received: {latestmsg}</p>
        <button onClick={()=>{socketref.current?.close()
            }}
         className="cursor-pointer border-2 rounded-md mr-2 ml-2 pl-2 pr-2 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-50">Close</button>
    </div>
  )
}
