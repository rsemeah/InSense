import React from 'react';
import Link from 'next/link';

/**
 * SimplePage - A minimal, dependency-free base component for all pages
 * 
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {React.ReactNode} props.children - Page content
 * @param {string} [props.activeRoute] - Current active route for navigation highlighting
 * @returns {React.ReactElement}
 */
export default function SimplePage({ title, children, activeRoute = '/' }) {
  // Define all application routes
  const routes = [
    { path: '/', label: 'Home' },
    { path: '/inner-pulse', label: 'Inner Pulse' },
    { path: '/check-ups', label: 'Check-ups' },
    { path: '/reflections', label: 'Reflections' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/profile', label: 'Profile' },
    { path: '/study', label: 'Study' }
  ];

  // Base styles using inline styling for maximum compatibility
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: '#FCFCFC',
      color: '#1E1B2E'
    },
    header: {
      padding: '16px 20px',
      borderBottom: '1px solid #F8EBDD',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#B76E79'
    },
    main: {
      flex: 1,
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      width: '100%'
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '20px',
      color: '#1E1B2E'
    },
    footer: {
      padding: '16px 20px',
      borderTop: '1px solid #F8EBDD',
      textAlign: 'center',
      fontSize: '14px',
      color: '#1E1B2E80'
    },
    nav: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginBottom: '24px'
    },
    navLink: {
      padding: '8px 12px',
      textDecoration: 'none',
      color: '#1E1B2E',
      borderRadius: '4px',
      fontSize: '16px'
    },
    activeNavLink: {
      backgroundColor: '#F8EBDD',
      color: '#B76E79',
      fontWeight: '500'
    },
    bottomNav: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'space-around',
      backgroundColor: 'white',
      borderTop: '1px solid #F8EBDD',
      padding: '12px 0'
    },
    bottomNavLink: {
      textDecoration: 'none',
      color: '#1E1B2E80',
      fontSize: '12px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px'
    },
    bottomNavLinkActive: {
      color: '#B76E79'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>InSense</div>
      </header>

      <main style={styles.main}>
        <h1 style={styles.title}>{title}</h1>
        
        <nav style={styles.nav}>
          {routes.map((route) => (
            <Link 
              key={route.path} 
              href={route.path}
              style={{
                ...styles.navLink,
                ...(activeRoute === route.path ? styles.activeNavLink : {})
              }}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div>{children}</div>
      </main>

      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} InSense App</p>
      </footer>

      <nav style={styles.bottomNav}>
        {routes.slice(0, 5).map((route) => (
          <Link 
            key={route.path} 
            href={route.path}
            style={{
              ...styles.bottomNavLink,
              ...(activeRoute === route.path ? styles.bottomNavLinkActive : {})
            }}
          >
            <span>{route.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
