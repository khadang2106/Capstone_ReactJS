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
  }
}
export const userService = new UserService();
