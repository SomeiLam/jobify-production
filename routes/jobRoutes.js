import express from 'express';
const router = express.Router();

import {
  createJob,
  deleteJob,
  getAllJobs,
  getLocationList,
  updateJob,
  showStats,
} from '../controllers/jobControllers.js';
import testUser from '../middleware/testUser.js';

router.route('/').post(testUser, createJob).get(getAllJobs);
// remember about :id

router.route('/locations').get(getLocationList);
router.route('/stats').get(showStats);
router.route('/:id').delete(testUser, deleteJob).patch(testUser, updateJob);

export default router;
