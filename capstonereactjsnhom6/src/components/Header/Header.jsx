import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { setUserInfoAction } from '../../store/actions/userAction';
import Swal from 'sweetalert2';
//lý do tách component ở đây là do mình tái sử dụng code do những page nào cũng có cùng header và footer
export default function Header() {
  //userState để check user trước đó người dùng có đăng nhập hay chưa? nếu có rồi thì ẩn 2 nút này
  const userState = useSelector((state) => state.userReducer);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  //hàm này để render 2 nút login và register theo điều kiện đã đăng nhập hay chưa
  const renderContent = () => {
    //nếu userinfo mà không có tức là user chưa đăng nhập thì render 2 button, còn nếu đã đăng nhập rồi thì hiển thị hello user
    if (!userState.userInfo) {
      return (
        <>
          <button
            onClick={() => navigate('/register')}
            className="btn btn-outline-info my-2 my-sm-0 mr-2"
            type="sumit"
          >
            Register
          </button>
          <button
            onClick={() => navigate('/login')}
            className="btn btn-outline-success my-2 my-sm-0"
          >
            Login
          </button>
        </>
      );
    } else {
      return (
        <div className="user-header dropdown ml-sm-4 ml-1">
          <a href className="user-profile" role="button" data-toggle="dropdown">
            <div className="user-info">
              <i
                className="fa-solid fa-user mr-1"
                style={{ fontSize: '16px' }}
              />
              Welcome {userState.userInfo.hoTen}
            </div>
          </a>
          <div className="dropdown-menu">
            <button
              onClick={() => navigate('/profile')}
              className="dropdown-item profile"
            >
              <i className="fa-solid fa-user" />
              Profile
            </button>
            <button onClick={logout} className="dropdown-item logout">
              <i className="fa-solid fa-arrow-right-from-bracket" />
              Log Out
            </button>
          </div>
        </div>
      );
    }
  };
  //hàm này để khi click vào button log out thì sẽ xóa local và set lại giá trị userInfo
  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        //XÓA LOCAL
        localStorage.removeItem('USER_INFO');
        //set lại giá trị userinfo
        dispatch(setUserInfoAction(null));
        //logout thành công thì chuyển về trang home
        navigate('/');
      }
    });
  };
  //chỗ Home bên dưới dùng NavLink để khi ở trang login bấm vào tag Home thì nó không load lại trang...
  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark"
      style={{ background: '#1d1d1d' }}
    >
      <NavLink className="navbar-brand" to={'/'}>
        CyberCine
      </NavLink>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink className="nav-link" to="/admin">
              Admin
            </NavLink>
          </li>
        </ul>
        <div className="ml-auto">{renderContent()}</div>
      </div>
    </nav>
  );
}
