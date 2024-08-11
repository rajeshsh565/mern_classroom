import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";

export const loader = async () => {
  try {
    const classroomData = await customFetch.get("/classroom/all-classrooms");
    const teachersData = await customFetch.get("/user/getAllTeachers");
    const allClassrooms = classroomData.data.allClassrooms;
    const allTeachers = teachersData.data.teachers;
    return { allClassrooms, allTeachers };
  } catch (error) {
    alert(error?.response?.data?.msg);
    return error;
  }
};

const AllClassrooms = () => {
  const { allClassrooms, allTeachers } = useLoaderData();
  return (
    <div>
      {allClassrooms.map((classroom, i) => {
        return (
          <div key={i}>
            <h3 className="text-2xl">
              Classroom -{" "}
              <span className="font-semibold underline">{classroom.name}</span>
            </h3>
            <h3 className="text-2xl">
              Assigned Teacher -{" "}
              <span className="font-semibold underline">
                {allTeachers.map((teacher) => {
                  if (teacher._id == classroom.assignedTeacher) {
                    return teacher.firstName + " " + teacher.lastName;
                  }
                })}
              </span>
            </h3>
            <h3 className="text-2xl mb-2">
              Schedule-
            </h3>
            <div className="text-center">
              <div className="grid grid-cols-2 text-center border-2 rounded-md bg-base-300">
                <h4 className="text-xl">Days</h4>
                <div className="grid grid-cols-2">
                  <h4 className="text-xl border-l-2">Start Time</h4>
                  <h4 className="text-xl border-l-2">End Time</h4>
                </div>
              </div>
              <div className="border-2 rounded-md">
                {classroom.schedule.map((schedule, i) => {
                  return (
                    <div
                      className="grid grid-cols-2 text-center text-accent-content py-2"
                      key={i}
                    >
                      <p>{schedule.day}</p>
                      <div className="flex justify-around text-accent-content overflow-hidden">
                        <input
                          type="time"
                          className="text-center rounded-md px-4"
                          value={schedule.startTime}
                          onChange={(e) =>
                            console.log()
                            
                          }
                        />
                        <input
                          type="time"
                          className="text-center rounded-md px-4"
                          value={schedule.endTime}
                          onChange={(e) =>
                            console.log()
                            
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="divider">* * * * * * * * * *</div>
          </div>
        );
      })}
    </div>
  );
};
export default AllClassrooms;
