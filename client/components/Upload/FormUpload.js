import * as React from "react"
import axios from "axios"
import useFormControl from "../Hooks/useFormControl"
import { FileInput } from "../Partials/FormField"
import { PrimaryButton } from "../Partials/Buttons"
import ErrorUpload from "./ErrorUpload"

const FormUpload = ({ api, text }) => {
  const [file, setFile] = React.useState("")
  const [status, handleStatus, types] = useFormControl()
  const [rowsCreated, setRowsCreated] = React.useState(0)
  const [error, setError] = React.useState({})

  const upload = async e => {
    e.preventDefault()
    if (status === types.SUBMITTING) {
      return
    }
    handleStatus({ type: types.SUBMITTING })

    try {
      const data = new FormData()
      data.append("file", file)
      setFile("")
      const { data: response } = await axios.post(api, data)
      setRowsCreated(response.created)
      handleStatus({ type: types.SUCCESS })
    } catch (error) {
      setError(error.response.data)
      handleStatus({ type: types.ERROR })
    }
  }

  const getFile = e => {
    if (status === types.SUBMITTING) {
      return
    }
    handleStatus({ type: types.IDLE })
    setError({})
    const fileToUp = e.target.files[0]
    if (fileToUp.type === "text/csv") {
      setFile(fileToUp)
    } else {
      console.log("Has to be csv")
    }
  }
  return (
    <>
      <h2 className="text-2xl leading-tight">{text}</h2>
      <div>
        <form className="my-4" onSubmit={upload}>
          <div className="my-3">
            <div className="bg-white hover:bg-gray-100 text-blue-500 font-bold py-2 px-4 border-blue-600 border rounded">
              <FileInput
                onChange={getFile}
                label="Select a .csv file to upload"
              />
            </div>
            <p className="italic">
              {file ? `File selected: ${file.name}` : "No file selected"}
            </p>
          </div>
          <PrimaryButton disabled={!file} text="Upload" type="submit" />
        </form>
      </div>
      {status === types.SUBMITTING && <p>Submitting...</p>}
      {status === types.SUCCESS && (
        <p>Success! Total rows created: {rowsCreated}</p>
      )}
      {status === types.ERROR && <ErrorUpload error={error} />}
    </>
  )
}

export default FormUpload
