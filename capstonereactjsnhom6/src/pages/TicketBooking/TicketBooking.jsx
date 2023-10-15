import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ticketService } from '../../services/ticket';
import { ChairType } from '../../enums/api';
import { filter, sumBy } from 'lodash';
import Swal from 'sweetalert2';

export default function TicketBooking() {
  const navigate = useNavigate();

  const params = useParams();

  const [seatList, setSeatList] = useState([]);

  const [movieDetail, setMovieDetail] = useState({});

  useEffect(() => {
    fetchTicketDetail();
  }, []);

  const fetchTicketDetail = async () => {
    const result = await ticketService.fetchTicketDetailApi(params.id);

    setSeatList(
      result.data.content.danhSachGhe.map((element) => {
        return { ...element, dangChon: false };
      })
    );

    setMovieDetail(result.data.content.thongTinPhim);
  };

  const renderSeatList = () => {
    return seatList.map((element, index) => {
      const { maGhe, tenGhe, loaiGhe, daDat, dangChon } = element;

      let seatTypeClass = 'btn-outline-secondary';

      if (loaiGhe === ChairType.Vip) {
        seatTypeClass = 'btn-outline-warning';
      }

      if (dangChon) {
        seatTypeClass = 'btn-primary';
      }

      return (
        <React.Fragment key={maGhe}>
          <button
            onClick={() => {
              handleSelect(element);
            }}
            style={{ width: 45, height: 45, padding: 0 }}
            className={`mb-1 btn ${seatTypeClass}`}
            disabled={daDat}
          >
            {tenGhe}
          </button>
          {(index + 1) % 16 === 0 && <br />}
        </React.Fragment>
      );
    });
  };

  const handleSelect = (seat) => {
    const data = [...seatList];

    const index = data.findIndex((element) => element.maGhe === seat.maGhe);

    data[index].dangChon = !data[index].dangChon;

    setSeatList(data);
  };

  const renderSelectedSeatList = () => {
    const data = seatList.filter((element) => element.dangChon);

    return data.map((element) => {
      const { tenGhe, maGhe } = element;

      return (
        <p key={maGhe} className="badge badge-success mr-2 mb-1">
          {tenGhe}
        </p>
      );
    });
  };

  const renderTotalPrice = () => {
    const data = filter(seatList, 'dangChon');

    const total = sumBy(data, 'giaVe');

    return total.toLocaleString();
  };

  const handleBookTicket = async () => {
    Swal.fire({
      title: 'Do you want to proceed to checkout?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `Nope! Not yet`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = filter(seatList, 'dangChon');

        const body = {
          maLichChieu: params.id * 1,
          danhSachVe: data.map((element) => {
            return {
              maGhe: element.maGhe,
              giaVe: element.giaVe,
            };
          }),
        };

        try {
          const response = await ticketService.bookTicketApi(body);

          if (response) {
            Swal.fire(
              'Successfully booked! Thank you for choosing us!',
              '',
              'success'
            );

            navigate('/profile');
          } else {
            Swal.fire('Booking failed', 'Please try again later', 'error');
          }
        } catch (error) {
          Swal.fire('Booking failed!', 'Please try again later', 'error');
        }
      } else if (result.isDenied) {
        Swal.fire('Continue to choose seat', '', 'warning');
      }
    });
  };

  return (
    <div className="py-4 ticket-booking">
      <h2 className="ticket-booking-title text-center mb-4">Ticket Box</h2>

      <div className="row container-fluid">
        <h3 className="col-12 screen">SCREEN</h3>

        <div className="col-12">
          <div className="mx-auto text-center">{renderSeatList()}</div>
        </div>

        <div className="col-8 m-4 mx-auto">
          <div
            style={{ width: '95%' }}
            className="mx-auto text-center note row"
          >
            <div className="note-icon unavailable-seat col-3 ">Unavailable</div>
            <div className="note-icon standard-seat col-3 ">Standard</div>
            <div className="note-icon vip-seat col-3 ">Vip</div>
            <div className="note-icon available-seat col-3 ">Selecting</div>
          </div>
        </div>

        <div
          className="col-12 py-3 checkout-zone"
          style={{ background: '#d8d8d8' }}
        >
          <div className="row">
            <div className="col-2">
              <img
                className="img-fluid"
                style={{ width: 170, height: 280, objectFit: 'fill' }}
                src={movieDetail.hinhAnh}
                alt=""
              />
            </div>
            <h4 className="mb-0 col-3">{movieDetail.tenPhim}</h4>
            <div className="booking-info col-2">
              <h4 className="mb-4">
                <span>Theater:</span> {movieDetail.tenCumRap}
              </h4>
              <h4 className="mb-4">
                <span>Screen:</span> {movieDetail.tenRap}
              </h4>
              <h4 className="mb-4">
                <span>Date:</span> {movieDetail.ngayChieu}
              </h4>
              <h4 className="mb-4">
                <span>Showtime:</span> {movieDetail.gioChieu}
              </h4>
            </div>
            <div className="receipt col-3">
              <h5 className="mb-1">
                Number of seats:
                <div className="d-flex flex-wrap">
                  {renderSelectedSeatList()}
                </div>
              </h5>
              <h5>Total: {renderTotalPrice()}VNĐ</h5>
            </div>
            <div className="booking-btn my-auto col-2">
              <button onClick={handleBookTicket} className="btn btn-warning">
                Proceed to Checkout <br />
                <i className="fa-solid fa-arrow-right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
