import { defineFeature, loadFeature } from "jest-cucumber";
import { render, screen } from "@testing-library/react";
import React from "react";
import ParameterForm from "../components/ParameterForm";
import { DEFAULTS } from "../config/defaults";

const feature = loadFeature("features/pbi05_parameter_form.feature");

defineFeature(feature, (test) => {
  let formRendered = false;

  test("Defaults shown when form is displayed", ({ given, when, then, and }) => {
    given("an image upload has completed", () => {
      // Upload complete simulated
    });

    when("the parameter form is displayed", () => {
      render(<ParameterForm onSubmit={() => {}} />);
      formRendered = true;
    });

    then("the prompt field shows the default prompt", () => {
      expect(formRendered).toBe(true);
      const el = screen.getByTestId("prompt-input") as HTMLTextAreaElement;
      expect(el.value).toBe(DEFAULTS.prompt);
    });

    and("the strength field shows the default strength", () => {
      const el = screen.getByTestId("strength-input") as HTMLInputElement;
      expect(Number(el.value)).toBeCloseTo(DEFAULTS.strength, 5);
    });

    and("the steps field shows the default steps", () => {
      const el = screen.getByTestId("steps-input") as HTMLInputElement;
      expect(Number(el.value)).toBe(DEFAULTS.steps);
    });
  });
});
