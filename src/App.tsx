import { Box, Container, Typography } from "@mui/material";
import useHabitStore from "./store/store";
import AddHabitForm from "./components/add-habit-form";

const App = () => {
  const store = useHabitStore();
  console.log(store);

  return (
    <Container>
      <Box>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Habit Tracker
        </Typography>

        {/* Form */}
        <AddHabitForm />

        {/* List */}
        {/* Stats */}
      </Box>
    </Container>
  );
};

export default App;