import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../context/UserContext'
import mic from '../images/mic.png';
import Connected from '../components/Connected/Connected';
import {io} from "socket.io-client"
import Peer from 'simple-peer';
import loginBackground from '../images/login_background.jpg';
import Bottom from '../components/Bottom/Bottom';




const Connecting = () => {
  const socket = useRef()
  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()
  const { user, setUser } = useContext(UserContext)
  const [stream,setStream] = useState(null)
  const [me,setMe] = useState('')
  const [call, setCall] = useState({})
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);


  
useEffect(() => {
  socket.current = io("http://localhost:8080")

},[])



const toggleAnimation = () => {
  setIsAnimating(!isAnimating);
};



useEffect(() => {
  navigator.mediaDevices.getUserMedia({ video:false, audio: true })
  .then((currentStream) => {
    setStream(currentStream);

    myVideo.current.srcObject = currentStream;
  });



  socket.current.on('me',(id)=>{
      setMe(id)
   
  })

  socket.current.on('callUser', ({ from, userData, signalData }) => {
      setCall({ isReceivingCall: true, from, userData, signalData });

    });

},[user])



const callUser = (id) => {

      const peer = new Peer({ initiator: true, trickle: false, stream });

peer.on('signal', (data) => {
 
socket.current.emit('callUser', {signalData: data, from: me, userData:user });
});

peer.on('stream', (currentStream) => {
userVideo.current.srcObject = currentStream;
});

socket.current.on('callAccepted', (data) =>{

setCallAccepted({callaccept:true,userData:data.userData});

peer.signal(data.signal);
})

connectionRef.current = peer;

}


const answerCall = () => {
  setCallAccepted(true);

const peer = new Peer({ initiator: false, trickle: false, stream });

peer.on('signal', (data) => {

socket.current.emit('answerCall', { signal: data, to: call.from, userData:user });
});

peer.on('stream', (currentStream) => {
userVideo.current.srcObject = currentStream;
});

peer.signal(call.signalData);

connectionRef.current = peer;
}


const leaveCall = () => {
  setCallEnded(true);

  connectionRef.current.destroy();

  window.location.reload();
};

const searching =() =>{

  if(!isAnimating){
    callUser()
    toggleAnimation()
    return
  }  
  


  if(isAnimating){
    socket.current.emit('remove',{id:me, gender:user.gender})
    toggleAnimation()
  }
  
}




  return (

    <>

  {call.isReceivingCall || callAccepted.callaccept ? (

 <Connected answerCall={answerCall} call={call} callAccepted={callAccepted} userVideo={userVideo} myVideo={myVideo} />

  ):(
    <div className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat" style={{backgroundImage: `url(${loginBackground})`}}>
    <div className="glass-window" style={{position: "absolute", top: "50%", left: "50%", right:"30%", width: "100%", height: "100%", transform: "translate(-50%, -50%)", backgroundColor: "rgba(255, 255, 255, 0.6)", padding: "20px", borderRadius: "30px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"}}>
      <div className="absolute top-0 left-0 w-full text-center">
        <p className="text-black font-bold text-4xl mt-10">Find Someone Online</p>
      </div>
      <div className="pulse absolute inset-0 flex items-center justify-center" >
        {/* Pulse Animation */}
        {isAnimating && (
          <>
            <span className="block w-70 h-70 bg-blue-500 rounded-full opacity-80 animate-pulse" style={{ zIndex: 1, position: 'absolute' }}></span>
            <span className="block w-60 h-60 bg-blue-500 rounded-full opacity-80 animate-pulse" style={{ zIndex: 1, position: 'absolute' }}></span>
            <span className="block w-50 h-50 bg-blue-500 rounded-full opacity-80 animate-pulse" style={{ zIndex: 1, position: 'absolute' }}></span>
            <span className="block w-40 h-40 bg-blue-500 rounded-full opacity-80 animate-pulse" style={{ zIndex: 1, position: 'absolute' }}></span>
            <span className="block w-30 h-30 bg-blue-500 rounded-full opacity-80 animate-pulse" style={{ zIndex: 1, position: 'absolute' }}></span>
            <span className="block w-20 h-20 bg-blue-500 rounded-full opacity-80 animate-pulse" style={{ zIndex: 1, position: 'absolute' }}></span>
            <span className="block w-10 h-10 bg-blue-500 rounded-full opacity-80 animate-pulse" style={{ zIndex: 1, position: 'absolute' }}></span>
          </>
        )}
        
        {/* Mic Button */}
        <img src={mic} alt="Mic Button" className="w-40 h-40 absolute inset-0 m-auto z-10 cursor-pointer" onClick={searching}  />
      </div>
      <div className="absolute bottom-20 left-0 w-full text-center">
        <p className="text-black font-bold text-4xl mb-12">Search</p>
      </div>
    </div>
    <Bottom />
  </div>


  )}
  </>
  )
}

export default Connecting