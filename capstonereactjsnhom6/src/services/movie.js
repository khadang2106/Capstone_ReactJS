import { request } from "../configs/api";
class MovieService {
  //phương thức call api lấy danh sách phim
  fetMovieListApi() {
    return request({
      url: "/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
      method: "GET",
    });
  }
  //phương thức này là để call api lấy chi tiết từng phim
  fetMovieDetailApi(movieId) {
    return request({
        //header là 1 đối tượng dùng để cung cấp token khi call api nếu không có token thì nó sẽ báo lỗi 403 hết hạn
        url: `/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`,
        method: "GET",
      });
  }
}
//chỗ này new đối tượng trong đây để giải quyết vấn đề mỗi component khác nhau thì đều phải new hết
//lúc này qua component nào cần xài thì chỉ cần gọi movieService ra thôi...
export const movieService = new MovieService();