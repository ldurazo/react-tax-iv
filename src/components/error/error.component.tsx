"use client";

import React from "react";
import { useTranslations } from "next-intl";

const Error: React.FC = () => {
  const t = useTranslations();

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-lg mb-4">{t("somethingBadHappened")}</p>
      <button
        onClick={handleReload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {t("refresh")}
      </button>
    </div>
  );
};

export default Error;
