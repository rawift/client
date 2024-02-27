import React from 'react';
import { Link } from 'react-router-dom';
import buttonImage1 from '../../images/profile.png';
import buttonImage2 from '../../images/chat.png';
import buttonImage3 from '../../images/setting.png';
import buttonImage4 from '../../images/call.png';
import buttonImage5 from '../../images/book_icon.jpg';
import "./Bott.css"

const Bott = () => {
  return (
    <div className="bottom-navigation-bar">
      <Link to="/profile">
        <button className="mx-5">
          <img src={buttonImage1} alt="Profile" className="w-10 h-10" />
        </button>
      </Link>
      <Link to="/connecting">
        <button className="mx-5">
          <img src={buttonImage4} alt="Chat" className="w-10 h-10" />
        </button>
      </Link>
      <Link to="/chatlist">
        <button className="mx-5">
          <img src={buttonImage2} alt="Call" className="w-10 h-10" />
        </button>
      </Link>
      <Link to="/form">
        <button className="mx-5">
          <img src={buttonImage3} alt="Setting" className="w-10 h-10" />
        </button>
      </Link>
      <Link to="/info">
        <button className="mx-5">
          <img src={buttonImage5} alt="info" className="w-12 h-12 bg-black" />
        </button>
      </Link>
    </div>
  );
};

export default Bott;
