import * as React from "react"
import axios from "axios"
import useFormControl from "../Hooks/useFormControl"
import { FileInput } from "../Partials/FormField"
import { PrimaryButton } from "../Partials/Buttons"
import ErrorUpload from "./ErrorUpload"

const ResidentsUpload = () => {
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
      const { data: response } = await axios.post(
        "/api/residents/upload/batch",
        data
      )
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
    <main className="max-w-sm mx-auto">
      <div className="mx-8">
        <h2 className="text-2xl leading-tight">{`Batch Upload for Residents (Moradores)`}</h2>
        <div>
          <form className="my-4" onSubmit={upload}>
            <div className="my-3">
              <FileInput
                onChange={getFile}
                label="Select a .csv file to upload"
              />
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
      </div>
    </main>
  )
}

export default ResidentsUpload
