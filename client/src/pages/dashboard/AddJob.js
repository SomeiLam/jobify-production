import React from 'react';
import { FormRow, Alert, FormRowSelect } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const AddJob = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  const handleJobInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    };
    if (isEditing) {
      editJob();
    };
    createJob();
  };

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            value={jobLocation}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            name='jobType'
            labelText='job type'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          <div className='btn-container'>
            <button // default submit button comes first
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}>
              Submit
            </button>
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}>
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper >
  )
}

export default AddJob;
