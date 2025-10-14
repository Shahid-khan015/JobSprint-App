
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
          <Col lg={9} xl={8}>
            <div className="text-center mb-5 mt-4">
              <h1 className="display-4 fw-bold mb-3" style={{ color: '#1e293b' }}>
                Discover Your Next Career Opportunity
              </h1>
              <p className="lead" style={{ color: '#64748b', fontSize: '1.25rem' }}>
                Search thousands of job opportunities from leading companies worldwide
              </p>
            </div>
            
            <Card className="shadow-lg border-0" style={{ borderRadius: '16px' }}>
              <Card.Body className="p-4 p-md-5">
                <Form onSubmit={handleSearch}>
                  <Row className="g-3">
                    <Col md={12} lg={6}>
                      <Form.Label className="fw-semibold" style={{ color: '#1e293b' }}>
                        Job Title or Keywords
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g. Software Engineer, Marketing Manager"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        size="lg"
                        style={{
                          borderRadius: '10px',
                          border: '2px solid #e2e8f0',
                          padding: '0.75rem 1rem'
                        }}
                      />
                    </Col>
                    <Col md={12} lg={6}>
                      <Form.Label className="fw-semibold" style={{ color: '#1e293b' }}>
                        Location
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g. New York, San Francisco, Remote"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        size="lg"
                        style={{
                          borderRadius: '10px',
                          border: '2px solid #e2e8f0',
                          padding: '0.75rem 1rem'
                        }}
                      />
                    </Col>
                  </Row>

                  {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                  <div className="text-center mt-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="px-5 py-3"
                      style={{
                        background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: '600',
                        fontSize: '1.1rem',
                        boxShadow: '0 4px 15px rgba(0, 102, 204, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
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
        
        <Row className="mt-5 g-4">
          <Col md={6} lg={4}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '16px', transition: 'all 0.3s ease' }}>
              <Card.Body className="text-center p-4">
                <div className="mb-3" style={{
                  width: '70px',
                  height: '70px',
                  background: 'linear-gradient(135deg, #0066cc 0%, #3385d6 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto'
                }}>
                  <i className="fas fa-search fa-2x" style={{ color: 'white' }}></i>
                </div>
                <h5 className="fw-bold mb-3" style={{ color: '#1e293b' }}>Smart Job Search</h5>
                <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                  Find relevant opportunities with our intelligent search that understands your location preferences
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '16px', transition: 'all 0.3s ease' }}>
              <Card.Body className="text-center p-4">
                <div className="mb-3" style={{
                  width: '70px',
                  height: '70px',
                  background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto'
                }}>
                  <i className="fas fa-dollar-sign fa-2x" style={{ color: 'white' }}></i>
                </div>
                <h5 className="fw-bold mb-3" style={{ color: '#1e293b' }}>Salary Insights</h5>
                <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                  Access comprehensive salary data and compensation insights for informed decisions
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '16px', transition: 'all 0.3s ease' }}>
              <Card.Body className="text-center p-4">
                <div className="mb-3" style={{
                  width: '70px',
                  height: '70px',
                  background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto'
                }}>
                  <i className="fas fa-building fa-2x" style={{ color: 'white' }}></i>
                </div>
                <h5 className="fw-bold mb-3" style={{ color: '#1e293b' }}>Top Companies</h5>
                <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                  Explore opportunities at industry-leading companies across all sectors
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
