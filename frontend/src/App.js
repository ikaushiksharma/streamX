import NavBar from "./components/UI/NavBar";
import Home from "./components/UI/Home";
import Radium from 'radium'
import "./app.css";
function App() {
  const style={backgroundColor:'red'}
  return (
    <>
      <NavBar />
      <Home style={style} />
    </>
  );
}

export default Radium(App);
