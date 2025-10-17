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
