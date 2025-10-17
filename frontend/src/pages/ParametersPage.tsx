import React from "react";
import ParameterForm from "../components/ParameterForm";

export default function ParametersPage() {
  const handleSubmit = (values: { prompt: string; strength: number; steps: number }) => {
    console.log("Parameters chosen:", values);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Parameters</h1>
      <ParameterForm onSubmit={handleSubmit} />
    </main>
  );
}
