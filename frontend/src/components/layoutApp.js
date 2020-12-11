import React, { useEffect } from 'react'
import { Layout, Menu, Row, Col, Typography} from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { useContextData } from '../hooks/context'
import { logoutFn } from '../services/auth'
import { HomeOutlined } from '@ant-design/icons'

//App Layout

const { Header, Content, Footer } = Layout


function LayoutApp({ children }) {

  //Context and useStory hooks
  const { user, logout } = useContextData()

  let history = useHistory()

  //HandleLogout
  async function handleLogout() {
    history.push('/')
    await logoutFn()
    logout()
  }


  //Rendered
  return (
    <div>
      <Layout className="layout" >
        <Header style={{ textAlign: "center" }} >
        
          <div className="logo" />
          <Row>
          
            <Col span={12}>
              <Menu theme="dark" mode="horizontal" selectable={false}>
              <Menu.Item key="1" icon={<HomeOutlined/>}>
                <Link to={'/'}></Link>
                </Menu.Item>
                <Menu.Item key="1" icon={<HomeOutlined />}>
                  <Link to={'/'}></Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to='/btc'>BTC</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to='/eth'>ETH</Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to='/ltc'>LTC</Link>
                </Menu.Item>
              </Menu>
            </Col>
            <Col span={12}>
              <Menu theme="dark" mode="horizontal" style={{ textAlign: "right" }} selectable={false}>
                {/* react fragments <> */}
                {!user ?
                  <>
                    <Menu.Item key="5">
                      <Link to='/login'>Login</Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                      <Link to='/signup'>Signup</Link>
                    </Menu.Item>
                  </> : null}

                {/* react fragments   <> */}
                {user ?
                  <>
                    <Menu.Item key="7">
                      <Link to='/profile'>Profile</Link>
                    </Menu.Item>
                    <Menu.Item key="8" onClick={handleLogout}>Logout </Menu.Item>
                  </> : null}

              </Menu>
            </Col>
          </Row>
          
        </Header>
        <Content style={{ padding: '10px 20px' }}>
          <div className="site-layout-content">{children}</div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>Created by <a href="https://github.com/Luizzmy" 
        target="_blank">Gabriel Valenzuela</a> & Rubén Rodríguez</Footer> 

      </Layout>
    </div>
  )
}

export default LayoutApp
