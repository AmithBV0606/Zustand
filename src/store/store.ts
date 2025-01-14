import { create } from "zustand";
import { HabitState } from "../types/types";

const useHabitStore = create<HabitState>()((set, get) => {
  return {
    habits: [],
  };
});

export default useHabitStore;