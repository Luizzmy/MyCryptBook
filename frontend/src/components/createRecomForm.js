import React, { useState } from 'react'
import { Form, Button, Input, InputNumber, Select, Upload } from "antd"
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { recoCreate } from '../services/recomendation'
import axios from 'axios'

const cloudinaryAPI= 'https://api.cloudinary.com/v1_1/devykcsdg/image/upload'


const CreateRecomForm = ({ addRecom, curr }) => {
  const [form] = Form.useForm()
  const [img, setImg]=useState(null)
    const [loading, setLoading]=useState(null)

  async function handleSubmit(values) {
    console.log(values)

    const recom = {
      ...values,
      crypto: curr
    }

    const { data: newRecom } = await recoCreate(recom)
    addRecom(newRecom)
    form.resetFields()
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
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  // rules={[{ required: true, message: 'Please input your username!' }, { min: 5, message: 'Username must be minimum 5 characters.' },]}

  // { min:1, message: 'must be minimum 1' }, { max:999999, message: 'must be maximun 999,999' }


  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="title" label="Title:" rules={[{ required: true, }]}>
        <Input placeholder="E.g 1 day price objective" />
      </Form.Item>
      <Form.Item placeholder="Price estimate" name="estimate" label="Price estimate:" rules={[{ required: true, message: 'number required' }, { type: "number" },]}
      >
        <InputNumber min={1} max={999999}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value
            .replace(/\$\s?|(,*)/g, '')} />
      </Form.Item>
      <Form.Item placeholder="Current price" name="actual" label="Actual price:" rules={[{ required: true, message: 'number required' }, { type: "number" },]}>
        <InputNumber min={1} max={999999}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value
            .replace(/\$\s?|(,*)/g, '')} />
      </Form.Item>
      <Form.Item placeholder="Surprise" name="surprise" label="Surprise price:" rules={[{ required: true, message: 'number required' }, { type: "number" },]}>
        <InputNumber min={1} max={999999}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value
            .replace(/\$\s?|(,*)/g, '')} />
      </Form.Item>
      <Form.Item name="crypto" label="Crypto:">
        <Input defaultValue={curr} disabled />
      </Form.Item>
      <Form.Item name="recomendation" label="Recomendation:" rules={[{ required: true, }]}>
        <Select>
          <Select.Option value="Buy">Buy</Select.Option>
          <Select.Option value="Sell">Sell</Select.Option>
          <Select.Option value="Hold">Hold</Select.Option>
        </Select>
      </Form.Item>
      {/* <Form.Item name="image" label="Image:">
        <Upload
          name="image"
          showUploadList={false}
          beforeUpload={handleUploadFile}
        >
          {img ? <img src={img} style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </Form.Item> */}

      <Button type="primary" block size="middle" htmlType="submit">Add Recomendation</Button>
    </Form>
  )
}

export default CreateRecomForm


