import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import WithoutSidebar from "./layouts/WithoutSidebar";
import WithSidebar from "./layouts/WithSidebar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes WITHOUT Sidebar */}
        <Route element={<WithoutSidebar />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Routes WITH Sidebar */}
        <Route element={<WithSidebar />}>
          <Route path="/home" element={<Home />} />
          {/* Add more sidebar-wrapped routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
