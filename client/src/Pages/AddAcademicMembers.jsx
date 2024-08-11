import { useEffect, useState } from "react";
import { redirect, useNavigate, useOutletContext } from "react-router-dom";
import NewMemberForm from "../Components/NewMemberForm";
import customFetch from "../utils/customFetch";

export const action = async ({request})=>{
    console.log("in action");
    
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    
    const member = data.isTeacher=='on' ? 'teacher': 'student'
    const apiEndpoint = `/user/add-${member}`;
    console.log(apiEndpoint);
    
    try {
        await customFetch.post(apiEndpoint, data);
        alert(`new ${member} added successfully!`);
        return redirect('/dashboard');
    } catch (error) {
        alert(error?.response?.data?.msg);
        return error;
    }
}

const AddAcademicMembers = () => {
    const {user} = useOutletContext();
  const [addTeacher, setAddTeacher] = useState();
  return (
    <div>
      <div className="flex items-center justify-between">
          <h3 className="text-accent-content text-xl">
            Add New{" "}
            <span className="text-base-content underline font-semibold">
              {addTeacher ? "Teacher" : "Student"}
            </span>
          </h3>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 cursor-pointer ${user.role!=='principal' ? 'hidden':'block'}`} onClick={()=>setAddTeacher(!addTeacher)}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
</svg>
      </div>
      <div className="flex justify-center mt-16">
      <NewMemberForm member={addTeacher? 'teacher': 'student'}/>
      </div>
    </div>
  );
};
export default AddAcademicMembers;
