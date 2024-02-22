import React from 'react'
import loginBackground from '../images/login_background.jpg';
//import "./Login.css"

const Login = () => {
  const loginwithgoogle = ()=>{
    window.open("http://localhost:8000/auth/google","_self")
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat" style={{backgroundImage: `url(${loginBackground})`}}>
    <div className="flex items-center justify-center bg-gray-900 bg-opacity-70 rounded-xl shadow-lg w-80 h-80vw">
      <div className="p-8 flex flex-col items-center">
        <h2 className="text-5xl text-white font-semibold text-center mt-8">Login</h2>
        <h3 className="text-3xl text-white text-center mt-10 mb-6">Lovin The Vibe</h3>
        <a onClick={loginwithgoogle}>
          <div className="flex items-center justify-center mb-8">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Login with Google" className="w-40 max-w-xs"/>
          </div>
          <p className="text-xl text-white text-center">Continue with Google</p>
        </a>
      </div>
    </div>
  </div>
  )
}

export default Login