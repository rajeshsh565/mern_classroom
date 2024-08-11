import { redirect, useLoaderData, useOutletContext } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { useEffect, useState } from "react";
import UpdateModal from "../Components/UpdateModal";
import DeleteModal from "../Components/DeleteModal";

export const action = async({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  const member = data.isTeacher=='on' ? 'teacher': 'student';
  const apiEndpoint = `/user/update-${member}/${data.id}`;
  try {
    await customFetch.patch(apiEndpoint, data);
    alert('data updated!');
    window.location.reload();
    return null;
  } catch (error) {
    alert(error?.response?.data?.msg);
    return error;
  }
}

const AcademicMembers = () => {
  const { user } = useOutletContext();
  const [showTeachers, setShowTeachers] = useState();
  const [teachers, setTeachers] = useState();
  const [selectedMember, setSelectedMember] = useState();
  const [selectedTeacher, setSelectedTeacher] = useState();
  const [students, setStudents] = useState();
  const [selectedStudent, setSelectedStudent] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.role === "principal") {
          const teachersData = await customFetch.get("/user/getAllTeachers");
          const studentsData = await customFetch.get("/user/getAllStudents");
          setTeachers(teachersData.data.teachers);
          setStudents(studentsData.data.students);
        } else {
          const studentsData = await customFetch.get("/user/getClassStudents");
          setShowTeachers(false);
          setStudents(studentsData.data.classStudents);
        }
      } catch (error) {}
    };
    fetchData();
  }, [selectedMember]);

  const resetSelectedStates = () => {
    setSelectedMember(null);
    setSelectedStudent(null);
    setSelectedTeacher(null);
  }

  const handleUpdate = async(member)=>{
    document.getElementById('update_modal').showModal();
    if(member.role==='teacher'){
      setSelectedMember('teacher');
      setSelectedTeacher(member);
    }
    else {
      setSelectedMember('student');
      setSelectedStudent(member);
    }
  }
  const handleDelete = async(member)=>{
    document.getElementById('delete_modal').showModal();
    if(member.role==='teacher'){
      setSelectedMember('teacher');
      setSelectedTeacher(member);
    }
    else {
      setSelectedMember('student');
      setSelectedStudent(member);
    }
  }

  if(showTeachers){
    return (
      <div>
        <div className="flex items-center justify-between">
        <h3 className="text-accent-content text-xl">
          Showing All{" "}
          <span className="text-base-content underline font-semibold">Teachers</span>
        </h3>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer" onClick={()=>setShowTeachers(!showTeachers)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
  
        </div>
        {teachers ? <div className="teachers-container mt-8">
          <div className="grid grid-cols-5 text-center text-lg border-2 bg-base-300 rounded-md">
            <h4>First Name</h4>
            <h4 className="border-l-2">Last Name</h4>
            <h4 className="border-l-2">Email Address</h4>
            <h4 className="border-l-2">Assigned Classroom</h4>
            <h4 className="border-l-2">Actions</h4>
          </div>
          <div className="border-2 rounded-md">
            <DeleteModal selectedMember={selectedMember} selectedStudent={selectedStudent} selectedTeacher={selectedTeacher} user={user} resetSelectedStates={resetSelectedStates}/>
            <UpdateModal selectedMember={selectedMember} selectedStudent={selectedStudent} selectedTeacher={selectedTeacher} user={user} resetSelectedStates={resetSelectedStates}/>
            {
              teachers.map(((teacher,i)=>{
                return <div className="grid grid-cols-5 text-center py-2 text-accent-content" key={i}>
                  <p>{teacher.firstName || `-`}</p>
                  <p>{teacher.lastName || `-`}</p>
                  <p className="overflow-auto">{teacher.email}</p>
                  <p>{teacher.assignedClassroom || `-`}</p>
                  <div>
                    <button className="bg-accent hover:bg-secondary rounded-md m-1 px-2 transition-all" onClick={()=>handleUpdate(teacher)}>Update</button>
                    <button className="bg-accent hover:bg-secondary rounded-md m-1 px-2 transition-all" onClick={()=>handleDelete(teacher)}>Delete</button>
                  </div>
                </div>
              }))
            }
          </div>
        </div> : <div className="text-2xl mt-4">No Teachers Found!</div>}
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center justify-between">
      <h3 className="text-accent-content text-xl">
        Showing All{" "}
        <span className="text-base-content underline font-semibold">Students</span>
      </h3>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 cursor-pointer ${user.role!=='principal' ? 'hidden':'block'}`} onClick={()=>setShowTeachers(!showTeachers)}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
</svg>

      </div>
      {students?.length>0 ? <div className="students-container mt-8">
        <div className={`grid ${user.role==='student'? 'grid-cols-4':'grid-cols-5'} text-center text-lg border-2 bg-base-300 rounded-md`}>
          <h4>First Name</h4>
          <h4 className="border-l-2">Last Name</h4>
          <h4 className="border-l-2">Email Address</h4>
          <h4 className="border-l-2">Assigned Classroom</h4>
          <h4 className={`border-l-2 ${user.role==='student'? 'hidden':'block'}`}>Actions</h4>
        </div>
        <div className="border-2 rounded-md">
          <DeleteModal selectedMember={selectedMember} selectedStudent={selectedStudent} selectedTeacher={selectedTeacher} user={user} resetSelectedStates={resetSelectedStates}/>
          <UpdateModal selectedMember={selectedMember} selectedStudent={selectedStudent} selectedTeacher={selectedTeacher} user={user} resetSelectedStates={resetSelectedStates}/>
          {
            students.map(((student,i)=>{
              return <div className={`grid ${user.role==='student'? 'grid-cols-4':'grid-cols-5'} text-center py-2 text-accent-content`} key={i}>
                <p>{student.firstName || `-`}</p>
                <p>{student.lastName || `-`}</p>
                <p className="overflow-auto">{student.email}</p>
                <p>{student.assignedClassroom || `-`}</p>
                <div className={`${user.role==='student'? 'hidden':'block'}`}>
                  <button className="bg-accent hover:bg-secondary rounded-md m-1 px-2 transition-all" onClick={()=>handleUpdate(student)}>Update</button>
                  <button className="bg-accent hover:bg-secondary rounded-md m-1 px-2 transition-all" onClick={()=>handleDelete(student)}>Delete</button>
                </div>
              </div>
            }))
          }
        </div>
      </div> : <div className="text-2xl mt-4">No Students Found!</div>}
    </div>
  );
};
export default AcademicMembers;
