import React from "react"

export const PrimaryButton = ({ disabled, text, type }) => (
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:cursor-not-allowed disabled:opacity-75 disabled:bg-gray-600"
    type={type}
    disabled={disabled}
  >
    {text}
  </button>
)
