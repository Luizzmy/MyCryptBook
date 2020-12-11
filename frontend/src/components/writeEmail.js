import React, { useState } from 'react'
import { Form, Button, Input, message} from 'antd'
import { useContextData } from '../hooks/context'
import {sendEmail} from '../services/auth'
import { useHistory } from 'react-router-dom'


function WriteEmail({userP}) {

    //Context and Useform
    const {user}=useContextData()
    const [form] = Form.useForm()

    //HandleSubmit of form
    async function handleSubmit(values) {
        const email=values
        await sendEmail(userP._id, email)
        refreshPage()
    }
    const refreshPage = ()=>{
        window.location.reload();
     }

     //Rendered
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
