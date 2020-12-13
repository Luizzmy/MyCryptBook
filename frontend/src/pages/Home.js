import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { LoadingOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Row, Col, List, Typography, Card, Statistic, Image } from 'antd';
import { useContextData } from '../hooks/context';
import { getUserPost } from '../services/post'
import { Link } from 'react-router-dom';

//URLs for external APIs
let newsURL = 'https://feed.cryptoquote.io/api/v1/news/headlines?key=778fae00-359b-11eb-a7c8-83b5e7f8291c'
let statsURL = "https://feed.cryptoquote.io/api/v1/stats"
const { Text, Title } = Typography

function Home() {
  //User context data

  const { user } = useContextData()

  //initial useState hooks
  const [news, setNews] = useState(null)
  const [bitcoinP, setBitcoinP] = useState(null)
  const [litecoinP, setLitecoinP] = useState(null)
  const [ethereumP, setEthereumP] = useState(null)
  const [posts, setPosts] = useState(null)

  //useEffect hook for initial REST get API functions
  useEffect(() => {

    async function getNews() {
      const { data } = await axios.get(newsURL)
      setNews(data)
    }

    async function getBitcoinP() {
      const { data: btcData } = await axios.get(statsURL + "/btcusd.gemini?key=778fae00-359b-11eb-a7c8-83b5e7f8291c")
      setBitcoinP(btcData[0])
    }

    async function getLitecoinP() {
      const { data: ltcData } = await axios.get(statsURL + "/ltcusd.bitstamp?key=778fae00-359b-11eb-a7c8-83b5e7f8291c")
      setLitecoinP(ltcData[0])
    }

    async function getEthereumP() {
      const { data } = await axios.get(statsURL + "/ethusd.bitstamp?key=778fae00-359b-11eb-a7c8-83b5e7f8291c")
      setEthereumP(data[0])
    }

    async function getPosts() {
      const { data } = await getUserPost()
      setPosts(data.reverse()
        .slice(0, 4))
    }

    const intervalId = setInterval(e => {
      getBitcoinP()
      getLitecoinP()
      getEthereumP()


    }, 500)

    getNews()
    getPosts()
    return _ => clearInterval(intervalId)
  }, [])

  return (
    <div>
      <div>
        <Row>
          <Col xs={0} sm={0} md={12} >
            <Text type="primary">Last prices</Text>
          </Col>
          <Col xs={0} sm={0} md={12} >
            <Text type="primary">24hr changes</Text>
          </Col>
        </Row>
        <Row style={{ justifyContent: "space-around" }}>
          <Col sm={24} md={12}>
            <div style={{ display: "flex" }}>
              <Statistic
                title="BTC"
                prefix="$"
                suffix="USD"
                value={bitcoinP ? bitcoinP.last : "-"}
                style={{
                  margin: '0 32px',
                }}
              />
              <Statistic
                title="LTC"
                prefix="$"
                suffix="USD"
                value={litecoinP ? litecoinP.last : "-"}
                style={{
                  margin: '0 32px',
                }}
              />
              <Statistic
                title="ETH"
                prefix="$"
                suffix="USD"
                value={ethereumP ? ethereumP.last : "-"}
                style={{
                  margin: '0 32px',
                }}
              />
            </div>
          </Col>

          <Col sm={24} md={10}>
            <div style={{ display: "flex" }}>
              <Statistic
                title="BTC"
                value={bitcoinP ? bitcoinP.change.percentage : "-"}
                precision={2}
                valueStyle={bitcoinP ? bitcoinP.change.percentage > 0 ? { color: "#3f8600" } : { color: '#cf1322' } : {}}
                prefix={bitcoinP ? bitcoinP.change.percentage > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined /> : ""}
                suffix="%"
                style={{
                  margin: '0 32px',
                }}
              />
              <Statistic
                title="LTC"
                suffix="%"
                value={litecoinP ? Math.round(litecoinP.change.percentage * 100) / 100 : "-"}
                style={{
                  margin: '0 32px',
                }}
                valueStyle={litecoinP ? litecoinP.change.percentage > 0 ? { color: "#3f8600" } : { color: '#cf1322' } : {}}
                prefix={litecoinP ? litecoinP.change.percentage > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined /> : ""}
              />
              <Statistic
                title="ETH"
                suffix="%"
                value={ethereumP ? Math.round(ethereumP.change.percentage * 100) / 100 : "-"}
                style={{
                  margin: '0 32px',
                }}
                valueStyle={ethereumP ? ethereumP.change.percentage > 0 ? { color: "#3f8600" } : { color: '#cf1322' } : {}}
                prefix={ethereumP ? ethereumP.change.percentage > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined /> : ""}
              />
            </div>
          </Col>
        </Row>
      </div>

      <Row>
        <Col span={18} style={{ padding: "20px 0 0 30px", justifyContent: "center" }}>
          {news ? <List
            grid={{ lg: 1, xl: 2 }}
            itemLayout="horizontal"
            pagination={{
              onChange: page => {
              },
              pageSize: 2,
              showLessItems: true
            }}
            dataSource={news}
            renderItem={i => (
              <a href={i.link} target="_blank" rel="noreferrer">
                <List.Item>
                  <Card
                    key={i.id}
                    hoverable
                    style={{ width: "27.5rem", margin: "5px", height: "30rem" }}
                    cover={<img alt="newsPic" src={i.metaData.photo} style={{ height: "18rem", width: "offset" }} />}
                  >
                    <Title type="primary" style={{ fontSize: 20 }}>{i.headline}</Title>
                    <Text type="secondary">{i.summary ? i.summary.length > 100 ?
                      `${i.summary.substring(0, 100)}...` : i.summary : ""}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 10 }}><b>Source:</b> {i.provider}</Text>
                  </Card>
                </List.Item>
              </a>
            )}
          /> : <LoadingOutlined style={{ fontSize: 24 }} spin />
          }
        </Col>
        <Col span={6} style={{ padding: "15px 10px 30px 0", justifyContent: "left" }}>
          <Title type="primary" style={{ textAlign: "right" }}>Latest Articles</Title>
          {user ? posts ?
            <List
              itemLayout="vertical"
              size="large"
              dataSource={posts.slice(0, 3)}
              renderItem={i => (
                <a href={`/detail/${i._id}`}>
                  <List.Item
                    key={i._id}
                  >
                    <List.Item.Meta
                      title={i.title}
                      description={i.summary ? i.summary.length > 100 ?
                        `${i.summary.substring(0, 100)}...` : i.summary : ""}
                      style={{ textAlign: "right" }}
                    />
                  </List.Item>
                </a>
              )}
            /> : <LoadingOutlined style={{ fontSize: 24 }} spin />
            : <div style={{ textAlign: "center" }}>
              <br />
              <Text type="primary">You need to be logged in to read any articles</Text>
              <br />
              <Text type="secondary">
                <Link to={'/login'}>Login</Link>, or
    <Link to={'/signup'}> Signup</Link> if you don't have an account yet
  </Text>

            </div>
          }
        </Col>
      </Row>
      <Row>

      </Row>
      <br />
      <Row gutter={[16, 16]}>
        <Col span={8} >
          <Card >
            <Image
              width={300}
              height={200}
              src="https://i1.wp.com/paxandpeace.com/wp-content/uploads/2019/12/AdobeStock_103422353.jpeg"
            />
            <Title type="primary">Suscríbete</Title>
            <Text type="secondary"> Descubre el mundo cripto. Aprende a usar bitcoin y otras criptomonedas.</Text>
            <br />
            <br />
            <Link to='/signup'>Crea tu cuenta aquí</Link>
            <br/>
            <br/>
          </Card>
        </Col>
        <Col span={8}>
          <Card >
          <Image
              width={300}
              height={200}
              src="https://blogs.airdropalert.com/wp-content/uploads/2019/01/as_nl_4_2.jpg"
            />
            <Title type="primary">Entra en nuestra comunidad</Title>
            <Text type="primary">Comparte recomendaciónes, haz crecer la comunidad crypto!</Text>
            <br />
            <Link to='/btc'>Haz tu recomendaciónes</Link>
          </Card>
        </Col>
        <Col span={8}>
          <Card >
          <Image
              width={300}
              height={200}
              src="https://coinrevolution.com/wp-content/uploads/2020/07/crypto-news.jpg"
            />
            <Title type="primary">MyCryptBook</Title>
            <Text type="primary">Las noticias y análisis que necesitas en MyCryptBook. 
              
            <br/> Aprende sobre bitcoin y otras criptomonedas.
            <br/>Hacemos de las cripto algo sencillo</Text>
            <br />
            <br />
            
          </Card>
        </Col>

      </Row>

    </div>
  );
}

export default Home;
