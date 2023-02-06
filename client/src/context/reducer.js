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
import { initialState } from "./appContext";

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: 'Please provide all values!',
      };
    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertText: '',
      };
    case FETCH_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: 'success',
        alertText: action.payload.msg,
      };
    case ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      };
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: !state.showSidebar
      };
    case LOGOUT_USER:
      return {
        ...initialState,
        userLoading: false,
      };
    case HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
    case CLEAR_VALUES:
      return {
        ...state,
        isEditing: false,
        editJobId: '',
        position: '',
        company: '',
        jobLocation: state.userLocation,
        jobType: 'full-time',
        status: 'pending',
      };
    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alerText: 'New Job Created!',
      };
    case GET_JOBS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    case GET_JOBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobs: action.payload.jobs,
        totalJobs: action.payload.totalJobs,
        numOfPages: action.payload.numOfPages,
        page: 1,
      };
    case SET_EDIT_JOB:
      const job = state.jobs.find((job) => job._id === action.payload.id);
      const { _id, position, company, jobLocation, jobType, status } = job;
      return {
        ...state,
        isEditing: true,
        editJobId: _id,
        position,
        company,
        status,
        jobLocation,
        jobType,
      };
    case EDIT_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isEditing: false,
        editJobId: '',
        position: '',
        company: '',
        status: 'pending',
        jobLocation: state.userLocation ? state.userLocaton : '',
        jobType: 'full-time',
        showAlert: true,
        alertType: 'danger',
        alertText: 'Job Updated!',
      };
    case SHOW_STATUS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    case SHOW_STATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stats: action.payload.stats,
        monthlyApplications: action.payload.monthlyApplications,
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        search: '',
        searchStatus: 'all',
        searchType: 'all',
        sort: 'latest',
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload.page,
      };
    case GET_CURRENT_USER_BEGIN:
      return {
        ...state,
        userLoading: true,
        showAlert: false,
      };
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        userLoading: false,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
      };
    default:
      throw new Error(`no such action :${action.type}`);
  };
};

export default reducer;