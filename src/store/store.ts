import { create } from "zustand";
import { Habit, HabitState } from "../types/types";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

// To be able to view the Zustand's store status on the redux-dev tool, wrap the function with (), and write devtools

const useHabitStore = create<HabitState>()(
  devtools(
    persist(
      (set, get) => {
        return {
          habits: [],
          isLoading: false,
          error: null,
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
          fetchHabits: async () => {
            set({ isLoading: true });
            try {
              const currentHabits = get().habits;
              if (currentHabits.length > 0) {
                set({ isLoading: false });
                return;
              }
              await new Promise((resolve) => setTimeout(resolve, 2000));
              const mockHabits: Habit[] = [
                {
                  id: "1",
                  name: "Read book",
                  frequency: "daily",
                  completedDates: [],
                  createdAt: new Date().toISOString(),
                },
                {
                  id: "2",
                  name: "Go to Gym",
                  frequency: "daily",
                  completedDates: [],
                  createdAt: new Date().toISOString(),
                },
              ];
              set({
                habits: mockHabits,
                isLoading: false,
              });
            } catch (error) {
              set({ error: "Failed to fetch habits!", isLoading: false });
            }
          },
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
