/**
 * api.js — All API calls to Django backend in one place.
 *
 * Django runs at: http://127.0.0.1:8000
 * All routes start with /api/
 */

import axios from 'axios';

// Base URL for all API calls
const BASE_URL = 'http://127.0.0.1:8000/api';

// -------------------------------------------------------
// JOB APIs
// -------------------------------------------------------

/** Get all jobs from the database */
export const getJobs = () => axios.get(`${BASE_URL}/jobs/`);

/** Create a new job posting */
export const createJob = (jobData) => axios.post(`${BASE_URL}/jobs/`, jobData);

// -------------------------------------------------------
// RESUME UPLOAD API
// -------------------------------------------------------

/**
 * Upload a PDF resume + candidate info.
 * Uses FormData because we're sending a file.
 */
export const uploadResume = (formData) =>
  axios.post(`${BASE_URL}/upload-resume/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// -------------------------------------------------------
// CANDIDATE APIs
// -------------------------------------------------------

/** Get candidates for a specific job, sorted by AI score */
export const getCandidates = (jobId) =>
  axios.get(`${BASE_URL}/candidates/?job_id=${jobId}`);
