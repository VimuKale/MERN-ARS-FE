import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/LoginRegistration/Login";
import UserDashboard from "../pages/Dashboards/UserDashboard";
import ShelterDashboard from "../pages/Dashboards/ShelterDashboard";
import AdminDashboard from "../pages/Dashboards/AdminDashboard";
import ResponsiveAppBar from "../components/ResponsiveAppBar/ResponsiveAppBar";
import RequireAuth from "../utils/RequireAuth";
import RescueRequestForm from "../pages/RescueRequest/RescueRequestForm";
import RRContainer from "../pages/RescueRequest/ViewRR/RRContainer";
import AcceptedReq from "../pages/RescueRequest/ViewRR/AcceptedReq/AcceptedReq";
import UserAddUpdate from "../pages/LoginRegistration/UserAddUpdate/UserAddUpdate";
import ShelterAddUpdate from "../pages/LoginRegistration/ShelterAddUpdate/ShelterAddUpdate";
import AdminAddUpdate from "../pages/LoginRegistration/AdminAddUpdate/AdminAddUpdate";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/usersignup" element={<UserAddUpdate />} />
        <Route path="/sheltersignup" element={<ShelterAddUpdate />} />
        <Route path="/adminsignup" element={<AdminAddUpdate />} />
        <Route
          path="/userdashboard"
          element={
            <RequireAuth>
              <UserDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/shelterdashboard"
          element={
            <RequireAuth>
              <ShelterDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/admindashboard"
          element={
            <RequireAuth>
              <AdminDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/rescuerequest"
          element={
            <RequireAuth>
              <RescueRequestForm />
            </RequireAuth>
          }
        />
        <Route
          path="/viewrr"
          element={
            <RequireAuth>
              <RRContainer type={"ALL"} />
            </RequireAuth>
          }
        />

        <Route
          path="acceptedreq"
          element={
            <RequireAuth>
              <AcceptedReq />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
