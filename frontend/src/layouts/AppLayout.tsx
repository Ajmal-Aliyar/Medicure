import { ReactNode,  } from "react";
import { useAuthCheck } from "../hooks/useAuthCheck";

export const AppLayout = ({ children }: { children: ReactNode }) => {
    const loading = useAuthCheck()

 if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <span>Loading...</span> 
      </div>
    );
  }

    return (
        <main className="w-screen h-screen relative ">
            {children}
        </main>
    );
}