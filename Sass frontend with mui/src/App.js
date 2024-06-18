import { Data } from "./components/Data";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { productsApi } from "./features/apiSlice";
import Topbar from "./components/Topbar";
import SignIn from "./components/Singup";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import SignUp from "./components/Singup";
import ProRoutes from "./protectedRout/ProRoute";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import VedioCallPage from "./pages/vedioCall/VedioCallPage";
import PublicRoute from "./protectedRout/PublicRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route>
            <Route element={<ProRoutes />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<Topbar />} />
              <Route path="/videocall" element={<VedioCallPage />} />
            </Route>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
