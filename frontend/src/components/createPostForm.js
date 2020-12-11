import React, { useState } from 'react'
import { Form, Button, Input, Upload} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios'
import { postcreate } from '../services/post'

// Cloudinary URL
const cloudinaryAPI = 'https://api.cloudinary.com/v1_1/devykcsdg/image/upload'

const CreatePostForm = ({addPost}) => {

    //UseState and UseForm hooks
    const [form] = Form.useForm()
    const [img, setImg] = useState(null)
    const [loading, setLoading] = useState(null)

    //HandleSubmit for form
    async function handleSubmit(values) {
        
        const data ={
            ...values,
            image:img
        };
        const newPost = await postcreate(data)
        await addPost(newPost.data);
        form.resetFields()
        setImg(null)
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

      //Upload Button setup
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 3 }}>Upload</div>
        </div>
    );

    //Rendered
    return (

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="title" label='Title:' rules={[{required:true}]}>
            <Input />
            </Form.Item>
            <Form.Item name="image" label="Add a picture to your article:">
            <Upload
                name="image"
                showUploadList={false}
                beforeUpload={handleUploadFile}
            >
            {img ? <img src={img} alt="postPic" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
            </Form.Item>
            <Form.Item 
            placeholder="Write a short summary that describes the general content of your article" 
            name="summary" label="Summary:" rules={[{required:true }]}>
            <Input.TextArea rows={5}/>
            </Form.Item>
            <Form.Item name="comment" label="Content:" 
            placeholder="Tell us everything about your idea/opinion/review!" 
            rules={[{required:true, }]}>
            <Input.TextArea rows={6}/>
            </Form.Item>
            <Button type='primary' block size='middle' htmlType='submit' 
            rules={[{required:true}]}>create post</Button>


        </Form>
    )
}

export default CreatePostForm



