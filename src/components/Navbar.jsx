
import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Navbar() {
  return (
    <BootstrapNavbar
      expand="lg"
      sticky="top"
      style={{
        background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        padding: '0.75rem 0'
      }}
    >
      <Container>
        <LinkContainer to="/">
          <BootstrapNavbar.Brand
            style={{
              color: 'white',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '45px',
                  height: '45px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                <i className="fas fa-briefcase" style={{ fontSize: '1.3rem', color: 'white' }}></i>
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.025em' }}>
                JobSprint
              </span>
            </div>
          </BootstrapNavbar.Brand>
        </LinkContainer>

        <BootstrapNavbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
        />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <LinkContainer to="/">
              <Nav.Link
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: '500',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  margin: '0 0.25rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <i className="fas fa-home me-2"></i>
                Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/jobs?q=developer&location=United States">
              <Nav.Link
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: '500',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  margin: '0 0.25rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <i className="fas fa-search me-2"></i>
                Browse Jobs
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
