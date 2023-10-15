import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { cinemaService } from '../../../../services/cinema';
import moment from 'moment';

export default function Showtimes() {
  const params = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchShowtimes();
  }, []);

  const fetchShowtimes = async () => {
    const result = await cinemaService.fetchShowtimesApi(params.movieId);

    setData(result.data.content.heThongRapChieu);
  };

  const renderTabList = () => {
    return data.map((element, index) => {
      const { maHeThongRap, logo } = element;

      return (
        <a
          key={maHeThongRap}
          className={`nav-link text-capitalize text-center logo-btn ${
            index === 0 && 'active'
          }`}
          data-toggle="pill"
          href={`#${maHeThongRap}`}
          role="tab"
          aria-selected="true"
        >
          <img style={{ width: 50 }} className="img-fluid" src={logo} alt="" />
        </a>
      );
    });
  };

  const renderTabContent = () => {
    return data.map((element, index) => {
      const { maHeThongRap, cumRapChieu } = element;

      return (
        <div
          key={maHeThongRap}
          className={`tab-pane fade show ${index === 0 && 'active'}`}
          id={maHeThongRap}
          role="tabpanel"
        >
          {cumRapChieu.map((cumRap) => {
            const { maCumRap, tenCumRap, diaChi, lichChieuPhim } = cumRap;

            return (
              <div key={maCumRap} className="row mb-5">
                <div className="col-12 pl-0">
                  <h5>{tenCumRap}</h5>
                  <span className="text-muted">{diaChi}</span>
                </div>
                <div className="col-12 mt-3">
                  <div className="row">
                    {lichChieuPhim.map((lichChieu) => {
                      const { maRap, ngayChieuGioChieu, maLichChieu } =
                        lichChieu;

                      return (
                        <div key={maRap} className="col-3 my-2">
                          <Link
                            className="time-item"
                            to={`/ticket-booking/${maLichChieu}`}
                          >
                            {moment(ngayChieuGioChieu).format('LT')}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="row">
      <h2 className="col-12 mb-4">Showtimes</h2>

      <div className="col-3">
        <div
          className="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          {renderTabList()}
        </div>
      </div>

      <div className="col-9 showtimes-info">
        <div className="tab-content" id="v-pills-tabContent">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
