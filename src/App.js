import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";

import Login from "./pages/Admin/AdminLogin";
import './App.css';

export const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
