import React, { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { StatsContainer, Loading, ChartContainer } from '../../components';

const Stats = () => {
  const { showStats, isLoading, monthlyApplications, darkMode } = useAppContext();

  useEffect(() => {
    showStats();
    // eslint-disable-next-line
  }, []);

  if (isLoading) return <Loading center />;

  return (
    <>
      <StatsContainer dark={darkMode} />
      {monthlyApplications.length > 0 && <ChartContainer />}
    </>
  )
}

export default Stats
