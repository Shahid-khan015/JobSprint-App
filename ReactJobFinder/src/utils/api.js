
const API_KEY = "7fdf4cdb14msh2642f983368bbc0p1b8320jsn567e044c1507";
const API_HOST = "jsearch.p.rapidapi.com";
const BASE_URL = "https://jsearch.p.rapidapi.com";

const headers = {
  "X-RapidAPI-Key": API_KEY,
  "X-RapidAPI-Host": API_HOST
};

export const searchJobs = async (query, location = "United States") => {
  try {
    const response = await fetch(
      `${BASE_URL}/search?query=${encodeURIComponent(query)}&page=1&num_pages=1&date_posted=all&remote_jobs_only=false&employment_types=FULLTIME%2CPARTTIME%2CINTERN%2CCONTRACTOR&job_requirements=under_3_years_experience%2Cmore_than_3_years_experience%2Cno_experience%2Cno_degree`,
      {
        method: "GET",
        headers: headers
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error searching jobs:", error);
    throw error;
  }
};

export const getJobDetails = async (jobId, country = "us") => {
  try {
    const response = await fetch(
      `${BASE_URL}/job-details?job_id=${encodeURIComponent(jobId)}&country=${country}`,
      {
        method: "GET",
        headers: headers
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching job details:", error);
    throw error;
  }
};

export const getEstimatedSalary = async (jobTitle) => {
  try {
    const response = await fetch(
      `${BASE_URL}/estimated-salary?job_title=${encodeURIComponent(jobTitle)}`,
      {
        method: "GET",
        headers: headers
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching estimated salary:", error);
    throw error;
  }
};

export const getCompanyJobSalary = async (company) => {
  try {
    const response = await fetch(
      `${BASE_URL}/company-job-salary?company=${encodeURIComponent(company)}`,
      {
        method: "GET",
        headers: headers
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching company salary:", error);
    throw error;
  }
};
