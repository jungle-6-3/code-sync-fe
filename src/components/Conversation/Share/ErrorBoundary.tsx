import React, { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component <ErrorBoundaryProps, ErrorBoundaryState>{
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute left-1/2 top-1/2 flex h-screen -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center space-y-4">
          <p className="text-center text-2xl font-bold text-gray-600">
            이 화면은 현재 볼 수 없어요.
            <br />
            회의를 진행한 사람에게 권한을 요청하세요.
          </p>
          <p
            onClick={() => window.history.back()}
            className="cursor-pointer text-center text-sm font-bold text-gray-600 underline"
          >
            되돌아가기
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
