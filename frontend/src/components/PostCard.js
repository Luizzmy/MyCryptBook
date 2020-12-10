import React, { useState, useEffect } from 'react'
import { Descriptions } from 'antd'
import { Link } from 'react-router-dom'
import { Card, Avatar, Typography, Button, Modal } from 'antd'
import UpdatePostForm from '../components/UpdatePostForm'
import { useContextData } from '../hooks/context';

const { Title } = Typography



const PostCard = ({title, summary, comment, _id, userId}) => {
  let [posts, setPosts] = useState([])

const [showUptadeModal, setShowUpdateModal]=useState(false)
const { user } = useContextData()



  return (
    
    <Card
      hoverable
      
      title={<Link to={`/detail/${_id}`}>{title}</Link>}
      style={{ marginBottom: '8px',textAlign:"left" }}
      
    >
      <Link to={`/detail/${_id}`}>
       <center>
        {/* <Avatar src={image} style={{ backgroundColor: 'white' }} /> */}
        {/* <Title level={4}>Card</Title> */}
      </center>
      {summary}
      <br/>
      <br/>
      </Link>

      {user?
        user._id==userId?
        <Button type="dash" block style={{ marginBottom: "10px" }} onClick={() => setShowUpdateModal(true)}> Edit Post</Button>:"":""} 
      

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
