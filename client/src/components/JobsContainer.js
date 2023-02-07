import React, { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import Loading from './Loading';
import Job from './Job';
import Alert from './Alert';
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
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
    getJobs();
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, searchLocation, sort]);

  if (isLoading) {
    return <Loading center />
  };

  if (jobs.length === 0) {
    return <Wrapper>
      <h2>No jobs to display...</h2>
    </Wrapper>
  }

  return (
    <Wrapper>
      {showAlert && <Alert />}
      <h5>{totalJobs} job{jobs.length > 1 && 's'} found </h5>
      <div className='jobs'>
        {jobs.map((job) =>
          <Job key={job._id} {...job} />
        )}
      </div>
      {numOfPages > 0 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer
