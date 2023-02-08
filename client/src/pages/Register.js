import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Logo, FormRow, Alert, Checkbox } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();
  const {
    user,
    isLoading,
    showAlert,
    displayAlert,
    setupUser,
  } = useAppContext();

  const [remember, setRemember] = useState(false);

  const handleCheckChange = () => {
    setRemember(!remember);
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    };
    const currentUser = { name, email, password, remember };
    if (isMember) {
      setupUser(currentUser, 'login', 'Login Successfully! Redirecting...');
    } else {
      setupUser(currentUser, 'register', 'User Created! Redirecting...');
    };
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000)
    }
  }, [user, navigate]);

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {!values.isMember && <FormRow
          type='text'
          value={values.name}
          name='name'
          handleChange={handleChange}
        />}
        <FormRow
          type='email'
          value={values.email}
          name='email'
          handleChange={handleChange}
        />
        <FormRow
          type='password'
          value={values.password}
          name='password'
          handleChange={handleChange}
        />
        <Checkbox
          label="remember me"
          value={remember}
          onChange={handleCheckChange}
        />
        <button
          type='submit'
          className='btn btn-block'
          disabled={isLoading}
        >
          submit
        </button>
        <button
          type='button'
          className='btn btn-block btn-hipster'
          disabled={isLoading}
          onClick={() => {
            setupUser(
              { email: 'testuser@test.com', password: 'secret' },
              'login',
              'Login Successful! Redirecting...'
            );
          }}
        >
          {isLoading ? 'loading...' : 'demo app'}
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button
            type='button'
            onClick={toggleMember}
            className='member-btn'
          >{values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register
