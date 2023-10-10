import React, { useState } from "react";
import {
  OrderedListOutlined,
  UserOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfoAction } from "../../store/actions/userAction";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("User", "1", <UserOutlined />),
  getItem("Movies", "sub1", <OrderedListOutlined />, [
    getItem("Movies", "2", <OrderedListOutlined />),
    getItem("Add new", "3", <EditOutlined />),
  ]),
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  console.log(userState);
  const dispatch = useDispatch();
  const renderContent = () => {
    if (userState.userInfo){
      return <>
      <span>Hello <span className="font-weight-bold">{userState.userInfo.hoTen}</span></span>
      <button onClick={logout} className="ml-3 btn btn-primary">Log Out</button>
      </>;
    }
  }
  const logout = () => {
    //XÓA LOCAL
    localStorage.removeItem("USER_INFO");
    //set lại giá trị userinfo
    dispatch(setUserInfoAction(null));
    //logout thành công thì chuyển về trang home
    navigate("/");
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0 ",fontSize: "20px", marginRight:"auto"}}>
            {renderContent()}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
