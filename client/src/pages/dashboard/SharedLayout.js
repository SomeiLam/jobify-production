import React from 'react'
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/SharedLayout';
import { Navbar, BigSidebar, SmallSidebar } from '../../components';

const SharedLayout = () => {
  const { darkMode } = useAppContext();
  return (
    <Wrapper dark={darkMode}>
      <main className='dashboard'>
        <SmallSidebar dark={darkMode} />
        <BigSidebar dark={darkMode} />
        <div>
          <Navbar dark={darkMode} />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  )
}

export default SharedLayout
