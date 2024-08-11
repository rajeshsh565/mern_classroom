import { Form } from "react-router-dom"
import FormRow from "./FormRow"

const NewMemberForm = ({member}) => {
  return (
    <Form method="post" className="mt-8 text-center">
        <FormRow type="text" name="firstName" labelText="First Name" required={true}/>
        <FormRow type="text" name="lastName" labelText="Last Name" required={true}/>
        <FormRow type="text" name="email" labelText="Email Address" required={true}/>
        <FormRow type="password" name="password" labelText="Password" required={true}/>
        <input type="checkbox" name="isTeacher" checked={member==='teacher'} className="hidden" onChange={(e)=>console.log(e.target.value)
        }/>
        <button type="submit" className="btn">Add New {member=='teacher'? 'Teacher': 'Student'}</button>
    </Form>
  )
}
export default NewMemberForm