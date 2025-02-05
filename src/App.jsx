import "./App.css";
// import Counter from "./components/Counter";
import Home from "./components/Home";
import TopBar from "./components/TopBar";

function App() {
  return (
    <>
      <TopBar title="EpicStaurant" claim="Niente secondi piatti" />
      {/* <Counter /> */}

      <Home />
    </>
  );
}

export default App;
