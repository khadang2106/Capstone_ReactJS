import { notification } from 'antd';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../enums/api';

export default function AdminGuard(props) {
    const navigate = useNavigate();
    const userState = useSelector((state)=>state.userReducer);
    console.log(userState);
    useEffect(()=>{
        //người dùng chưa đăng nhập
        if(!userState.userInfo){
            notification.warning({
                message: "Vui lòng đăng nhập để vào trang admin!!!",
                placement:"top",
            })
            navigate("/login");
        }else{
        //người dùng đăng nhập nhưng không đúng loại người dùng là quản trị 
        if(userState.userInfo.maLoaiNguoiDung !== UserType.QuanTri){
            notification.warning({
                message:"Bạn không có quyền truy cập vào trang này!!!",
                placement:"top",
            });
            navigate("/");
        }
        }
    },[])
  return <>{props.children}</>
}
