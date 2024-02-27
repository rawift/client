import React from 'react';
import { Link } from 'react-router-dom';
import buttonImage5 from '../images/instagram.png';
import Bottom from '../components/Bottom/Bottom';

const Info = () => {
  return (
    <>
    <div className="bg-black h-screen text-white">
      <div className="w-100 p-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">About app</h2>
          
            <p>New matches automatically made eveyday at 9 AM </p>
            <p>You must submit the form to get the matches ( Gender cant't be updated )</p>
            <p>Use voice to instantly talk to a random match.</p>
            <p>Chats automatically gets deleted at 9 AM </p>
            <p>App is running in Beta version</p>
            <p>App is not responsive for big screens (Smart phones recomended)</p>
           <Link to={`/login`}> <p>If any bug occur , relogin by clicking on me!</p> </Link>
           <p>New features coming soon</p>
           <p>Let me know any recommendation from you guys</p>
         
        </div>
      </div>
      <div className="w-100 p-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Developed by</h2>
          <ul>
  <li className='flex items-center'> 
    <div>
      Abhishek Singh 
    </div>
    <a  href="https://www.instagram.com/abhi_____rawat/">
    <img src={buttonImage5} className='w-10 mx-2' alt="Icon" />
    </a>
      </li>
      <li className='flex items-center'> 
    <div>
      Prem Singh
    </div>
    <a  href="https://www.instagram.com/_._p.r.e.m_._/">
    <img src={buttonImage5} className='w-10 mx-2' alt="Icon" />
    </a>
      </li>

   
      </ul>

        </div>
      </div>
      
    </div>
    <Bottom />
    </>
  );
};

export default Info;
