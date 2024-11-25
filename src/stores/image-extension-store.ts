import { map } from "nanostores";

export type InputOutputState = {
  input: string;
  output: string;
};

export const inputOutputStore = map<InputOutputState>({
  input: "",
  output: ""
});

export function setInput(value: string) {
  inputOutputStore.setKey("input", value);
}

export function setOutput(value: string) {
  inputOutputStore.setKey("output", value);
}

export function setInputOutput(input: string, output: string) {
  inputOutputStore.set({ input, output });
}
