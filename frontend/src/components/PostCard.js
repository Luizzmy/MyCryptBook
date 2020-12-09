import React, { useState, useEffect } from 'react'
import { Descriptions } from 'antd'
import { Link } from 'react-router-dom'
import { Card, Avatar, Typography, Button, Modal } from 'antd'
import UpdatePostForm from '../components/UpdatePostForm'

const { Title } = Typography



const PostCard = ({title, summary, comment, _id}) => {
  let [posts, setPosts] = useState([])

const [showUptadeModal, setShowUpdateModal]=useState(false)



  return (
    <Card
      type="inner"
      title={title}
      // extra={<Link to={`/PostDetail/${_id}`}>  Update / Delete</Link>} //how to link it???
      style={{ marginBottom: '8px' }}
      hoverable
    >
       <center>
        {/* <Avatar src={image} style={{ backgroundColor: 'white' }} /> */}
        {/* <Title level={4}>Card</Title> */}
      </center>
      {comment}
      <br/>
      <br/>
      <Button type="dash" block style={{ marginBottom: "10px" }} onClick={() => setShowUpdateModal(true)}> Update a Post!!!</Button>

      <Modal visible={showUptadeModal}
        footer={null}
        width={1000}
        title="Update a new post"
        onOk={() => setShowUpdateModal(false)}
        onCancel={() => setShowUpdateModal(false)}
      >
        <UpdatePostForm title={title} summary={summary} comment={comment} _id={_id} />

      </Modal>


    </Card>
    
    
  )
}

export default PostCard
