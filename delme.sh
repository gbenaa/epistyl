# ==========================================================
# Create files for PBI-05 Parameter Form
# ==========================================================

mkdir -p frontend/src/config frontend/src/components frontend/src/pages frontend/src/__tests__ frontend/features frontend/src/steps

# ------------------------------
# frontend/src/config/defaults.ts
# ------------------------------
cat > frontend/src/config/defaults.ts <<'EOF'
export const DEFAULTS = {
  prompt: "High quality style transfer",
  strength: 0.8,
  steps: 30
};
EOF

# ------------------------------
# frontend/src/components/ParameterForm.tsx
# ------------------------------
cat > frontend/src/components/ParameterForm.tsx <<'EOF'
import React from "react";
import { DEFAULTS } from "../config/defaults";

type Props = {
  onSubmit: (values: { prompt: string; strength: number; steps: number }) => void;
  initial?: Partial<{ prompt: string; strength: number; steps: number }>;
};

export default function ParameterForm({ onSubmit, initial = {} }: Props) {
  const [prompt, setPrompt] = React.useState(initial.prompt ?? DEFAULTS.prompt);
  const [strength, setStrength] = React.useState(initial.strength ?? DEFAULTS.strength);
  const [steps, setSteps] = React.useState(initial.steps ?? DEFAULTS.steps);

  const clampStrength = (v: number) => Math.min(1, Math.max(0, v));
  const clampSteps = (v: number) => Math.min(150, Math.max(1, Math.round(v)));

  return (
    <form
      aria-label="parameter-form"
      className="grid gap-4 max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ prompt, strength: clampStrength(strength), steps: clampSteps(steps) });
      }}
    >
      <label className="grid gap-2">
        <span className="text-sm font-medium">Prompt</span>
        <textarea
          data-testid="prompt-input"
          className="border rounded-xl p-3"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          placeholder="Describe the desired style"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium">Strength (0 to 1)</span>
        <input
          data-testid="strength-input"
          type="number"
          step="0.01"
          min={0}
          max={1}
          className="border rounded-xl p-3"
          value={strength}
          onChange={(e) => setStrength(Number(e.target.value))}
        />
        <input
          aria-label="strength-slider"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={strength}
          onChange={(e) => setStrength(Number(e.target.value))}
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium">Steps</span>
        <input
          data-testid="steps-input"
          type="number"
          min={1}
          max={150}
          className="border rounded-xl p-3"
          value={steps}
          onChange={(e) => setSteps(Number(e.target.value))}
        />
      </label>

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 rounded-xl shadow border"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
EOF

# ------------------------------
# frontend/src/pages/ParametersPage.tsx
# ------------------------------
cat > frontend/src/pages/ParametersPage.tsx <<'EOF'
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
EOF

# ------------------------------
# frontend/src/__tests__/ParameterForm.defaults.test.tsx
# ------------------------------
cat > frontend/src/__tests__/ParameterForm.defaults.test.tsx <<'EOF'
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ParameterForm from "../../components/ParameterForm";
import { DEFAULTS } from "../../config/defaults";

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
EOF

# ------------------------------
# frontend/features/pbi05_parameter_form.feature
# ------------------------------
cat > frontend/features/pbi05_parameter_form.feature <<'EOF'
Feature: PBI-05 Parameter Form

  Background:
    Given an image upload has completed

  Scenario: Defaults shown when form is displayed
    When the parameter form is displayed
    Then the prompt field shows the default prompt
    And the strength field shows the default strength
    And the steps field shows the default steps
EOF

# ------------------------------
# frontend/src/steps/pbi05.steps.ts
# ------------------------------
cat > frontend/src/steps/pbi05.steps.ts <<'EOF'
import { defineFeature, loadFeature } from "jest-cucumber";
import { render, screen } from "@testing-library/react";
import React from "react";
import ParameterForm from "../components/ParameterForm";
import { DEFAULTS } from "../config/defaults";

const feature = loadFeature("frontend/features/pbi05_parameter_form.feature");

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
EOF

echo "✅ All PBI-05 files created successfully."
