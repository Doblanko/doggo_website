import { useState } from "react"
import { useAuthContext } from "./AuthProvider";

const UploadForm = () => {
    const [caption, setCaption] = useState("");
    const [file, setFile] = useState("");
    const { token } = useAuthContext();

    const handleSubmit = async (event) => {
      // have to explicitly call preventDefault in functional components
      event.preventDefault();

      const formData = new FormData();
      formData.append('file', file)

      // don't set the Content-Type Header. The browser will set it for you.
      const response = await fetch('http://localhost:3000/posts/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': token 
      }
      })

      const dataJSON = await response.json()
      console.log(dataJSON)
    }

    /**
     * Can't set value of file input. <input type='file'/> is always an
     * uncontrolled component because its value can only be set by a user and
     * not programmatically. This is a security feature to ensure that you can't
     * pull data from a users disk without them specifically choosing to do so.
     */
    return (
        <form onSubmit={handleSubmit}>
            <h1>Create New Post</h1>
            <input
              type='text'
              value={caption}
              onChange={(e) => setCaption(e.target.value)}  
            />
            <input
              type='file'
              name='img'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type='submit'>Upload</button>
        </form>
    )
}

export default UploadForm;