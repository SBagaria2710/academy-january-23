import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/userSlice";
import { GetCurrentUser } from "../apicalls/user";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { hideLoading, showLoading } from "../redux/loaderSlice";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(showLoading());
        const response = await GetCurrentUser();
        if (response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          dispatch(SetUser(response.data));
          dispatch(hideLoading());
        }
      } catch (err) {
        dispatch(SetUser(null));
      }
    };

    if (localStorage.getItem("token")) {
      getData();
    } else {
      navigate("/login");
    }
  }, []);

  const navItems = [
    {
      label: "Home",
      icon: <HomeOutlined />,
      onClick: () => {
        navigate("/");
      }
    },
    {
      label: `${!!user ? user.name : ""}`,
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span
              onClick={() => {
                if (user.role === "admin") {
                  navigate("/admin");
                } else if (user.role === "partner") {
                  navigate("/partner");
                } else {
                  navigate("/profile");
                }
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
        },
        {
          label: (
            <Link
              to="/login"
              onClick={() => {
                dispatch(SetUser(null));
                localStorage.removeItem("token");
              }}
            >
              Logout
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  return (
    <div>
      {user && (
        <Layout>
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
              Book My Show
            </h3>
            <Menu theme="dark" mode="horizontal" items={navItems} />
          </Header>
          <div style={{ padding: 24, minHeight: "100vh", background: "#fff" }}>
            {children}
          </div>
        </Layout>
      )}
    </div>
  );
}

export default ProtectedRoute;
