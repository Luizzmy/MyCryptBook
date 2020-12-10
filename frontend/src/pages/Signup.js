import React from 'react'
import { Row, Col, Form, Input, Button, Typography, Divider, message } from 'antd'
import { signupFn } from '../services/auth'
const { Title } = Typography

const googleUrl = process.env.NODE_ENV === 'development' ?
"http://localhost:3000/auth/google" : '/auth/google'

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!'
  },
  number: {
    range: '${Password} must be between ${3} and ${5}',
  },


};



const erromessage=(errmessage)=>{
  message.error(errmessage)
}


function Signup({ history }) {
    const [form] = Form.useForm()



    async function handleSubmit(userInput) {
      
        await signupFn(userInput)
        .catch(err=>{
          const errorInfo=err.response.data.message
          erromessage(errorInfo)
          history.push('/signup')
        },
        history.push('/login'))
        
    }
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };


    return (
        <Row type="flex" justify="center" align="middle">
      <Col xs={24} sm={24}md={12}lg={8}>
        <Title level={1}>Signup</Title>
      <Divider />
      <div >
        <Form layout="vertical" form={form} onFinish={handleSubmit} validateMessages={validateMessages}>
          <Form.Item name='email' label="Email:" rules={[{required:true, type:"email"}]}>
            <Input />
          </Form.Item>
          <Form.Item name='password' label="Password:" rules={[{ required: true, message: 'Please input your username!' }, { min: 5, message: 'Password must be minimum 5 characters.' },]} >
            <Input.Password />
          </Form.Item>
          <Button type="primary" block htmlType="submit">
            Signup
          </Button>
        </Form>
        <Divider>
          Or
        </Divider>
        <a href={googleUrl}>
          <Button block>Signup with Google</Button>
        </a>
        </div>
      </Col>
    </Row>
    )
}

export default Signup
