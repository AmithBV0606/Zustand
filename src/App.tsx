import useHabitStore from "./store/store";

const App = () => {
  const store = useHabitStore();
  console.log(store);

  return <div>App</div>;
};

export default App;