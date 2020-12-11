import React, {useState} from 'react'
import {Form, Button, Input, Upload} from "antd"
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons'
import { updateUserFn} from '../services/auth'
import { useContextData } from '../hooks/context'
import axios from 'axios'

// Cloudinary URL
const cloudinaryAPI= 'https://api.cloudinary.com/v1_1/devykcsdg/image/upload'


function EditProfile() {

  //UseState, Context and UseForm hooks
    const user=useContextData()
    const [img, setImg]=useState(null)
    const [loading, setLoading]=useState(null)

    const [form]=Form.useForm()

    //HandleSubmit for form
    async function handleSubmit(values){
        const userUpdated={
            ...values,
            image:img
        }
        const {data:newUser}= await updateUserFn(userUpdated)
        setImg(null)
        refreshPage()
    }

    //HandleUploadFile for image upload to cloudinary
    async function handleUploadFile(file) {
        setLoading(true)
        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset','uploadcrypto')
        const { data: { secure_url } } = await axios.post(cloudinaryAPI, data)
        setImg(secure_url);
        setLoading(false)
      }

    const refreshPage = ()=>{
      window.location.reload();
   }

   //Upload Button setup
   const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  //Rendered
    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="name" label="First Name:" 
        initialValue={user.user.name} 
        rules={[{ required: true, message: 'Please input your Name!' }, 
        { min: 3, message: 'Must be minimum 3 characters.' },]}>
          <Input />
        </Form.Item>
        <Form.Item name="lastname" label="Last Name:" 
        initialValue={user.user.lastname} 
        rules={[{ required: true, message: 'Please input your Name!' }, 
        { min: 3, message: 'Must be minimum 3 characters.' },]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email:" 
        initialValue={user.user.email} 
        rules={[{required:true, type:'email', message:'please input your email'}]}>
          <Input />
        </Form.Item>
        <Form.Item name="image" label="Image:">
        <Upload
          name="image"
          showUploadList={false}
          beforeUpload={handleUploadFile}
        >
          {img ? <img src={img} style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </Form.Item>
        <Button type="primary" block size="middle" htmlType="submit">Edit Profile</Button>
      </Form>
    )
}

export default EditProfile
