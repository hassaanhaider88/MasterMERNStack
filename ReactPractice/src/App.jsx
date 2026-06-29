// import TimerCounter from "./Topics/TimerCounter";
// import Todo from "./Topics/Todo";
import Outer from "./Topics/Outer";

const App = () => {
  const fn = (name) => {
    console.log(name);
  };
  return (
    <>
      {" "}
      <Outer fn={fn} />
    </>
  );
};

export default App;
