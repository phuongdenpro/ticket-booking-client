import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from "./pages/Admin/AdminLogin/AdminLogin";
import AdminLayout from "./components/Layout/AdminLayout";
import { routes } from "./routers";
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './assets/scss/grid.scss'
import './assets/scss/theme.scss'
import './assets/scss/index.scss'
export const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route path="admin" element={<AdminLayout />}>
          {routes}
        </Route>
        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
