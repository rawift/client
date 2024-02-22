import loginBackground from '../../images/login_background.jpg';
import callRedImage from '../../images/call_red.png';



import React, { useEffect, useState } from 'react'



const Connected = ({answerCall, call, callAccepted, userVideo, myVideo}) => {

  const [userData,setUserData] = useState({})
  const callCut = () =>{

    window.location.reload()
  }

  useEffect(() => {
    if(call.isReceivingCall) answerCall()
    if(call.isReceivingCall) setUserData(call.userData)
    if(callAccepted.callaccept) setUserData(callAccepted.userData)
    
    },[])
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat" style={{backgroundImage: `url(${loginBackground})`}}>
    <div className="glass-window" style={{position: "absolute", top: "50%", left: "50%", right:"30%", width: "100%", height: "100%", transform: "translate(-50%, -50%)", backgroundColor: "rgba(255, 255, 255, 0.6)", padding: "20px", borderRadius: "30px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"}}>
      <div className="user-section" style={{display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px", marginTop: "50px"}}>
        <div className="user-image" style={{width: "170px", height: "170px", borderRadius: "50%", overflow: "hidden"}}>
          <img src={userData.image} alt="Login with Google" className="w-40 max-w-xs"/>
        </div>
        <div className="user-name" style={{marginTop: "30px", color: "black", textAlign: "center", fontSize: "30px", fontWeight: "bold"}}>{userData.firstname} {userData.lastname}</div>
      </div>
      <button className="call-end-button" style={{position: "absolute", bottom: "20px", left: "50%", width:"20%", maxWidth: "100px", transform: "translateX(-50%)", border: "none", background: "none", padding: 0, cursor: "pointer"}} onClick={callCut}>
        <img src={callRedImage} alt="Call End Button" style={{width: "100%", height: "auto"}} />
      </button>
    </div>
    <>     <video playsInline ref={userVideo} autoPlay /></>
  </div>
  )
}

export default Connected