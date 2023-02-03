import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={"/"} element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
