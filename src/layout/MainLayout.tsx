import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { Outlet, Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const routes = [
  { to: '/', title: 'Главное' },
  { to: '/random', title: 'Случайный фильм' },
];

const items = routes.map((route, index) => ({
  key: `${index + 1}`,
  label: route.title,
  to: route.to,
}));

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', background: 'black' }}>
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['1']}
          style={{ flex: 1, minWidth: 0, background: 'black' }}
        >
          {items.map((item) => (
            <Menu.Item key={item.key}>
              <Link to={item.to}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        kinopoisk ©{new Date().getFullYear()} Created by naniylid
      </Footer>
    </Layout>
  );
};

export default MainLayout;
