import LoginPage from "@/components/Pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "@/components/Pages/SignUpPage";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path ="/" element={<LoginPage />} />
                <Route path ="/signup" element = {<SignUp />}  />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;