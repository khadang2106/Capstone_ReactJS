import { request } from '../configs/api';

class UserService {
  loginApi(data) {
    return request({
      url: `/QuanLyNguoiDung/DangNhap`,
      method: 'POST',
      data,
    });
  }

  fetchProfileApi(data) {
    return request({
      url: `/QuanLyNguoiDung/ThongTinTaiKhoan`,
      method: 'POST',
      data,
    });
  }

  registerApi(data) {
    return request({
      url: `/QuanLyNguoiDung/DangKy`,
      method: 'POST',
      data,
    });
  };
  fetchUserList(){
    return request({
      url: "/QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=GP01",
      method: "GET",
    });
  };
  addUserApi(data){
    return request({
      url: "/QuanLyNguoiDung/ThemNguoiDung",
      method: "POST",
      data,
    });
  };
  deleteUserApi(taiKhoan) {
    return request({
      url: `/QuanLyNguoiDung/XoaNguoiDung?taiKhoan=${taiKhoan}`,
      method: "DELETE",
    });
  };
  updateUserApi(data) {
    return request({
      url: `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      method: "POST",
      data,
    });
  };
  getUserDetailApi(taiKhoan) {
    return request({
      url: `/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`,
      method: "POST",
    });
  };
  searchUserApi(query) {
    return request({
      url: `/QuanLyNguoiDung/TimKiemNguoiDung?tuKhoa=${query}&maNhom=GP01`,
      method: "GET",
    });
  }
}
export const userService = new UserService();
