import { Form } from "react-router-dom";
import FormRow from "./FormRow";

const UpdateModal = ({ selectedMember, selectedTeacher, selectedStudent, user }) => {
  const isTeacher = selectedMember === "teacher";
  return (
    <dialog id="update_modal" className="modal">
      <div className="modal-box pt-20">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <Form
          method="post"
          className="flex flex-col justify-center items-center"
        >
          <FormRow
            labelText="First Name"
            name="firstName"
            type="text"
            defaultValue={
              isTeacher
                ? selectedTeacher?.firstName || ""
                : selectedStudent?.firstName || ""
            }
            required={true}
          />
          <FormRow
            labelText="Last Name"
            name="lastName"
            type="text"
            defaultValue={
              isTeacher
                ? selectedTeacher?.lastName || ""
                : selectedStudent?.lastName || ""
            }
            required={true}
          />
          <FormRow
            labelText="Email"
            name="email"
            type="text"
            defaultValue={
              isTeacher
                ? selectedTeacher?.email || ""
                : selectedStudent?.email || ""
            }
            required={true}
          />
          <FormRow
            labelText="Assigned Class"
            name="assignedClassroom"
            type="text"
            defaultValue={
              user.role==='teacher'? '' : isTeacher
                ? selectedTeacher?.assignedClassroom || ""
                : selectedStudent?.assignedClassroom || ""
            }
            required={true}
            disabled={user.role===('teacher'||'student')}
          />
          <input
            type="checkbox"
            name="isTeacher"
            checked={isTeacher}
            className="hidden"
            onChange={(e) => console.log(e.target.value)}
          />
          <input
            type="text"
            name="id"
            defaultValue={
              isTeacher ? selectedTeacher?._id : selectedStudent?._id
            }
            className="hidden"
          />
          <button type="submit" className="btn">
            Submit
          </button>
        </Form>
      </div>
    </dialog>
  );
};
export default UpdateModal;
