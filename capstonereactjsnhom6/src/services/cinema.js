import { request } from '../configs/api';

class CinemaService {
  fetchCinemaInfoApi() {
    return request({
      url: `/QuanLyRap/LayThongTinHeThongRap`,
      method: 'GET',
    });
  }

  fetchCinemaShowtimesApi(cinemaId) {
    return request({
      url: `/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${cinemaId}`,
      method: 'GET',
    });
  }

  fetchShowtimesApi(movieId) {
    return request({
      url: `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`,
      method: 'GET',
    });
  }
}

export const cinemaService = new CinemaService();
