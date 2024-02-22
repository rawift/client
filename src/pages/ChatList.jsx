import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import {io} from "socket.io-client"
import { ChatMatch } from "../components/ChatMatch/ChatMatch"
import { Convo } from '../components/Convo/Convo';
import { Loader } from '../components/Loader/Loader';
import Bottom from '../components/Bottom/Bottom';


const ChatList = () => {

  const [chats, setChats] = useState([])
  const { user, setUser } = useContext(UserContext)
  const [currentChat, setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [recieveMessage, setRecieveMessage] = useState(null)
  const [loading, setLoading] = useState(true)
  const socket = useRef()
  

  useEffect(() => {
    if(sendMessage!=null){
      socket.current.emit("send-message", sendMessage)
    }
  },[sendMessage])


  useEffect(() => {
    socket.current = io("http://localhost:8800")
    console.log("socket", user._id )
    socket.current.emit("new-user-add", user._id)
    socket.current.on("get-users", (users) => {
    
      setOnlineUsers(users)

    })
  },[user])

  useEffect(() => {

    socket.current.on("recieve-message", (data) => {

      setRecieveMessage(data)

    })
  })

  useEffect(()=>{
    const fetchData = async () => {
      try{
        const response = await axios.get(`http://localhost:8000/chat/${user._id}`, { withCredentials: true });
        setChats(response.data)
        setLoading(false)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(chats)

  },[user])

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member!=user._id)
    const online = onlineUsers.find((user) => user.userId==chatMember)
    return online? true:false
  }
  

  return (
  <>
  {loading ?<div className="bg-black text-white h-screen"> <Loader /></div> : (





!currentChat? (
  <div className="bg-black text-white h-screen">


  <nav class="bg-black pt-2 border-gray-200">
    <div class="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a class="flex items-center space-x-3 rtl:space-x-reverse">
        {/*<img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />*/}
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FrenZ</span>
    </a>
    <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <a href="/profile">
        <img class="w-10 h-10 rounded-full" src={user.image} alt="profile-pic" />
        </a>
    </div>
    </div>
  </nav>
  
  
    <h1 className="text-3xl font-bold m-4">Matches</h1>
  
    <ul>
    {chats.map((chat) => (
                  <div onClick={()=>setCurrentChat(chat)}>
                      <ChatMatch data={chat} currentUser = {user._id} online={checkOnlineStatus(chat)}/>
                  </div>
              ))}
      
    </ul>
    <Bottom />
  </div>
):(
<>
<Convo chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage} recieveMessage={recieveMessage} currentUserImage={user.image} online={checkOnlineStatus(currentChat)} setCurrentChat={setCurrentChat}/>
</>
)









  )}
  </>


  );
};

export default ChatList;