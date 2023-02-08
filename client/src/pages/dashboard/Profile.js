import React, { useState } from 'react';
import { FormRow, Alert, FormRowSelect } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading, darkMode, toggleDarkMode } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);
  const [mode, setMode] = useState(darkMode);
  const [testDarkMode, setTestDarkMode] = useState(darkMode);
  const isTestUser = user.email === 'testuser@test.com';

  const handleSubmit = e => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    };
    if (isTestUser) {
      if (name === user.name &&
        email === user.email &&
        lastName === user.lastName &&
        location === user.location &&
        mode !== darkMode) {
        setTestDarkMode(mode);
        toggleDarkMode();
      } else {
        updateUser({ name, email, lastName, location, darkMode });
      }
    }
  };

  return (
    <Wrapper dark={testDarkMode}>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={e => setName(e.target.value)}
          />
          <FormRow
            type='text'
            labelText='last name'
            name='last name'
            value={lastName}
            handleChange={e => setLastName(e.target.value)}
          />
          <FormRow
            type='text'
            name='email'
            value={email}
            handleChange={e => setEmail(e.target.value)}
          />
          <FormRow
            type='text'
            name='location'
            value={location}
            handleChange={e => setLocation(e.target.value)}
          />
          <FormRowSelect
            name='darkMode'
            labelText='display'
            value={mode ? 'Dark Mode' : 'Light Mode'}
            handleChange={e => {
              e.target.value === 'Dark Mode' && setMode(true);
              e.target.value === 'Light Mode' && setMode(false);
            }}
            list={['Dark Mode', 'Light Mode']}
          />
          <button
            className='btn btn-block'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? 'Please Wait...' : 'Save Changes'}
          </button>
        </div>
      </form>
      {isTestUser &&
        <h6 className='small-text'>Test User can only change Display Mode.</h6>}
    </Wrapper>
  )
}

export default Profile
