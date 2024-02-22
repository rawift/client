import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader/Loader';
import loginBackground from '../images/login_background.jpg';
import Bottom from '../components/Bottom/Bottom';

const OthersProfile = () => {

    const [user, setUser]=useState({})
    const { userId } = useParams();
    const [interests, SetInterests] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      const fetchData = async () => {
        try {
          // First API call
          const response = await axios.get(`http://localhost:8000/user/${userId}`, { withCredentials: true });
          setUser(response.data)
          SetInterests(response.data.interests)
          setLoading(false)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData()
    },[])
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat" style={{backgroundImage: `url(${loginBackground})`}}>
    {loading ?<Loader /> :(
        <div class="flex items-center justify-center bg-gray-900 bg-opacity-70 rounded-xl shadow-lg w-80 h-80vw"> 
        <div class="relative z-10 bg-black bg-opacity-50 p-10 rounded-lg flex flex-col items-center text-left w-full">
        <div class="mb-6">
            <div class="rounded-full overflow-hidden border-2 border-white">
                <img src={user?.image} alt="Profile Picture" class="w-24 h-24"/>
            </div>
        </div>
        <div class="text-white text-center">
            <h1 class="text-2xl font-bold">{user.firstname} {user.lastname} ({user.gender})</h1>
            <h3 class="text-lg">VIT Bhopal {user.batch}</h3>
        </div>
        <div class="text-white mt-6 text-left max-w-sm">
            <div class="mb-4">
                <h3 class="text-lg font-bold mb-2">Bio</h3>
                <p class="text-sm text-justify font-comforter">{user.bio}</p>
            </div>
            <div>
                <h3 class="text-lg font-bold mb-2">Interests</h3>
                <ul class="flex flex-wrap">
                {
       interests?.map((interest) => (
        <li class="bg-white bg-opacity-20 rounded-full px-4 py-2 mr-2 mb-2">{interest}</li>
        ))
    }       
                </ul>
            </div>
        </div>
 
    </div>
    </div>
    )}
    <Bottom />
  </div>
  )
}

export default OthersProfile