import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface State { hasError: boolean; message: string }

export class AdminErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false, message: "" };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 text-center p-8">
          <p className="text-destructive font-semibold">Bir hata oluştu</p>
          <p className="text-sm text-muted-foreground max-w-md">
            Sayfa yüklenirken beklenmedik bir sorun oluştu. Lütfen sayfayı yenileyin.
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Sayfayı Yenile
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
