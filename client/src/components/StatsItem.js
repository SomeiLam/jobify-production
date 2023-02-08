import React from 'react'
import Wrapper from '../assets/wrappers/StatItem';

const StatsItem = ({ count, title, icon, color, dark }) => {
  return (
    <Wrapper color={color} dark={dark}>
      <header>
        <span className='count'>{count}</span>
        <span className='icon'>{icon}</span>
      </header>
      <h5 className='title'>{title}</h5>
    </Wrapper>
  )
};

export default StatsItem;
