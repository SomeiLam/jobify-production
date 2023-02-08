import React from 'react';
import { SearchContainer, JobsContainer } from '../../components';
import { useAppContext } from '../../context/appContext';

const AllJobs = () => {
  const { darkMode } = useAppContext();
  return (
    <div>
      <SearchContainer dark={darkMode} />
      <JobsContainer dark={darkMode} />
    </div>
  );
};

export default AllJobs
