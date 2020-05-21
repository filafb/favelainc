import React from "react"

export const PrimaryButton = ({ disabled, text, type, children }) => (
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:cursor-not-allowed disabled:opacity-75 disabled:bg-gray-600"
    type={type}
    disabled={disabled}
  >
    {text}
    {children}
  </button>
)

export const SecondaryButton = ({ disabled, text, type, children }) => (
  <button
    className="bg-white hover:bg-gray-100 text-blue-500 font-bold py-2 px-4 border-blue-600 border rounded focus:outline-none focus:shadow-outline disabled:cursor-not-allowed disabled:opacity-75 disabled:bg-gray-700"
    type={type}
    disabled={disabled}
  >
    {text}
    {children}
  </button>
)
