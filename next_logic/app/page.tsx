import { CreateRoom } from "@/components/CreateRoom";
import { JoinRoom } from "@/components/JoinRoom";


export default function Home() {
  return (
    <div className="flex flex-col h-screen items-center gap-2 justify-center divide-y divide-gray-200">
      <p className="font-bold text-2xl  ">Hi, welcome to the CHAT_APP</p>
      first try at a chat app
      <div className="flex justify-between">
      <JoinRoom/>
      <CreateRoom/>
      </div>
      
    </div>
  );
}
