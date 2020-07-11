import React, { useState } from "react"

export const InputField = ({
  label,
  type,
  value,
  name,
  placeholder,
  onChange,
  required = false,
  autocomplete = false,
  editable = true,
  validation,
  validationText
}) => {
  const [validated, setValidated] = useState(true)

  const handleValidation = () => {
    if (validation && value && !validation.test(value)) {
      setValidated(false)
    } else if (required && !value) {
      setValidated(false)
    } else {
      setValidated(true)
    }
  }

  const handleFocus = () => {
    setValidated(true)
  }

  return (
    <div className="my-5">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      {editable ? (
        <input
          className={`${!validated &&
            "border-red-600"} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          type={type}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          onBlur={handleValidation}
          onFocus={handleFocus}
          autoComplete={autocomplete ? autocomplete : "on"}
        ></input>
      ) : (
        <p>{value}</p>
      )}
      {!validated && (
        <p className="absolute text-red-600 text-xs">
          {validationText || "Campo necessário"}
        </p>
      )}
    </div>
  )
}

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

export const FileInput = ({ onChange, label }) => {
  return (
    <div className="relative inline-block">
      <label className="absolute w-full h-full">{label}</label>
      <input
        className="opacity-0"
        type="file"
        name="file"
        accept=".csv"
        onChange={onChange}
      />
    </div>
  )
}

export const SelectPartnerField = ({
  label,
  name,
  value,
  onChange,
  ngoPartners = []
}) => {
  return (
    <div className="my-5">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <select required name={name} value={value} onChange={onChange}>
        <option value="" disabled>
          Selecione uma organização
        </option>
        {ngoPartners.map(({ id, name }) => {
          return (
            <option key={id} value={id}>
              {name}
            </option>
          )
        })}
      </select>
    </div>
  )
}
