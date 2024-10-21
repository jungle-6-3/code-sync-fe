import LoginPage from "@/pages/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "@/pages/SignUpPage";

// export default function Router() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/signup" element={<SignUp />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
