import { request } from "../configs/api";

class UserService {
  loginApi(data) {
    return request({
      url: `/QuanLyNguoiDung/DangNhap`,
      method: "POST",
      data,
    });
  }
}
export const userService = new UserService();