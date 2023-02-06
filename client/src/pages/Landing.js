import { Link, Navigate } from 'react-router-dom';
import main from '../assets/images/main.svg';
import { useAppContext } from '../context/appContext';

import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import React from 'react';

const Landing = () => {
  const { user } = useAppContext();

  return (
    <React.Fragment>
      {user && <Navigate to='/' />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className='container page'>
          {/* info */}
          <div className='info'>
            <h1>
              job <span>tracking</span> App
            </h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <Link to='/register' className='btn btn-hero'>Login / Register</Link>
          </div>
          <img src={main} alt='job hunt' className='img main-img' />
        </div>
      </Wrapper>
    </React.Fragment>
  )
}

export default Landing
