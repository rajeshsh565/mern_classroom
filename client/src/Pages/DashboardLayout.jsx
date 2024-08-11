import { Link, Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";

export const loader = async()=>{
  try {
    const {data} = await customFetch.get("/user/current-user");
    return data;
  } catch (error) {
    alert(error?.response?.data?.msg);
    return redirect("/");
  }
}

const DashboardLayout = () => {
  const data = useLoaderData();
  const {user} = data;
  const navigate = useNavigate();
  
  const logout = async() => {
    alert("logging out...");
    navigate("/");
    await customFetch.get("/auth/logout");
  }
  
  return (
    <div className="drawer lg:drawer-open">
      <input type="checkbox" id="classroom-drawer" className="drawer-toggle" />
      <div className="drawer-content">
        <nav className="flex justify-between items-center px-4 h-20 bg-accent lg:hidden">
          <div className="w-14"></div>
          <h2 className="text-3xl font-bold pointer-events-none">Class<span className="text-accent-content">Room</span></h2>
          <label
            htmlFor="classroom-drawer"
            className="btn btn-primary w-14"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

          </label>
        </nav>
        <div className="p-4 lg:p-8">
        <Outlet context={{user}}/>
        </div>
      </div>
      <div className="drawer-side z-10">
        <label htmlFor="classroom-drawer" className="drawer-overlay"></label>
        <div className="bg-base-200 text-center min-h-full py-4">
        <h2 className="text-3xl font-bold mb-4 pointer-events-none">Class<span className="text-accent-content">Room</span></h2>
        <ul className="menu bg-base-200 text-base-content w-80 p-4">
          <li>
            <Link to="./academic-members">Show Academic Members</Link>
          </li>
          <li>
            <Link to="./add-new-members" className={`${user.role==('student') ? 'hidden':'block'}`}>Add New Academic Members</Link>
          </li>
          <li>
            <Link to="./create-classroom" className={`${(user.role=='student'||user.role=='teacher') ? 'hidden':'block'}`}>Create Classroom</Link>
          </li>
          <li>
            <Link to="./all-classrooms" className={`${(user.role=='student'||user.role=='teacher') ? 'hidden':'block'}`}>View Classrooms</Link>
          </li>
        </ul>
        <h2 className="btn btn-accent btn-outline mb-4 mt-8" onClick={logout}>Logout</h2>
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
