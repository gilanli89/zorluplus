import { Component, type ErrorInfo, type ReactNode } from "react";

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

export default class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[App] Render failed", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-background px-6 py-16 text-foreground">
          <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center text-center">
            <p className="text-sm font-semibold text-primary">Zorlu Digital Plaza</p>
            <h1 className="mt-3 text-2xl font-bold">Sayfa yüklenemedi</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Bağlantınızı kontrol edip sayfayı yeniden yükleyin.
            </p>
            <a
              href={window.location.href}
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-6 font-semibold text-primary-foreground"
            >
              Yeniden yükle
            </a>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}