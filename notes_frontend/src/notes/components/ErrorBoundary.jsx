import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ErrorBoundary provides a fallback UI if a child throws.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('App error', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, maxWidth: 680, margin: '10vh auto', textAlign: 'center' }}>
          <h1>Something went wrong.</h1>
          <p>Try reloading the page. If the problem persists, clear site storage for this app.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
