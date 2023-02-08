import React from 'react';
import { useAppContext } from '../context/appContext';
import NavLinks from './NavLinks';
import Logo from './Logo';
import Wrapper from '../assets/wrappers/BigSidebar';

const BigSidebar = () => {
  const { showSidebar, darkMode } = useAppContext();

  return (
    <Wrapper dark={darkMode}>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }>
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar;
