
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
          <Card className="mb-4 shadow-sm border-0" style={{ borderRadius: '16px' }}>
            <Card.Body className="p-4">
              <Row>
                <Col md={8}>
                  <div className="d-flex align-items-start mb-3">
                    {job.employer_logo && (
                      <div
                        style={{
                          width: '90px',
                          height: '90px',
                          borderRadius: '16px',
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '1.25rem',
                          flexShrink: 0
                        }}
                      >
                        <img
                          src={job.employer_logo}
                          alt={job.employer_name}
                          style={{
                            width: '70px',
                            height: '70px',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                    )}
                    <div className="flex-grow-1">
                      <h1 className="h3 mb-2 fw-bold" style={{ color: '#1e293b' }}>
                        {job.job_title}
                      </h1>
                      <h5 className="mb-2" style={{ color: '#0066cc', fontWeight: '600' }}>
                        {job.employer_name}
                      </h5>
                      <p className="mb-0" style={{ color: '#64748b' }}>
                        <i className="fas fa-map-marker-alt me-2"></i>
                        {job.job_city && job.job_state
                          ? `${job.job_city}, ${job.job_state}`
                          : job.job_country}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap gap-2">
                    {job.job_employment_type && (
                      <Badge
                        bg="secondary"
                        style={{
                          padding: '0.5rem 0.75rem',
                          borderRadius: '8px',
                          fontWeight: '500'
                        }}
                      >
                        {job.job_employment_type}
                      </Badge>
                    )}
                    {job.job_is_remote && (
                      <Badge
                        bg="success"
                        style={{
                          padding: '0.5rem 0.75rem',
                          borderRadius: '8px',
                          fontWeight: '500',
                          background: '#16a34a'
                        }}
                      >
                        Remote
                      </Badge>
                    )}
                    {formatSalary(job) && (
                      <Badge
                        style={{
                          padding: '0.5rem 0.75rem',
                          borderRadius: '8px',
                          fontWeight: '500',
                          background: '#0891b2',
                          color: 'white'
                        }}
                      >
                        {formatSalary(job)}
                      </Badge>
                    )}
                  </div>
                </Col>

                <Col md={4} className="text-md-end d-flex flex-column align-items-md-end justify-content-between">
                  <p className="small mb-3" style={{ color: '#64748b' }}>
                    Posted: {new Date(job.job_posted_at_datetime_utc).toLocaleDateString()}
                  </p>
                  <Button
                    size="lg"
                    href={job.job_apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: '600',
                      padding: '0.75rem 2rem',
                      boxShadow: '0 4px 15px rgba(0, 102, 204, 0.3)'
                    }}
                  >
                    Apply Now
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm border-0" style={{ borderRadius: '16px' }}>
            <Card.Header
              style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderBottom: '1px solid #e2e8f0',
                borderRadius: '16px 16px 0 0',
                padding: '1rem 1.5rem'
              }}
            >
              <h5 className="mb-0 fw-bold" style={{ color: '#1e293b' }}>
                Job Description
              </h5>
            </Card.Header>
            <Card.Body className="p-4">
              <div
                dangerouslySetInnerHTML={{ __html: job.job_description }}
                style={{ color: '#64748b', lineHeight: '1.7' }}
              />
            </Card.Body>
          </Card>

          {(job.job_highlights?.Qualifications || job.job_highlights?.Responsibilities) && (
            <Card className="mb-4 shadow-sm border-0" style={{ borderRadius: '16px' }}>
              <Card.Header
                style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderBottom: '1px solid #e2e8f0',
                  borderRadius: '16px 16px 0 0',
                  padding: '1rem 1.5rem'
                }}
              >
                <h5 className="mb-0 fw-bold" style={{ color: '#1e293b' }}>
                  Job Highlights
                </h5>
              </Card.Header>
              <Card.Body className="p-4">
                {job.job_highlights.Qualifications && (
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3" style={{ color: '#1e293b' }}>
                      Qualifications:
                    </h6>
                    <ul style={{ color: '#64748b', lineHeight: '1.7' }}>
                      {job.job_highlights.Qualifications.map((qual, index) => (
                        <li key={index} className="mb-2">{qual}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {job.job_highlights.Responsibilities && (
                  <div>
                    <h6 className="fw-bold mb-3" style={{ color: '#1e293b' }}>
                      Responsibilities:
                    </h6>
                    <ul style={{ color: '#64748b', lineHeight: '1.7' }}>
                      {job.job_highlights.Responsibilities.map((resp, index) => (
                        <li key={index} className="mb-2">{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col lg={4}>
          {salary && salary.data && salary.data.length > 0 && (
            <Card className="mb-4 shadow-sm border-0" style={{ borderRadius: '16px' }}>
              <Card.Header
                style={{
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                  borderBottom: '1px solid #bbf7d0',
                  borderRadius: '16px 16px 0 0',
                  padding: '1rem 1.5rem'
                }}
              >
                <h6 className="mb-0 fw-bold" style={{ color: '#15803d' }}>
                  Salary Estimate
                </h6>
              </Card.Header>
              <Card.Body className="p-3">
                {salary.data.map((item, index) => (
                  <div key={index} className="mb-3 pb-3" style={{ borderBottom: index < salary.data.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <span style={{ color: '#1e293b', fontWeight: '500', fontSize: '0.95rem' }}>
                        {item.job_title}
                      </span>
                      <strong style={{ color: '#16a34a', fontSize: '1.1rem' }}>
                        ${item.median_salary?.toLocaleString()}
                      </strong>
                    </div>
                    <small style={{ color: '#64748b' }}>
                      Range: ${item.min_salary?.toLocaleString()} - ${item.max_salary?.toLocaleString()}
                    </small>
                  </div>
                ))}
              </Card.Body>
            </Card>
          )}

          {companySalary && companySalary.data && companySalary.data.length > 0 && (
            <Card className="mb-4 shadow-sm border-0" style={{ borderRadius: '16px' }}>
              <Card.Header
                style={{
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  borderBottom: '1px solid #bfdbfe',
                  borderRadius: '16px 16px 0 0',
                  padding: '1rem 1.5rem'
                }}
              >
                <h6 className="mb-0 fw-bold" style={{ color: '#1e40af' }}>
                  Company Salary Range
                </h6>
              </Card.Header>
              <Card.Body className="p-3">
                {companySalary.data.slice(0, 5).map((item, index) => (
                  <div key={index} className="mb-2 pb-2" style={{ borderBottom: index < 4 ? '1px solid #e2e8f0' : 'none' }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
                        {item.job_title}
                      </span>
                      <strong style={{ color: '#16a34a', fontSize: '0.95rem' }}>
                        ${item.median_salary?.toLocaleString()}
                      </strong>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          )}

          <Button
            variant="outline-secondary"
            onClick={() => navigate(-1)}
            className="w-100"
            style={{
              borderRadius: '12px',
              borderWidth: '2px',
              fontWeight: '600',
              padding: '0.75rem 1rem',
              borderColor: '#64748b',
              color: '#64748b'
            }}
          >
            <i className="fas fa-arrow-left me-2"></i>
            Back to Results
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
