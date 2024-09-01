"use client";

import React from "react";
import ErrorComponent from "@/components/error/error.component";

/**
 * General purposes error page.
 */
const ErrorPage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <ErrorComponent />
    </main>
  );
};

export default ErrorPage;
