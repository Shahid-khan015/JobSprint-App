
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
        <Col lg={8} className="mx-auto">
          {/* Search Form */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Form onSubmit={handleNewSearch}>
                <Row>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      placeholder="Search for jobs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </Col>
                  <Col md={4}>
                    <Button type="submit" variant="primary" className="w-100">
                      Search
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>

          {/* Results Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Search Results</h2>
            <span className="text-muted">
              {jobs.length} jobs found for "{query}"
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
            <Card key={job.job_id || index} className="mb-3 shadow-sm">
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <div className="d-flex align-items-start mb-2">
                      {job.employer_logo && (
                        <img 
                          src={job.employer_logo} 
                          alt={job.employer_name}
                          className="me-3"
                          style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                        />
                      )}
                      <div className="flex-grow-1">
                        <h5 className="mb-1">
                          <Button 
                            variant="link" 
                            className="p-0 text-start text-decoration-none"
                            onClick={() => navigate(`/job/${encodeURIComponent(job.job_id)}`)}
                          >
                            {job.job_title}
                          </Button>
                        </h5>
                        <h6 className="text-primary mb-1">{job.employer_name}</h6>
                        <p className="text-muted mb-2">
                          <i className="fas fa-map-marker-alt me-1"></i>
                          {job.job_city}, {job.job_state} {job.job_country}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-muted mb-2">
                      {truncateText(job.job_description)}
                    </p>
                    
                    <div className="mb-2">
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
                    </div>
                  </Col>
                  
                  <Col md={4} className="text-md-end">
                    <p className="fw-bold text-success mb-2">
                      {formatSalary(job)}
                    </p>
                    <p className="text-muted small mb-2">
                      Posted: {new Date(job.job_posted_at_datetime_utc).toLocaleDateString()}
                    </p>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => navigate(`/job/${encodeURIComponent(job.job_id)}`)}
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
