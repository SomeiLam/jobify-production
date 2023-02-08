import React, { useState } from 'react';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/ChartsContainer';

const ChartContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data, darkMode } = useAppContext();

  return (
    <Wrapper dark={darkMode}>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Show Area Chart' : 'Show Bar Chart'}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  )
};

export default ChartContainer;
