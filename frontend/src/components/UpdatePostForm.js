import React, { useState, useEffect } from 'react'
import { postUpdate, postDelete } from '../services/post'
import { Form, Button, Input, Modal, Upload } from 'antd'
import { useHistory } from 'react-router-dom'
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons'
import axios from 'axios'

const cloudinaryAPI= 'https://api.cloudinary.com/v1_1/devykcsdg/image/upload'


const UpdatePostForm = ({ post, title, summary, comment, _id }) => {
    
    const [form] = Form.useForm()
    const history = useHistory()
    const [img, setImg]=useState(null)
    const [loading, setLoading]=useState(null)

    async function handleSubmit(values) {
        console.log(_id)
        const postUpdated={
            ...values,
            image:img
        }
      
        const {data:newPost}=await postUpdate(_id, postUpdated)
        
        setImg(null)
        refreshPage()

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

    const refreshPage = ()=>{
      window.location.reload();
   }

   const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );


    async function handleDelete() {
        await postDelete(_id)
        refreshPage() //place to go.
    }


    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="title" label='Title:' initialValue={title}>
                <Input />
            </Form.Item>
            <Form.Item name="image" label="Add a new picture to your article:">
            <Upload
                name="image"
                showUploadList={false}
                beforeUpload={handleUploadFile}
            >
            {img ? <img src={img} style={{ width: '100%' }} /> : uploadButton}
            </Upload>
            </Form.Item>
            <Form.Item name="summary" label="Summary:" initialValue={summary}>
            <Input.TextArea rows={5}/>
            </Form.Item>
            <Form.Item name="comment" label="Comment:" initialValue={comment}>
                <Input />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>Edit post</Button>
            <br />
            <br />
            <Button type="ghost" onClick={handleDelete} danger block>Delete post</Button>




        </Form>
    )
}

export default UpdatePostForm




