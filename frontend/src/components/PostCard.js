import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Modal } from 'antd'
import UpdatePostForm from '../components/UpdatePostForm'
import { useContextData } from '../hooks/context';


const PostCard = ({title, summary, comment, _id, userId}) => {

  //UseState and Context hooks
const [showUptadeModal, setShowUpdateModal]=useState(false)
const { user } = useContextData()

//Rendered
  return (
    <Card
      hoverable
      title={<Link to={`/detail/${_id}`}>{title}</Link>}
      style={{ marginBottom: '8px',textAlign:"left" }}
    >
      <Link to={`/detail/${_id}`}>
      {summary}
      <br/>
      <br/>
      </Link>
      {user?
        user._id==userId?
        <Button type="dash" block style={{ marginBottom: "10px" }} 
        onClick={() => setShowUpdateModal(true)}> Edit Post</Button>:"":""} 
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
