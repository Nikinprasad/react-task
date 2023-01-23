import "./App.css";
import ViewImage from "./pages/ViewImage";
import { Route, BrowserRouter, Routes } from "react-router-dom";
// import AddImage from "./pages/AddImage";
import NotFound from "./pages/404";
import ListAppointment from "./pages/ListAppointment";
import CreateAppointment from "./pages/CreateAppointment";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route index element={<ListAppointment />} />
            <Route path="add" element={<CreateAppointment />} />
            <Route path="image" element={<ViewImage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
