import React from "react"

export const InputField = ({
  label,
  type,
  value,
  name,
  placeholder,
  onChange,
  required = false,
  autocomplete = false
}) => (
  <div className="my-5">
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
      autoComplete={autocomplete ? autocomplete : "on"}
    ></input>
  </div>
)

export const ToggleSwitch = ({ type, onChange, value, name }) => (
  <div className="my-5 flex justify-around items-center">
    <label>Usuário será administrador?</label>
    <div className="relative inline-block w-16 h-8">
      <input
        className="opacity-0 w-full h-full"
        type={type}
        onChange={onChange}
        value={value ? "on" : "off"}
        name={name}
        checked={value}
      ></input>
      <span className="slider round absolute top-0 left-0 right-0 bottom-0 duration-300 bg-gray-600 -z-1"></span>
    </div>
  </div>
)
