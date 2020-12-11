import React from 'react'
import { Row, Col, Form, Input, Button, Typography, Divider, message } from 'antd'
import { loginFn } from '../services/auth'
import { useContextData } from '../hooks/context'

const { Title } = Typography

const googleUrl = process.env.NODE_ENV === 'development' ?
  "http://localhost:3000/auth/google" : '/auth/google'

  const errormessage=(errmessage)=>{
    message.error(errmessage)
  }

const Login = ({ history }) => {
  const [form] = Form.useForm()
  const { login } = useContextData()

  async function handleSubmit(userInput) {
    const  data  = await loginFn(userInput)
    .then(data=>{
      login({data})
      history.push('/')
      history.go(0)
      
    })
    .catch(err=>{
      const errorInfo=err.response.data.message
      errormessage(errorInfo)
    })
   
  }
  return (
    <Row type="flex" justify="center" align="middle">      
      <Col xs={24} sm={24}md={12}lg={8}>
        <Title level={1}>Login</Title>
        <Divider />
      <div style={{justifyContent:"center"}}>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item name='email' label="Email:" rules={[{required:true, type:'email', message:'please input your email'}]}>
            <Input />
          </Form.Item>
          <Form.Item name='password' label="Password:" rules={[{required:true, message:'password is required'}]}>
            <Input.Password />
          </Form.Item>
          
          <Button type="primary" block htmlType="submit">
            Login
          </Button>

        </Form>
        <Divider>
          Or
        </Divider>
        <a href={googleUrl}>
          <Button block>Login with Google</Button>
        </a>
        </div>
      </Col>
    </Row>
  )
}

export default Login