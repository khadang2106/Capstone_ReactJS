import React, { useState } from "react";
import { userService } from "../../services/user";
import { useDispatch } from "react-redux";
import { setUserInfoAction } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate()
    //hàm dispatch lên store
    const dispatch = useDispatch();
  //chỗ này useState để lấy thông tin trên form đăng nhập
  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: "",
  });
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(state);
    const result = await userService.loginApi(state);
    //trước khi dispatch thì lưu local để tránh trường hợp khi f5 lại thì data store mất hết
    //chỗ lưu thì lưu file ở dạng chuỗi stringify
    localStorage.setItem("USER_INFO",JSON.stringify(result.data.content));
    dispatch(setUserInfoAction(result.data.content));
    //sau khi login thành công thì chuyển về trang home
    navigate("/");
  };
  return (
    <div className="w-25 mx-auto py-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Username</label>
          <input
            onChange={handleChange}
            name="taiKhoan"
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Password</label>
          <input
            onChange={handleChange}
            name="matKhau"
            type="text"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">LOGIN</button>
      </form>
    </div>
  );
}

