import React from 'react';
import type { MenuProps } from 'antd';
import { UserOutlined} from '@ant-design/icons';
import { Layout, Menu, Card } from 'antd';

import {Outlet,useNavigate} from 'react-router-dom'
const { Header, Sider, Content, Footer } = Layout;


const items: MenuProps['items'] =[{
  key: '/',
  icon: React.createElement(UserOutlined),
  label: `home`,
},
{
  key: '/list',
  icon: React.createElement(UserOutlined),
  label: `list`,
},
]

export default function MyLayout() {
  const nav=useNavigate()
  const onClick = ({ key }: any) => {
    nav(key)
  }
  return (
      <Layout>
        <Header>header</Header>
        <Layout style={{minHeight:'calc(100vh - 64px)'}}>
          <Sider >
            <Menu
              mode="inline"
              theme="dark"
              onClick={onClick}
              defaultSelectedKeys={['home']}
              style={{ height: '100%', borderRight: 0 }}
              items={items}
            />
          </Sider>
          <Content>
            <Card style={{overflowY:"scroll", margin: '14px', height: 'calc(100vh - 92px)' }}>
              <Outlet />
            </Card>
          </Content>
        </Layout>
        {/* <Footer style={{ background: '#fff', marginTop: '14px' }}>123</Footer> */}
      </Layout>
  );
}
