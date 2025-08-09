import { createBrowserRouter } from "react-router-dom";
import App  from "../App";
import Home from "../pages/Home"
import ExplorePage from "../pages/ExplorePage";
import DetailsPage from "../pages/DetailsPage";
import SearchPage from "../pages/SearchPage"
import Register from "../components/auth/register";
import Login from "../components/auth/login";
import ProfilePage from "../pages/ProfilePage";
import Settings from "../pages/UserPages/Settings";
import History from "../pages/UserPages/History";
import Liked from "../pages/UserPages/Liked";
import WatchLater from "../pages/UserPages/WatchLater";
import Profile from "../pages/UserPages/Profile";
import VerifyEmail from "../components/auth/VerifyEmail";
import CompleteVerification from "../components/auth/CompleteVerification";
const router =createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"",
                element:<Home/>,
            },
            {
                path:":explore",
                element:<ExplorePage />
            },
            {
                 path:":explore/:id",
                element:<DetailsPage />
            },
            {
                path: "search",
                element: <SearchPage/>   
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "Profile",
                element: <ProfilePage />
            },
            {
                path: "Profile/profile",
                element: <Profile/>
            },
            {
                path: "Profile/settings",
                element: <Settings />
            },
            {
                path: "Profile/history",
                element: <History />
            },
            {
                path: "Profile/liked",
                element: <Liked />
            },
            {
                path: "Profile/watchlater",
                element: <WatchLater />
            },
            {
                path:"/verify-email" ,
                element:<VerifyEmail />
            },{
                path: "complete-verification",
                element: <CompleteVerification />
            }

        ]
    }
])
export default router