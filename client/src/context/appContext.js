import React, { useReducer, useContext, useEffect } from 'react';
import axios from 'axios';

import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  FETCH_BEGIN,
  SETUP_USER_SUCCESS,
  ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_SUCCESS,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  EDIT_JOB_SUCCESS,
  SHOW_STATUS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
} from "./action";

import reducer from './reducer';

const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null,
  userLocation: '',
  showSidebar: true,
  jobLocation: '',
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['pending', 'declined', 'interview'],
  status: 'pending',
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['lastest', 'oldest', 'a-z', 'z-a'],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: '/api/v1'
  });

  // response interceptor
  // authFetch.interceptors.request.use(
  //   (config) => {
  //     config.headers['Authorization'] = `Bearer ${state.token}`;
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );
  // response interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  // const addUserToLoaclStorage = ({ user, token, location }) => {
  //   localStorage.setItem('user', JSON.stringify(user));
  //   localStorage.setItem('token', token);
  //   localStorage.setItem('locaton', location);
  // };

  // const removeUserFromLocalStorage = () => {
  //   localStorage.removeItem('user');
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('locaton');
  // };

  const setupUser = async (currentUser, endpoint, alertText) => {
    dispatch({ type: FETCH_BEGIN });
    try {
      const response = await axios.post(`/api/v1/auth/${endpoint}`, currentUser);
      const { user, location } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, location, msg: alertText }
      });
      // addUserToLoaclStorage({ user, token, location });
    } catch (error) {
      dispatch({ type: ERROR, payload: error.response.data });
    };
    clearAlert();
  }

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logout = async () => {
    await authFetch.get('/auth/logout');
    dispatch({ type: LOGOUT_USER });
  };

  const updateUser = async (currentUser) => {
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      const { user, location } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, location, msg: 'User Profile Updated!' }
      });
      // addUserToLoaclStorage({ user, token, location });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    };
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createJob = async () => {
    dispatch({ type: FETCH_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.post('/jobs', {
        position, company, jobLocation, jobType, status,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_ALERT });
      return true;
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: ERROR,
          payload: { msg: error.response.data.msg },
        });
      };
    };
    clearAlert();
  };

  const getJobs = async () => {
    const { page, search, searchStatus, searchType, sort } = state;
    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    };

    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: ERROR,
          payload: { msg: error.response.data.msg },
        });
      };
    };
    clearAlert();
  };

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const deleteJob = async (id) => {
    dispatch({ type: FETCH_BEGIN });
    try {
      await authFetch.delete(`/jobs/${id}`);
      getJobs();
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: ERROR,
          payload: { msg: error.response.data.msg },
        });
      };
    };
    clearAlert();
  };

  const editJob = async () => {
    dispatch({ type: FETCH_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status, editJobId } = state;
      await authFetch.patch(`/jobs/${editJobId}`, {
        position, company, jobLocation, jobType, status,
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: ERROR,
          payload: { msg: error.response.data.msg },
        });
      };
    };
    clearAlert();
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATUS_BEGIN });
    try {
      const { data } = await authFetch('/jobs/stats');
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {

    };
    clearAlert();
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch('/auth/getCurrentUser');
      const { user, location } = data;
      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user, location },
      });
    } catch (error) {
      if (error.response.status === 401) return;
      logout();
    };
  };

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider value={{
      ...state,
      displayAlert,
      setupUser,
      toggleSidebar,
      logout,
      updateUser,
      handleChange,
      clearValues,
      createJob,
      getJobs,
      setEditJob,
      deleteJob,
      editJob,
      showStats,
      clearFilters,
      changePage,
      getCurrentUser,
    }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
