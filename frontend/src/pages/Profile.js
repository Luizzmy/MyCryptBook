
import React, { useState, useEffect } from 'react'
import { Row, Col, Typography, Card, Button, Modal, Avatar } from 'antd'
import { useContextData } from '../hooks/context'
import { getUserPost } from '../services/post'
import PostCard from '../components/PostCard'
import CreatePostForm from '../components/createPostForm'
import EditProfile from '../components/editProfile'



const { Title, Text } = Typography

const Profile = () => {
  const { user } = useContextData()
  let [posts, setPosts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showEditProfile, setShowEditProfile]=useState(false)



  useEffect(() => {
    async function getPosts() {
      const { data } = await getUserPost()
      //const postsF=data
      setPosts(data.reverse());

    }

    getPosts()
  }, [])


  function addPost(post) {
    setPosts([post, ...posts])
    setShowModal(false)

  }



  return ( user?
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={12}>
        <Card title="Profile">
          <Avatar size={80} src={user.image}/>
          {user.name?
          <>
          <Title type="primary">Hi {user.name}</Title>
          <Text type="primary">Welcome to your profile</Text>
          <br/>
          <br/>
          </>
          :<><Title type="primary">Welcome to your profile</Title>
          <Text type="secondary">Please provide us with your personal details before posting or making any recommendations</Text>
          <br/>
          <br/></>
          }

          <Button type="primary" onClick={()=>setShowEditProfile(true)}>Edit profile</Button>
          <Modal visible={showEditProfile}
        title="Update a new post"
        footer={null}
        onOk={() => setShowEditProfile(false)}
        onCancel={() => setShowEditProfile(false)}
      >
        <EditProfile/>
      </Modal>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12}>
        <Card title="Posts">
          <Button type="dash" block style={{ marginBottom: "10px" }} onClick={() => setShowModal(true)}> Write an article!</Button>
          {user? 
            posts ?  
                posts.filter(post=> post.userId===user._id)
                .map(post => <PostCard key={post._id} {...post} />) : "loading":"loading"}

        </Card>
      </Col>
      <Modal visible={showModal}
        width={1000}
        footer={null}
        title="Write an article!"
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
      >
        <CreatePostForm addPost={addPost} />

      </Modal>
    </Row>
  :"loading")
}

export default Profile

