import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Home from "./Components/user/Home.jsx";
import ProtectedRoute from "./Components/user/ProtectedRoute.jsx";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
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
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={appRouter} />
    </Provider>
);
