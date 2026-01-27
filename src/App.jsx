import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PlansPage from "./pages/PlansPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MobileLayout from "./components/MobileLayout";
import ProfilePage from "./pages/ProfilePage";
import AddPlanPage from "./pages/AddPlanPage";
import PlanDetailsPage from "./pages/PlanDetailsPage";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="*"
          element={
            <ProtectedRoute>
              <MobileLayout>
                <Routes>
                  <Route path="/planes" element={<PlansPage />} />
                  <Route path="/planes/:id" element={<PlanDetailsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/add" element={<AddPlanPage />} />
                  {/* Redirect unknown routes to planes within the app */}
                  <Route path="*" element={<Navigate to="/planes" />} />
                </Routes>
              </MobileLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
