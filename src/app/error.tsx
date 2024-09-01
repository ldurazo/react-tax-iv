"use client";

import React from "react";
import ErrorComponent from "@/components/error/error.component";

const ErrorPage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <ErrorComponent />
    </main>
  );
};

export default ErrorPage;
