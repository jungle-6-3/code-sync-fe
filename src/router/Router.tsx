import LoginPage from "@/pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "@/pages/SignUpPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
