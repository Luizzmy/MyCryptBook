import React, { useState } from 'react'
import { Form, Button, Input, Upload, Select} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios'
import { postcreate } from '../services/post'
// add cloudinary account here 
const cloudinaryAPI = 'https://api.cloudinary.com/v1_1/devykcsdg/image/upload'

const CreatePostForm = ({addPost}) => {
    const [form] = Form.useForm()
    const [img, setImg] = useState(null)
    const [loading, setLoading] = useState(null)

    async function handleSubmit(values) {

        console.log(values)
        
        const data ={
            ...values,
            image:img
        };
        console.log(data)
        const newPost = await postcreate(data)
        .catch(e=> console.log(e.response));
        await addPost(newPost.data);
        form.resetFields()
        setImg(null)

    }

    async function handleUploadFile(file) {
        setLoading(true)
        const data = new FormData()
    
        data.append('file', file)
        data.append('upload_preset','uploadcrypto')
        
    
        const { data: { secure_url } } = await axios.post(cloudinaryAPI, data)
    
        setImg(secure_url);
        setLoading(false)
      }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 3 }}>Upload</div>
        </div>
    );

    return (

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="title" label='Title:'>
            <Input />
            </Form.Item>
            <Form.Item name="image" label="Add a picture to your article:">
            <Upload
                name="image"
                showUploadList={false}
                beforeUpload={handleUploadFile}
            >
            {img ? <img src={img} style={{ width: '100%' }} /> : uploadButton}
            </Upload>
            </Form.Item>
            <Form.Item name="summary" label="Summary:">
            <Input.TextArea rows={5}/>
            </Form.Item>
            <Form.Item name="comment" label="Content:">
            <Input.TextArea rows={10}/>
            </Form.Item>
            <Button type='primary' block size='middle' htmlType='submit'>create post</Button>


        </Form>
    )
}

export default CreatePostForm

