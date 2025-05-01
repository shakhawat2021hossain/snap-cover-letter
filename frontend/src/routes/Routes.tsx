import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import DisplayTemplates from "../pages/DisplayTemplate";
import Prompt from "../components/Prompt";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/generator',
                element: <Prompt/>
            },
            {
                path: '/templates',
                element: <DisplayTemplates/>
            }
        ]
    }
])