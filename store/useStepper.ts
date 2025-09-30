import { create } from "zustand";

interface StepperState {
  activeStep: number;
  isComplete: boolean;
  actions: {
    nextStep: () => void;
    previousStep: () => void;
    onComplete: (isComplete: boolean) => void;
    onReset: () => void;
  };
}

const useStepperStore = create<StepperState>((set) => ({
  activeStep: 0,
  isComplete: false,
  actions: {
    onReset: () => set({ activeStep: 0, isComplete: false }),
    onComplete: (value) => set({ isComplete: value }),
    nextStep: () =>
      set((state) => ({
        activeStep: state.activeStep + 1,
      })),
    previousStep: () =>
      set((state) => ({
        activeStep: Math.max(state.activeStep - 1, 0),
      })),
  },
}));

export default useStepperStore;
