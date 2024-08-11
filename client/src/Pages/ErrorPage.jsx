import { Link } from "react-router-dom";
import errorImg from "../assets/error.jpg";
const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="w-48 h-72 rounded-2xl overflow-hidden">
        <img src={errorImg} alt="error" className="h-full object-cover"/>
      </div>
      <h2 className="text-7xl mt-2">Error 404!!!</h2>
      <p className="text-2xl mt-2">Something's not RIGHT.</p>
      <p className="text-2xl mt-2">You seem Lost!</p>
      <Link to="/dashboard" className="btn btn-outline mt-2 text-lg">Go Home?</Link>
    </div>
  )
}
export default ErrorPage