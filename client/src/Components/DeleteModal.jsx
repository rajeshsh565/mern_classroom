import { useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";

const DeleteModal = ({
  selectedMember,
  selectedTeacher,
  selectedStudent,
  resetSelectedStates,
}) => {
  const navigate = useNavigate();
  const isTeacher = selectedMember === "teacher";
  return (
    <dialog id="delete_modal" className="modal">
      <div className="modal-box">
        <p className="py-4">
          Are you Sure, you want to delete {selectedMember},{" "}
          {isTeacher
            ? selectedTeacher?.firstName + " " + selectedTeacher?.lastName
            : selectedStudent?.firstName + " " + selectedStudent?.lastName}?
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn me-2"
              onClick={async () => {
                const apiEndpoint = `/user/delete-${selectedMember}/${
                  isTeacher ? selectedTeacher?._id : selectedStudent?._id
                }`;
                try {
                  await customFetch.delete(apiEndpoint);
                  alert("Delete Successful!");
                  resetSelectedStates();
                } catch (error) {
                  alert(error?.response?.data?.msg);
                  console.log(error);
                }
              }}
            >
              Yes, Delete
            </button>
            <button className="btn">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
export default DeleteModal;
