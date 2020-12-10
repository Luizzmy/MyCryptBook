import React, {useEffect, useState} from 'react'
import {getPostDetails} from '../services/post'
import {Col, Row, Typography, Image} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const {Title, Text}=Typography

function PostDetail({
    match: { params: { postId}},
    history
    }) {

    const [postD, setPostD]=useState(null)

     useEffect(()=>{
         
         async function getDetails(){
         const {data}=await getPostDetails(postId) 
         setPostD(data)
         console.log(data)
         }

       getDetails()  
     },[])

    return (
        <Row type="flex" justify="center" align="middle">
            <Col xs={24} sm={24} md={18} lg={14} xl={14} style={{textAlign:"left"}}>
            {postD? <><br/><Title>{postD.title}</Title>
            <br/>
            <Image width={150} src={postD.image} style={{alignSelf:"center"}} />
            <br/>
            <br/>
    <Text type="secondary"><b>By:</b><Link to={`/${postD.userId._id}`}>{postD.userId.name} {postD.userId.lastname}</Link></Text>
    <br/>
    <Text type="secondary"><b>Created:</b>{postD.createdAt}UTC</Text>
    <br/>
    <br/>
            <Text type="secondary">{postD.summary}</Text>
            <br/>
            <Text type="primary">{postD.comment}</Text></>:
            <LoadingOutlined style={{ fontSize: 24 }} spin />
             }
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt natus exercitationem, perspiciatis molestias, alias cupiditate inventore quo delectus vel iste repudiandae unde corporis quam vero ab veritatis laudantium facere soluta.
            </Col>

        </Row>  
    )
}

export default PostDetail
