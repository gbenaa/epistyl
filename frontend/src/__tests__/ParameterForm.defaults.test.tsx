import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ParameterForm from "../components/ParameterForm";
import { DEFAULTS } from "../config/defaults";

test("shows default prompt, strength, and steps when form displayed", () => {
  const noop = () => {};
  render(<ParameterForm onSubmit={noop} />);

  const prompt = screen.getByTestId("prompt-input") as HTMLTextAreaElement;
  const strength = screen.getByTestId("strength-input") as HTMLInputElement;
  const steps = screen.getByTestId("steps-input") as HTMLInputElement;

  expect(prompt.value).toBe(DEFAULTS.prompt);
  expect(Number(strength.value)).toBeCloseTo(DEFAULTS.strength, 5);
  expect(Number(steps.value)).toBe(DEFAULTS.steps);
});
