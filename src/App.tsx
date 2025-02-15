import { Box, Container, Typography } from "@mui/material";
import useHabitStore from "./store/store";
import AddHabitForm from "./components/add-habit-form";
import HabitList from "./components/habit-list";

const App = () => {
  // const store = useHabitStore();
  // console.log(store);

  const { fetchHabits } = useHabitStore();
  
  return (
    <Container>
      <Box>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Habit Tracker
        </Typography>

        {/* Form */}
        <AddHabitForm />

        {/* List */}
        <HabitList />
        {/* Stats */}
      </Box>
    </Container>
  );
};

export default App;