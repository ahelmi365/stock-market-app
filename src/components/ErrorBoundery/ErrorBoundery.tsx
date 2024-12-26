import { Component } from "react";

interface IErrorBoundryProps {
  children: React.ReactNode;
}

interface IErrorBoundryState {
  hasError: boolean;
  error: Error | null;
}
class ErrorBoundry extends Component<IErrorBoundryProps, IErrorBoundryState> {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, info: any) {
    console.log("Error Boundry caught error: ", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Oops! Something went wrong.</h2>

          {this.state.error && (
            <div>
              <h3>Error Details:</h3>
              <p>{(this.state.error as Error).message}</p>
            </div>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundry;
