import React from "react"

const ErrorUpload = ({
  error: { missingFields = [], unrecognizedFields = [], errors = [] }
}) => {
  return (
    <div>
      <p className="text-red-700 font-bold text-lg mb-1">
        Something went wrong :({" "}
      </p>
      {!!missingFields.length && (
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
      {!!unrecognizedFields.length && (
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
      {!!errors.length && (
        <div className="mb-4">
          <p className="italic mb-4">{`Database Errors - ${errors.length}`}</p>
          {errors.map((error, i) => (
            <div
              key={i}
              className="rounded overflow-hidden shadow py-6 px-4 mb-4"
            >
              <p className="font-bold mb-1">{`Error ${i + 1}/${
                errors.length
              }`}</p>
              <p>{`Message: ${error.message}`}</p>
              <p>{`Type: ${error.type}`}</p>
              <p>{`Field: ${error.path}`}</p>
              <p>{`Value: ${error.value}`}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ErrorUpload
