import { request } from '../configs/api';

class TicketService {
  fetchTicketDetailApi(id) {
    return request({
      url: `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`,
      method: 'GET',
    });
  }

  bookTicketApi(data) {
    return request({
      url: `/QuanLyDatVe/DatVe`,
      method: 'POST',
      data,
    });
  }
}

export const ticketService = new TicketService();
