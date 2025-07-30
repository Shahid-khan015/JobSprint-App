
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

export default function HomePage() {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');
    
    if (!jobTitle.trim()) {
      setError('Please enter a job title');
      return;
    }
    
    const searchParams = new URLSearchParams({
      q: jobTitle,
      location: location || 'United States'
    });
    
    navigate(`/jobs?${searchParams.toString()}`);
  };

  return (
    <div className="bg-light min-vh-100">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold text-primary mb-3">
                Find Your Dream Job
              </h1>
              <p className="lead text-muted">
                Search thousands of job opportunities from top companies
              </p>
            </div>
            
            <Card className="shadow-lg border-0">
              <Card.Body className="p-4">
                <Form onSubmit={handleSearch}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label className="fw-semibold">Job Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g. Software Engineer, Data Scientist"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        size="lg"
                      />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label className="fw-semibold">Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g. New York, Remote"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        size="lg"
                      />
                    </Col>
                  </Row>
                  
                  {error && <Alert variant="danger">{error}</Alert>}
                  
                  <div className="text-center">
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      className="px-5"
                    >
                      <i className="fas fa-search me-2"></i>
                      Search Jobs
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row className="mt-5">
          <Col lg={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="text-primary mb-3">
                  <i className="fas fa-search fa-3x"></i>
                </div>
                <h5>Easy Job Search</h5>
                <p className="text-muted">
                  Search thousands of jobs from top companies with our advanced search filters
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="text-success mb-3">
                  <i className="fas fa-dollar-sign fa-3x"></i>
                </div>
                <h5>Salary Insights</h5>
                <p className="text-muted">
                  Get estimated salary information and company compensation data
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="text-info mb-3">
                  <i className="fas fa-building fa-3x"></i>
                </div>
                <h5>Top Companies</h5>
                <p className="text-muted">
                  Discover opportunities at leading companies across various industries
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
