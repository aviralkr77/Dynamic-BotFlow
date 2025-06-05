import './App.css';
import Sidebar from './components/Sidebar/sidebar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Basic from "./components/Chatbot/chatbot";
import Stories from "./components/Stories/stories";
// import Chatflow from "./components/Chatflow/chatflow";

function App() {
  return (
    <Router>
      <div className="main-layout">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/stories" element={<Stories />} />
            {/* <Route path="/chatflow" element={<Chatflow />} /> */}
            <Route path="/chatbot" element={<Basic />} />
            <Route path="/" element={<Stories />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;