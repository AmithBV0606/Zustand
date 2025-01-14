import { create } from "zustand";
import { HabitState } from "../types/types";
import { devtools } from "zustand/middleware";

// To be able to view the Zustand's store status on the redux-dev tool, wrap the function with (), and write devtools

const useHabitStore = create<HabitState>()(
  devtools((set, get) => {
    return {
      habits: [],
      addHabit: (name, frequency) =>
        set((state) => {
          return {
            habits: [
              ...state.habits,
              {
                id: Date.now().toString(),
                name,
                frequency,
                completedDates: [],
                createdAt: new Date().toISOString(),
              },
            ],
          };
        }),
      removeHabit: (id) =>
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
        })),
    };
  })
);

export default useHabitStore;