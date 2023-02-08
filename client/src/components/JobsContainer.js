import React, { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import Loading from './Loading';
import Job from './Job';
import Alert from './Alert';
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = ({ dark }) => {
  const {
    getJobs,
    jobs,
    isLoading,
    page,
    totalJobs,
    search,
    searchStatus,
    searchType,
    searchLocation,
    sort,
    numOfPages,
    showAlert,
  } = useAppContext();

  useEffect(() => {
    console.log('26', page, search, searchStatus, searchType, searchLocation, sort)
    getJobs();
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, searchLocation, sort]);

  if (isLoading) {
    return <Loading center />
  };

  if (jobs.length === 0) {
    return <Wrapper dark={dark}>
      <h2>No jobs to display...</h2>
    </Wrapper>
  }

  return (
    <Wrapper dark={dark}>
      {showAlert && <Alert />}
      <h5>{totalJobs} job{jobs.length > 1 && 's'} found </h5>
      <div className='jobs'>
        {jobs.map((job) =>
          <Job key={job._id} {...job} dark={dark} />
        )}
      </div>
      {numOfPages > 0 && <PageBtnContainer dark={dark} />}
    </Wrapper>
  );
};

export default JobsContainer
