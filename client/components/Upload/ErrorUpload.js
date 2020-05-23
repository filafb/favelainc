import React from "react"

const ErrorUpload = ({
  error: { missingFields = [], unrecognizedFields = [], errors }
}) => {
  return (
    <div>
      <p className="text-red-700 font-bold text-lg mb-1">
        Something went wrong :({" "}
      </p>
      {missingFields.length && (
        <div className="mb-4">
          <p className="italic">Missing Fields</p>
          <ul>
            {missingFields.map((field, i) => (
              <li className="ml-8 list-disc" key={i}>
                {field ? field : "Empty Column"}
              </li>
            ))}
          </ul>
        </div>
      )}
      {unrecognizedFields.length && (
        <div className="mb-4">
          <p className="italic">Unrecognized Fields</p>
          <ul>
            {unrecognizedFields.map((field, i) => (
              <li className="ml-8 list-disc" key={i}>
                {field ? field : "Empty Column"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ErrorUpload
