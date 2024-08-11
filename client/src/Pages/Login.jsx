import FormRow from "../Components/FormRow";
import {Form, redirect} from "react-router-dom"
import customFetch from "../utils/customFetch.js";

export const action = async({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login",data);
    alert("login success!");
    return redirect("/dashboard");
  } catch (error) {
    alert(error?.response?.data?.msg);
    return error;
  }
}

const Login = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h2 className="text-5xl font-bold mb-2">Class<span className="text-primary">Room</span></h2>
      <Form
        method="post"
        className="card w-3/4 h-5/6 bg-base-200 flex flex-col justify-center items-center"
      >
        <h3 className="text-4xl font-semibold mb-16">Login</h3>
        <FormRow
          type="text"
          name="email"
          labelText="Enter Email"
          required={true}
        />
        <FormRow
          type="password"
          name="password"
          labelText="Enter Password"
          required={true}
        />
        <button type="submit" className="btn btn-outline w-36 text-lg">
          Submit
        </button>
      </Form>
    </div>
  );
};
export default Login;
