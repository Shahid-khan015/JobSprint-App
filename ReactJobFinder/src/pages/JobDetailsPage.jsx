
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { getJobDetails, getEstimatedSalary, getCompanyJobSalary } from '../utils/api';

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [salary, setSalary] = useState(null);
  const [companySalary, setCompanySalary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch job details
      const jobData = await getJobDetails(decodeURIComponent(jobId));
      if (jobData.data && jobData.data.length > 0) {
        const jobInfo = jobData.data[0];
        setJob(jobInfo);
        
        // Fetch salary estimates
        if (jobInfo.job_title) {
          try {
            const salaryData = await getEstimatedSalary(jobInfo.job_title);
            setSalary(salaryData);
          } catch (salaryError) {
            console.log('Salary data not available');
          }
        }
        
        // Fetch company salary info
        if (jobInfo.employer_name) {
          try {
            const companySalaryData = await getCompanyJobSalary(jobInfo.employer_name);
            setCompanySalary(companySalaryData);
          } catch (companyError) {
            console.log('Company salary data not available');
          }
        }
      } else {
        setError('Job not found');
      }
    } catch (err) {
      setError('Failed to fetch job details. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatSalary = (job) => {
    if (job.job_salary_period && job.job_min_salary && job.job_max_salary) {
      return `$${job.job_min_salary?.toLocaleString()} - $${job.job_max_salary?.toLocaleString()} ${job.job_salary_period}`;
    }
    return null;
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" className="me-2" />
        <span>Loading job details...</span>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          {error}
          <div className="mt-3">
            <Button variant="outline-primary" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  if (!job) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Job details not available</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        <Col lg={8}>
          {/* Job Header */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Row>
                <Col md={8}>
                  <div className="d-flex align-items-start mb-3">
                    {job.employer_logo && (
                      <img 
                        src={job.employer_logo} 
                        alt={job.employer_name}
                        className="me-3"
                        style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                      />
                    )}
                    <div className="flex-grow-1">
                      <h1 className="h3 mb-2">{job.job_title}</h1>
                      <h5 className="text-primary mb-2">{job.employer_name}</h5>
                      <p className="text-muted mb-2">
                        <i className="fas fa-map-marker-alt me-1"></i>
                        {job.job_city}, {job.job_state} {job.job_country}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    {job.job_employment_type && (
                      <Badge bg="secondary" className="me-2">
                        {job.job_employment_type}
                      </Badge>
                    )}
                    {job.job_is_remote && (
                      <Badge bg="success" className="me-2">
                        Remote
                      </Badge>
                    )}
                    {formatSalary(job) && (
                      <Badge bg="info" className="me-2">
                        {formatSalary(job)}
                      </Badge>
                    )}
                  </div>
                </Col>
                
                <Col md={4} className="text-md-end">
                  <p className="text-muted small mb-3">
                    Posted: {new Date(job.job_posted_at_datetime_utc).toLocaleDateString()}
                  </p>
                  <Button 
                    variant="primary" 
                    size="lg"
                    href={job.job_apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply Now
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Job Description */}
          <Card className="mb-4 shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Job Description</h5>
            </Card.Header>
            <Card.Body>
              <div dangerouslySetInnerHTML={{ __html: job.job_description }} />
            </Card.Body>
          </Card>

          {/* Job Highlights */}
          {(job.job_highlights?.Qualifications || job.job_highlights?.Responsibilities) && (
            <Card className="mb-4 shadow-sm">
              <Card.Header>
                <h5 className="mb-0">Job Highlights</h5>
              </Card.Header>
              <Card.Body>
                {job.job_highlights.Qualifications && (
                  <div className="mb-3">
                    <h6>Qualifications:</h6>
                    <ul>
                      {job.job_highlights.Qualifications.map((qual, index) => (
                        <li key={index}>{qual}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {job.job_highlights.Responsibilities && (
                  <div>
                    <h6>Responsibilities:</h6>
                    <ul>
                      {job.job_highlights.Responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>

        {/* Sidebar */}
        <Col lg={4}>
          {/* Salary Estimate */}
          {salary && salary.data && salary.data.length > 0 && (
            <Card className="mb-4 shadow-sm">
              <Card.Header>
                <h6 className="mb-0">Salary Estimate</h6>
              </Card.Header>
              <Card.Body>
                {salary.data.map((item, index) => (
                  <div key={index} className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span>{item.job_title}</span>
                      <strong className="text-success">
                        ${item.median_salary?.toLocaleString()}
                      </strong>
                    </div>
                    <small className="text-muted">
                      Range: ${item.min_salary?.toLocaleString()} - ${item.max_salary?.toLocaleString()}
                    </small>
                  </div>
                ))}
              </Card.Body>
            </Card>
          )}

          {/* Company Salary Info */}
          {companySalary && companySalary.data && companySalary.data.length > 0 && (
            <Card className="mb-4 shadow-sm">
              <Card.Header>
                <h6 className="mb-0">Company Salary Range</h6>
              </Card.Header>
              <Card.Body>
                {companySalary.data.slice(0, 5).map((item, index) => (
                  <div key={index} className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span className="small">{item.job_title}</span>
                      <strong className="text-success small">
                        ${item.median_salary?.toLocaleString()}
                      </strong>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          )}

          {/* Back Button */}
          <Button 
            variant="outline-secondary" 
            onClick={() => navigate(-1)}
            className="w-100"
          >
            <i className="fas fa-arrow-left me-2"></i>
            Back to Results
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
