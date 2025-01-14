import { create } from "zustand";
import { HabitState } from "../types/types";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

// To be able to view the Zustand's store status on the redux-dev tool, wrap the function with (), and write devtools

const useHabitStore = create<HabitState>()(
  devtools(
    persist(
      (set, get) => {
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
            set((state) => {
              return {
                habits: state.habits.filter((habit) => habit.id !== id),
              };
            }),
          toggleHabit: (id, date) =>
            set((state) => {
              return {
                habits: state.habits.map((habit) =>
                  habit.id === id
                    ? {
                        ...habit,
                        completedDates: habit.completedDates.includes(date)
                          ? habit.completedDates.filter((d) => d !== date)
                          : [...habit.completedDates, date],
                      }
                    : habit
                ),
              };
            }),
        };
      },
      {
        name: "habits-local",
        storage: createJSONStorage(() => localStorage), // Optional
      }
    )
  )
);

export default useHabitStore;