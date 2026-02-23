import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Editor from "./components/Editor";
import PreviewCV from "./components/PreviewCV";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navigation />
      <div className="app-content">
        <Routes>
          <Route path="/editor" element={<Editor />} />
          <Route path="/preview" element={<PreviewCV />} />
          <Route path="*" element={<Navigate to="/editor" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
