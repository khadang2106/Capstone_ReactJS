import { request } from '../configs/api';

class BannerService {
  fetchBannerApi() {
    return request({
      url: '/QuanLyPhim/LayDanhSachBanner',
      method: 'GET',
    });
  }
}

export const bannerService = new BannerService();
