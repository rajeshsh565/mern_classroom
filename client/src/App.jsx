import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomeLayout from "./Pages/HomeLayout"
import ErrorPage from "./Pages/ErrorPage"
import Login from "./Pages/Login"
import DashboardLayout from "./Pages/DashboardLayout"
import AcademicMembers from "./Pages/AcademicMembers"

import { action as loginAction } from "./Pages/Login";
import { action as newMemberAction } from "./Pages/AddAcademicMembers";
import { action as updateMemberAction } from "./Pages/AcademicMembers";
import { loader as dashboardLoader } from "./Pages/DashboardLayout";
import { loader as allClassroomsLoader } from "./Pages/AllClassrooms";
import CreateClassroom from "./Pages/CreateClassroom"
import AddAcademicMembers from "./Pages/AddAcademicMembers"
import AllClassrooms from "./Pages/AllClassrooms"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Login/>,
        action: loginAction
      },
      {
        path: "/dashboard",
        element: <DashboardLayout/>,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AcademicMembers/>,
            action: updateMemberAction
          },
          {
            path:"academic-members",
            element: <AcademicMembers/>,
            action: updateMemberAction
          },
          {
            path:"add-new-members",
            element: <AddAcademicMembers/>,
            action: newMemberAction
          },
          {
            path: "create-classroom",
            element: <CreateClassroom/>
          },
          {
            path: "all-classrooms",
            element: <AllClassrooms/>,
            loader: allClassroomsLoader
          },
        ]
      }
    ]
  }
])

const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}
export default App