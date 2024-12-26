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
    console.log(this.state.error)
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
            <h2>Oops! Something went wrong.</h2>
          <p>
            There is an error. Please refresh the page and try again. If the
            error persists, please contact the support.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundry;
