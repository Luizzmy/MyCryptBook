import React, { useState } from 'react'
import { Form, Button, Input, Upload, Select, message} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useContextData } from '../hooks/context'
import axios from 'axios'
import {sendEmail} from '../services/auth'
import { useHistory } from 'react-router-dom'

const messagetext=()=>{
    message.error("Email sent")
  }

function WriteEmail({userP}) {

    const {user}=useContextData()

    const history = useHistory()

    const [form] = Form.useForm()
    const [loading, setLoading]=useState(null)

    async function handleSubmit(values) {
        console.log(userP._id)
        
        
        const email=values

        console.log(email)
      
        await sendEmail(userP._id, email)
        refreshPage()

    }

    const refreshPage = ()=>{
        window.location.reload();
     }

    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="sender" label='From:' initialValue={user.email} disabled>
            <Input disabled/>
        </Form.Item>
        <Form.Item name="email" label="To:" initialValue={userP.email}>
        <Input  disabled/>
        </Form.Item>
        <Form.Item name="body" label="Message:">
        <Input.TextArea rows={5}/>
        </Form.Item>

        <Button type="primary" htmlType="submit" block>Send Email</Button>


    </Form>
    )
}

export default WriteEmail
