import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./Header";
import Body from "./Body";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary
        fallback={
          <div className="bg-cyan-900 font-oswald text-white flex justify-center items-center text-3xl mt-20">
            OOPS! SOMETHING WENT WRONG...
          </div>
        }
      >
        <Header />
        <Body />
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>
);
