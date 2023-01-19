import "./App.css";
import ViewImage from "./pages/ViewImage";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import AddImage from "./pages/AddImage";
import NotFound from "./pages/404";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="add" element={<AddImage />} />
            <Route path="image" element={<ViewImage />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
