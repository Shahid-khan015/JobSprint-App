
import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Navbar() {
  return (
    <BootstrapNavbar 
      expand="lg" 
      sticky="top" 
      className="custom-navbar shadow-sm"
    >
      <Container>
        <LinkContainer to="/">
          <BootstrapNavbar.Brand className="navbar-brand-custom">
            <div className="brand-container">
              <div className="brand-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <span className="brand-text">JobSprint</span>
            </div>
          </BootstrapNavbar.Brand>
        </LinkContainer>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link className="nav-link-custom">
                <i className="fas fa-home me-2"></i>
                Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/jobs">
              <Nav.Link className="nav-link-custom">
                <i className="fas fa-search me-2"></i>
                Browse Jobs
              </Nav.Link>
            </LinkContainer>
          </Nav>
          
          <Nav className="ms-auto align-items-center">
            <Nav.Link className="nav-link-custom">
              <i className="fas fa-bookmark me-2"></i>
              Saved Jobs
            </Nav.Link>
            <Nav.Link className="nav-link-custom">
              <i className="fas fa-bell me-2"></i>
              Alerts
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
