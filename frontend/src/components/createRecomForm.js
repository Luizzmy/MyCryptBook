import React from 'react'
import { Form, Button, Input, InputNumber, Select} from "antd"
import { recoCreate } from '../services/recomendation'

const CreateRecomForm = ({ addRecom, curr }) => {
  //UseState and UseForm hooks
  const [form] = Form.useForm()

  //HandleSubmit for form
  async function handleSubmit(values) {
    const recom = {
      ...values,
      crypto: curr
    }
    const { data: newRecom } = await recoCreate(recom)
    addRecom(newRecom)
    form.resetFields()
  }


  //Rendered
  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="title" label="Title:" rules={[{ required: true, }]}>
        <Input placeholder="E.g 1 day price objective" />
      </Form.Item>
      <Form.Item placeholder="Price estimate" name="estimate" label="Price estimate:" 
      rules={[{ required: true, message: 'number required' }, { type: "number" },]}>
        <InputNumber min={1} max={999999}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value
            .replace(/\$\s?|(,*)/g, '')} />
      </Form.Item>
      <Form.Item placeholder="Current price" name="actual" label="Actual price:" 
      rules={[{ required: true, message: 'number required' }, { type: "number" },]}>
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
      <Button type="primary" block size="middle" htmlType="submit">Add Recomendation</Button>
    </Form>
  )
}

export default CreateRecomForm


