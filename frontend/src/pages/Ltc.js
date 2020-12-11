import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {getReco} from '../services/recomendation'
import {VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryVoronoiContainer,
  VictoryTooltip} from 'victory'
import { Spin, Row, Col,List, Avatar, Typography, Button, Modal, Menu, Dropdown, message, Space, Tooltip, DatePicker } from 'antd';
import { LoadingOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import { useContextData } from '../hooks/context';
import EditRecomForm from '../components/EditRecomForm'

import CreateRecomForm from '../components/createRecomForm'
import { Link } from 'react-router-dom';

//URLs for APIs

let newsURL='https://feed.cryptoquote.io/api/v1/news/headlines?search=LTC&key=778fae00-359b-11eb-a7c8-83b5e7f8291c'

//Other const to be used in content of page
const curr="LTC"
const {Text}=Typography


//Date fields need a paid version of the API used for prices, for now using the free version. 
// let today=new Date()
// let yesterday=new Date(today)
// yesterday.setDate(yesterday.getDate()-1)

// function convert(date){
// let time_converted=date.getFullYear()+"-"+
// (date.getMonth()<10? (('0'+date.getMonth()).substring(-2)):(date.getMonth()))+"-"+
// (date.getDate()<10? (('0'+date.getDate()).substring(-2)):(date.getDate()))+"T"+
// (date.gLTCours()<10? (('0'+date.gLTCours()).substring(-2)):(date.gLTCours()))+":"+
// (date.getMinutes()<10? (('0'+date.getMinutes()).substring(-2)):(date.getMinutes()))+":"+
// (date.getSeconds()<10? (('0'+date.getSeconds()).substring(-2)):(date.getSeconds()))
// return time_converted
// }

// let time_end= convert(today)
// let time_start=convert(yesterday)


function Ltc() {
  let periodId="1HRS"
  //initial useState hooks
  const [Litecoins, setLitecoin]=useState(null)
  const [LitecoinsNews, setLitecoinNews]=useState(null)
  const [recoms, setRecoms]=useState([])
  const [showModal, setShowModal]=useState(false)
  const [showEditModal, setShowEditModal]=useState(false)
  const [itemEdit, setItemEdit]=useState(false)
  const [period_id, setPeriod]=useState(periodId)
  const [changed, setChanged]=useState(false)


  //User context data
  const { user } = useContextData()

  
  

  let priceURL= 'https://rest-sandbox.coinapi.io/v1/ohlcv/GEMINI_SPOT_LTC_USD/latest?period_id='
  

  //useEffect hook for initial REST get API functions
   useEffect(()=>{

    
//https://rest.coinapi.io/v1/ohlcv/GEMINI_SPOT_LTC_USD/history?period_id=1DAY&time_start=2016-01-01T00:00:00&time_end=2020-01-01T00:00:00
    
     async function getLitecoin(){
       const {data}=await axios.
       get(priceURL+period_id, 
        {headers:{'X-CoinAPI-Key': "977F32DF-8B2A-4AB3-B2EC-6997426FE65D" }})
        
       setLitecoin(data.reverse())
     }
     
     async function getNews(){
       const {data}=await axios.get(newsURL)
       setLitecoinNews(data)
       
     }
     async function getRecoms(){
       const {data}=await getReco()
       console.log(data)
      //  setReco(data)
       setRecoms(data.
        filter(r=>r.crypto=="LTC")
        .sort((a,b)=>(a.createdAt<b.createdAt)?1:-1)
        .slice(0,3))

     }
     
     getLitecoin()
     getNews()
     getRecoms()
   },[])
   
   //LTCRecoms array declaration
    const LTCrecoms={'LTC':[]}

    //Add recom to array of recoms
    function addRecom(recom){
      setRecoms([recom,...recoms])
      setShowModal(false)
    }

    //Iterate over LTCrecoms array to show new one
    recoms.forEach(recom=>{
      LTCrecoms[recom.crypto]=[...LTCrecoms[recom.crypto],recom]
    })
    
    //Load one more recom in the page
    async function onLoadMore(){
      const {data}=await getReco()
       let rest=data.
       filter(r=>r.crypto=="LTC")
       .sort((a,b)=>(a.createdAt<b.createdAt)?1:-1).slice(recoms.length-1)
       recoms.push(rest[0])
      setRecoms([...recoms])
    }

    //LoadMore button style and specs
    const loadMore=( <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button className onClick={onLoadMore}>More</Button>
    </div>)

    useEffect(() => {
      async function getLitecoin(period){
        console.log(period)
        const {data}=await axios.
        get(priceURL+period, 
         {headers:{'X-CoinAPI-Key': "977F32DF-8B2A-4AB3-B2EC-6997426FE65D" }})
         
        setLitecoin(data.reverse())
      }
      getLitecoin(period_id)
      setChanged(false)
    }, [changed])

function handleMenuClick(e) {
  setPeriod(e.key)
  setChanged(true)
}


const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1MIN">
      1MIN
    </Menu.Item>
    <Menu.Item key="15MIN">
      15MIN
    </Menu.Item>
    <Menu.Item key="30MIN">
      30MIN
    </Menu.Item>
    <Menu.Item key="1HRS">
      1HRS
    </Menu.Item>
    <Menu.Item key="12HRS">
      12HRS
    </Menu.Item>
    <Menu.Item key="1DAY">
      1DAY
    </Menu.Item>
    <Menu.Item key="7DAY">
      7DAY
    </Menu.Item>
    <Menu.Item key="1MTH">
      1MTH
    </Menu.Item>
  </Menu>
);
  return (
    <div>

      <Row gutter={30}>
        <Col span={14} style={{padding:"0 20px"}}>
          <div>

            {/*-----Chart with historical prices-----*/}
            <Space wrap>
            <Tooltip placement="topLeft" title="Quotes frequency in the graph">
    <Dropdown overlay={menu}>
      <Button>
        {period_id} <DownOutlined />
      </Button>
    </Dropdown>
    </Tooltip>
  </Space>
      {Litecoins?
      <VictoryChart
      height={200}
      containerComponent={<VictoryVoronoiContainer
        labels={({ datum }) => `$${datum.y}, ${datum.x.slice(0,16)} UTC `}
        labelComponent={
          <VictoryTooltip  dy={-1} constrainToVisibleArea />
        }
      />
      }
      >
        <VictoryLabel text="LTC/USD Price" x={225} y={30} textAnchor="middle"/>
      <VictoryAxis dependentAxis/>
      <VictoryLine
        style={{
          data: { stroke: "#c43a31" },
          parent: { border: "1px solid #ccc"}
        }}
        data={Litecoins.map(b=>({x:b.time_close,y:b.price_close}))}
      />
    </VictoryChart>: <LoadingOutlined style={{ fontSize: 24 }} spin />
    }

    {/*-----Add a new recomendation button and modal for creating a new one-----*/}
    <Button 
    type="primary" 
    block size="middle" 
    onClick={() => setShowModal(true)}>Click here to make a recomendation!
    </Button>
    <Modal
        visible={showModal}
        title="Make a recomendation!"        
        footer={null}
        onCancel={() => setShowModal(false)}
      >
        <CreateRecomForm addRecom={addRecom} curr={curr}/>
      </Modal>

      {/*----List of most recent recomendations from newest to oldest----*/}
    {user? recoms?   <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={recoms}
      renderItem={item => (
      <List.Item 
      
      actions={user? 
        item.userId._id==user._id?
          [<a key="list-loadmore-edit" 
            onClick={() => [
              setShowEditModal(true), 
              setItemEdit(item)]
              }
            >edit</a>
          ]:
          [<Text type="secondary"><b>By:</b><Link to={`/${item.userId._id}`}>{item.userId.name ? item.userId.name : item.userId._id}  </Link></Text>  ]:""}
      >
            <List.Item.Meta
              avatar={
                // <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <Avatar size={80} src={item.userId ? item.userId.image : ""}/>

              }
              title={item.title}
              description={`Created: ${item.createdAt.slice(5,16)} | Estimate: ${item.estimate} | Actual: ${item.actual} | Surprise: ${item.surprise}`}
            />
            <p>Recomendation: {item.recomendation}</p>
            
           

    
        </List.Item>
      )
    } 
    />
    :<LoadingOutlined style={{ fontSize: 24 }} spin />:<div style={{textAlign:"center"}}>
    <br/>
    <Text type="primary">You need to be logged in to see recomendations</Text>
    <br/>
    <Text type="secondary">
      <Link to={'/login'}>Login</Link>, or 
      <Link to={'/signup'}>Signup</Link> if you don't have an account yet
    </Text>

    </div>
  }
    {/*-----Modal for editing recomendation (only available for recom creator)-----*/}
      <Modal
        visible={showEditModal}
        title="Edit"
        footer={null}
        onOk={() => setShowEditModal(false)}
        onCancel={() => setShowEditModal(false)}
      >
        <EditRecomForm item={itemEdit} curr={curr}/>
      </Modal> 
      </div>
    </Col>
    <Col span={10} style={{padding:"30px 10px 30px 0"}}>

      {/*-----Litecoins news list from most recent-----*/}
          {LitecoinsNews?
          <List
          itemLayout="vertical"
          size="small"
          pagination={{
            onChange: page => {
            },
            pageSize: 3,
            showLessItems:true
          }}
          dataSource={LitecoinsNews}
          renderItem={item => (
            <List.Item
              key={item.headline}
              extra={
                <img
                  width={75}
                  alt="logo"
                  src={item.metaData.photo}
                />
              }
            >
              <List.Item.Meta
                title={<a href={item.link} target="_blank">{item.headline}</a>}
                description={item.summary.length>100?
                   `${item.summary.substring(0,100)}...`:item.summary}
                   style={{textAlign:"right"}}
              />
              <Text type="secondary" style={{fontSize:10}}><b>Source:</b> {item.provider}</Text>
            </List.Item>
          )}
        />:<LoadingOutlined style={{ fontSize: 24 }} spin />
          }
        </Col>
  </Row>
    </div>
  );
}

export default Ltc;