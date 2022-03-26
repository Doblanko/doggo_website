import { useState } from "react"

const UploadForm = () => {
    const [caption, setCaption] = useState("");
    const [file, setFile] = useState();

    const handleSubmit = () => {

    }

    return (
        <form>
            <h1>Create New Post</h1>
            <input
              type='text'
              value={caption}
              onChange={(e) => setCaption(e.target.value)}  
            />
            <input
              type='file'
              value={file}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type='submit'>Upload</button>
        </form>
    )
}

export default UploadForm;