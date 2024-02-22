import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import {format} from "timeago.js"
import InputEmoji from 'react-input-emoji'
import { Loader } from '../Loader/Loader';
import { FcPrevious } from "react-icons/fc";
import { Link } from 'react-router-dom';


export const Convo = ({chat, currentUser, setSendMessage, recieveMessage, currentUserImage, online, setCurrentChat}) => {


      const [userData, setUserData] = useState({})
      const [messages, setMessages] = useState([])
      const [newMessage, setNewMessage] = useState("")
      const [loading, setLoading] = useState(true)
      const scroll = useRef()
      const handlePrev = () =>{
        window.location.reload();
      }
  
      useEffect(() => {
        if(recieveMessage!=null && recieveMessage.chatId==chat._id){
  
          setMessages([...messages,recieveMessage])
        }
        console.log("image",currentUserImage)
      },[recieveMessage])
  
      useEffect(()=>{
 
          const userId = chat?.members?.find((id)=>id!=currentUser)
          const fetchData = async () => {
              try{
                const response = await axios.get(`http://localhost:8000/user/${userId}`, { withCredentials: true });
  
                setUserData(response.data)
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            };
            if(chat!=null)  fetchData()
      },[chat, currentUser])
  
      useEffect(() => {
          const fetchMessages = async () => {
              try {
                  const {data} = await axios.get(`http://localhost:8000/message/${chat._id}`)
                  console.log(data)
                  setMessages(data)
                  setLoading(false)
              } catch (error) {
                  console.log(error)
              }
          }
          if(chat!=null) fetchMessages()
      },[chat])
  
      const handleChange = (newMessage) => {
        setNewMessage(newMessage)
      }
      const handleSend = (e) => {
        e.preventDefault()

        if(!newMessage) return
  
        const message = {
          "senderId": currentUser,
          "text": newMessage,
          "chatId": chat._id
        }
  

  
        const fetchData = async () => {
          try {
            const { data } = await axios.post('http://localhost:8000/message/add', message, { withCredentials: true });
       
            setMessages([...messages, data])
            setNewMessage("")
          } catch (error) {
            console.error('Error:', error);
          }
        };
        fetchData();
  
        const receiverId = chat?.members?.find((id)=>id!=currentUser)
        setSendMessage({...message, receiverId})
  
      }
  
      useEffect(() => {
        scroll.current?.scrollIntoView({behavior:"smooth",block: 'end' })
      },[messages])
  
    
      
      return (
        <div className="flex flex-col min-h-screen bg-black text-white relative">
         {loading ? <Loader /> :(




<>

         
<nav className="bg-black border-b-2 border-gray-600 sticky top-0 z-10">
<div className="max-w-screen-2xl flex flex-wrap flex-grow items-center justify-between mx-auto p-4">
<Link to={`/othersProfile/${userData._id}`}>
  <a className="flex items-center  space-x-3 rtl:space-x-reverse">
    <div className="relative inline-block mr-1">
      <img
        className="inline-block size-[46px] rounded-full"
        src={userData?.image}
        alt="DP"
      />
      <span
        className={`absolute top-0 end-0 block size-3 rounded-full ring-2 ring-white ${
          online ? "bg-teal-400" : "bg-red-400"
        }`}
      ></span>
    </div>
    <span className="self-center text-2xl font-bold whitespace-nowrap">
      {userData?.firstname} {userData?.lastname}
    </span>
  </a>
  </Link>
  <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    <a onClick={handlePrev}>
      <FcPrevious className="w-8 h-8 text-[#EF1E57]"/>
    </a>
  </div>
</div>
</nav>


<div className="flex-grow overflow-y-auto" ref={scroll}>
<ul class="space-y-5 mx-4 mt-6">

{messages.map((message) => (
     message.senderId === currentUser ? (

        <li class="flex ms-auto gap-x-2 sm:gap-x-4">
        <div class="grow text-end space-y-3">
          <div class="inline-flex flex-col justify-end">
            <div class="inline-block bg-blue-600 rounded-2xl py-2 px-4 shadow-sm">
              <p class="text-sm text-white">{message.text}</p>
            </div>

            <span class="mt-1.5 flex mr-3 justify-end gap-x-1 text-[9px] text-gray-200">
            {format(message.timestampField)}
            </span>
          </div>
        </div>

        <span class="flex-shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
          <img
            class="inline-block size-9 rounded-full"
            src={currentUserImage}
            alt="profile-pic"
          />
        </span>
      </li>

     ):(

        <li class="max-w-lg flex gap-x-2 sm:gap-x-4 me-11">
        <img
          class="inline-block size-9 rounded-full"
          src={userData.image}
          alt="profile-pic"
        />

        <div>
          <div class="bg-[#EF1E57] text-white rounded-2xl py-2 px-4 space-y-3">
            <p class="text-sm">{message.text}</p>
          </div>
          <span class="mt-1.5 ml-3 ms-auto flex items-center gap-x-1 text-[9px] text-gray-200">
          {format(message.timestampField)}
          </span>
        </div>
      </li>

     )
))}


</ul>
</div>













<div className="flex mt-8 items-center px-3 sticky bottom-0 z-10">

<InputEmoji className="bg-black" value={newMessage}
onChange={handleChange}/>
<button className="px-6 py-4 bg-[#EF1E57] text-white rounded-r-md" onClick={handleSend}>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
</svg>        </button>
</div>






</>



         )}





        </div>
      );
}
