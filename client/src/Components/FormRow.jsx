const FormRow = ({type, labelText, name, required, defaultValue, disabled=false}) => {
  return (
    <div className="flex flex-col relative form-row mb-8">
        <input type={type} id={name} name={name} defaultValue={defaultValue} autoComplete="off" required={required} disabled={disabled} className="h-9 w-72 rounded-lg px-2 bg-transparent border-2 border-base-content" style={{zIndex:'1'}}/>
        <label htmlFor={name} className="absolute ms-2 mt-1 transition-all z-0">{labelText}</label>
    </div>
  )
}
export default FormRow;