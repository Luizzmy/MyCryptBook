import React, {useState} from 'react'
import axios from 'axios'
import {useContextData} from '../hooks/context'

function UploadProfilePic() {
const [image,setImage]= useState(null)
const {addProfilePic}= useContextData()

const handleSubmit= e=>{
    e.preventDefault()
    addProfilePic(image)
}

const handleUploadPhoto = async ({target: {files}}) =>{

    const cloudinaryAPI= 'https://api.cloudinary.com/v1_1/devykcsdg/image/upload'

    const data=new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'uploadcrypto')

    const {data:{secure_url}}= await axios.post(cloudinaryAPI, data)
    setImage(secure_url)
    
}

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <input type="file" name="profile-pic" id="profile-pic" onChange={handleUploadPhoto}/>
            <button type="submit" disabled={!image}>Upload</button>
        </form>
            
        </div>
    )
}

export default UploadProfilePic
