import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import '../static/pages/AdminIndex.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddArticle from './AddArticle';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex() {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className='logo' />
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
          <Menu.Item key='1'>
            <PieChartOutlined />
            <span>工作台</span>
          </Menu.Item>
          <Menu.Item key='2'>
            <DesktopOutlined />
            <span>添加文章</span>
          </Menu.Item>
          <SubMenu
            key='sub1'
            title={
              <span>
                <UserOutlined />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key='3'>添加文章</Menu.Item>
            <Menu.Item key='4'>文章列表</Menu.Item>
            <Menu.Item key='5'>修改记录</Menu.Item>
          </SubMenu>
          <SubMenu
            key='sub2'
            title={
              <span>
                <TeamOutlined />
                <span>留言管理</span>
              </span>
            }
          >
            <Menu.Item key='6'>留言列表</Menu.Item>
            <Menu.Item key='8'>黑名单</Menu.Item>
          </SubMenu>
          <Menu.Item key='9'>
            <FileOutlined />
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
              <Route path='/index/' component={AddArticle} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;
