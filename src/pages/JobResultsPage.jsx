
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Spinner, Alert, Form } from 'react-bootstrap';
import { searchJobs } from '../utils/api';

export default function JobResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  
  const query = searchParams.get('q');
  const location = searchParams.get('location');

  useEffect(() => {
    if (query) {
      fetchJobs(query, location);
    } else {
      setLoading(false);
      setError('No search query provided');
    }
  }, [query, location]);

  const fetchJobs = async (searchQuery, searchLocation) => {
    try {
      setLoading(true);
      setError('');
      const data = await searchJobs(searchQuery, searchLocation);
      setJobs(data.data || []);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const newSearchParams = new URLSearchParams({
        q: searchQuery,
        location: location || 'United States'
      });
      navigate(`/jobs?${newSearchParams.toString()}`);
    }
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return 'No description available';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const formatSalary = (job) => {
    if (job.job_salary_period && job.job_min_salary && job.job_max_salary) {
      return `$${job.job_min_salary?.toLocaleString()} - $${job.job_max_salary?.toLocaleString()} ${job.job_salary_period}`;
    }
    return 'Salary not specified';
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" className="me-2" />
        <span>Searching for jobs...</span>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        <Col lg={10} xl={9} className="mx-auto">
          <Card className="mb-4 shadow-sm border-0" style={{ borderRadius: '16px' }}>
            <Card.Body className="p-4">
              <Form onSubmit={handleNewSearch}>
                <Row className="g-3">
                  <Col md={9}>
                    <Form.Control
                      type="text"
                      placeholder="Search for jobs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      size="lg"
                      style={{
                        borderRadius: '10px',
                        border: '2px solid #e2e8f0',
                        padding: '0.75rem 1rem'
                      }}
                    />
                  </Col>
                  <Col md={3}>
                    <Button
                      type="submit"
                      className="w-100 h-100"
                      style={{
                        background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: '600',
                        boxShadow: '0 2px 8px rgba(0, 102, 204, 0.25)'
                      }}
                    >
                      Search
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0" style={{ color: '#1e293b' }}>Search Results</h2>
            <span style={{ color: '#64748b', fontWeight: '500' }}>
              {jobs.length} jobs found {query && `for "${query}"`}
            </span>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          {/* Job Cards */}
          {jobs.length === 0 && !loading && !error && (
            <Alert variant="info">
              No jobs found for your search criteria. Try different keywords.
            </Alert>
          )}

          {jobs.map((job, index) => (
            <Card
              key={job.job_id || index}
              className="mb-3 shadow-sm border-0"
              style={{
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '';
              }}
              onClick={() => navigate(`/job/${encodeURIComponent(job.job_id)}`)}
            >
              <Card.Body className="p-4">
                <Row>
                  <Col md={9}>
                    <div className="d-flex align-items-start mb-3">
                      {job.employer_logo && (
                        <div
                          style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '12px',
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '1rem',
                            flexShrink: 0
                          }}
                        >
                          <img
                            src={job.employer_logo}
                            alt={job.employer_name}
                            style={{
                              width: '45px',
                              height: '45px',
                              objectFit: 'contain'
                            }}
                          />
                        </div>
                      )}
                      <div className="flex-grow-1">
                        <h5 className="mb-2 fw-bold" style={{ color: '#0066cc' }}>
                          {job.job_title}
                        </h5>
                        <h6 className="mb-2" style={{ color: '#1e293b', fontWeight: '600' }}>
                          {job.employer_name}
                        </h6>
                        <p className="mb-0" style={{ color: '#64748b', fontSize: '0.95rem' }}>
                          <i className="fas fa-map-marker-alt me-2"></i>
                          {job.job_city && job.job_state
                            ? `${job.job_city}, ${job.job_state}`
                            : job.job_country}
                        </p>
                      </div>
                    </div>

                    <p style={{ color: '#64748b', marginBottom: '1rem', lineHeight: '1.6' }}>
                      {truncateText(job.job_description)}
                    </p>

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
                    </div>
                  </Col>

                  <Col md={3} className="text-md-end d-flex flex-column align-items-md-end justify-content-between">
                    <div>
                      <p className="fw-bold mb-2" style={{ color: '#16a34a', fontSize: '1.1rem' }}>
                        {formatSalary(job)}
                      </p>
                      <p className="small mb-3" style={{ color: '#64748b' }}>
                        {new Date(job.job_posted_at_datetime_utc).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/job/${encodeURIComponent(job.job_id)}`);
                      }}
                      style={{
                        borderRadius: '8px',
                        borderWidth: '2px',
                        fontWeight: '600',
                        padding: '0.5rem 1rem',
                        borderColor: '#0066cc',
                        color: '#0066cc'
                      }}
                    >
                      View Details
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
