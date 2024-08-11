
import FormRow from "../Components/FormRow";
import { useState } from "react";
import customFetch from "../utils/customFetch";

const initialSchedule = [
  { day: "Monday", startTime: "12:00", endTime: "18:00" },
  { day: "Tuesday", startTime: "12:00", endTime: "18:00" },
  { day: "Wednesday", startTime: "12:00", endTime: "18:00" },
  { day: "Thursday", startTime: "12:00", endTime: "18:00" },
  { day: "Friday", startTime: "12:00", endTime: "18:00" },
  { day: "Saturday", startTime: "12:00", endTime: "16:00" },
];

const CreateClassroom = () => {
  const [classroomName, setClassroomName] = useState();
  const [classroomSchedule, setClassroomSchedule] = useState(initialSchedule);

  const handleStartTimeChange = (day, startTime) => {
    const newSchedules = [...classroomSchedule];
    const selectedDaySchedule = newSchedules.find(
      (schedule) => schedule.day === day
    );
    selectedDaySchedule.startTime = startTime;
    setClassroomSchedule(newSchedules);
  };
  const handleEndTimeChange = (day, endTime) => {
    const newSchedules = [...classroomSchedule];
    // const selectedDaySchedule = newSchedules.find(
    //   (schedule) => schedule.day === day
    // );
    // selectedDaySchedule.endTime = endTime;
    newSchedules.map((schedule)=>{
      if(schedule.day === day)  {
        schedule.endTime = endTime;
      }
    })
    setClassroomSchedule(newSchedules);
  };
  const handleSetSchedule = async()=>{
    try {
      await customFetch.post('/classroom/create-classroom', {name:classroomName, schedule:classroomSchedule})
      alert('Classroom created Successfully!');
      setClassroomName(null);
      setClassroomSchedule(initialSchedule);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error);
    }
  }

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-8">Create New Classroom</h3>
      <div className="flex justify-center">
        <div className="text-center">
          <FormRow
            type="text"
            name="classroomName"
            labelText="Classroom Name"
            required={true}
          />
          <button
            type="button"
            className="btn"
            onClick={(e) =>
              setClassroomName(
                e.currentTarget.previousElementSibling.firstChild.value
              )
            }
          >
            Set Classroom Name
          </button>
        </div>
      </div>
      {classroomName && (
        <div>
          <h3 className="text-2xl font-semibold my-8">
            Set Schedule for Classroom - {classroomName}
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
              {initialSchedule.map((schedule, i) => {
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
                        defaultValue={schedule.startTime}
                        onInput={(e) =>
                          handleStartTimeChange(schedule.day, e.target.value)
                        }
                      />
                      <input
                        type="time"
                        className="text-center rounded-md px-4"
                        defaultValue={schedule.endTime}
                        onInput={(e) =>
                          handleEndTimeChange(schedule.day, e.target.value)
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="btn mt-8" onClick={handleSetSchedule}>Set Schedule</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default CreateClassroom;
