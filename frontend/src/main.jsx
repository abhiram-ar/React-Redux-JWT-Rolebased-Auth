import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Login from "./Components/auth/Login.jsx";
import Signup from "./Components/auth/Signup.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Home from "./Components/user/Home.jsx";
import ProtectedRoute from "./Components/user/ProtectedRoute.jsx";
import AdminDashBoard from "./Components/admin/AdminDashBoard.jsx";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index:true,
                element: <Login/>
            },
            {
                path: "/home",
                element: <ProtectedRoute />,
                children: [{ path: "", element: <Home /> }],
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },

            {
                path: "/admin",
                element: <ProtectedRoute />,
                children: [{ path: "", element: <AdminDashBoard /> }],
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={appRouter} />
    </Provider>
);
