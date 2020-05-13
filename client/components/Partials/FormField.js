import React from "react"

export const InputField = ({
  label,
  type,
  value,
  name,
  placeholder,
  onChange,
  required = false
}) => {
  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      ></input>
    </>
  )
}
