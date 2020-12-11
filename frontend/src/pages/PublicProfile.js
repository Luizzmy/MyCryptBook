import React, {useEffect, useState} from 'react'
import { Row, Col, Typography, Card, Button, Modal, Avatar } from 'antd'
import { useContextData } from '../hooks/context'
import { getUserPost } from '../services/post'
import PostCard from '../components/PostCard'
import { userDetails } from '../services/auth'
import WriteEmail from '../components/writeEmail'

const { Title, Text } = Typography

function PublicProfile({
    match: { params: { userId}},
    history
    }) {

    const {user}=useContextData()

    const[showModal, setShowModal]=useState(false)


    const [userP, setUserP]= useState()

    useEffect(()=>{

        async function getUserD(){
            const {data}=await userDetails(userId)
            setUserP(data)
            console.log(data)
        }

        getUserD()
    },[])
    
    
    
    return (userP?
        <Row  gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12}>
            <Card title="Profile">
          <Avatar size={80} src={userP.image}/>
          {userP.name?
          <>
          <Title type="primary">{userP.name}</Title>
          <br/>
          <br/>
          </>
          :<>
          <Text type="secondary">This user has not added any personal details yet</Text>
          <br/>
          <br/></>
          }
          <Button type="primary" onClick={()=>setShowModal(true)}>Contact by email</Button>
          <Modal visible={showModal}
        title="Send Email"
        footer={null}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
      >
        <WriteEmail userP={userP}/>
      </Modal>
        </Card>
            </Col>
            <Col xs={24} sm={24} md={12}>
        <Card title="Posts">
          {userP? 
            userP.posts ?  
                userP.posts
                .map(post => <PostCard key={post._id} {...post} />) : "loading":"loading"}

        </Card>
      </Col>
        </Row>
        :"loading"
    )
}

export default PublicProfile
