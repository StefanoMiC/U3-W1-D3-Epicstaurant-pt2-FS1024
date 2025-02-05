import "./App.css";
// import Counter from "./components/Counter";
import Home from "./components/Home";
import ReservationForm from "./components/ReservationForm";
import TopBar from "./components/TopBar";

function App() {
  return (
    <>
      <TopBar title="EpicStaurant" claim="Niente secondi piatti" />
      {/* <Counter /> */}
      <ReservationForm />
      <Home />
    </>
  );
}

export default App;
