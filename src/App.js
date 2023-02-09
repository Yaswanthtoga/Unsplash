import Register from "./pages/register/Register";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext.js";
import {BoolContextProvider} from "./context/boolContext.js";
import { SearchContextProvider } from "./context/searchContext.js";


function App() {
  const {currentUser} = useContext(AuthContext);
  // Protect Main Page from the User
  const ProtectedRoute = ({children})=>{

    if(currentUser){
      return children;
    }
    return <Navigate to="/login"/>
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute>
                <SearchContextProvider>
                  <BoolContextProvider><Main/></BoolContextProvider>
                </SearchContextProvider>
              </ProtectedRoute>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
  ]);


  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;