import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CodeEditor from "./pages/CodeEditor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/review" element={<CodeEditor/>} />
      </Routes>
    </Router>
  );
}

export default App;
