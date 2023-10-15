import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userService } from '../../services/user';
import { formatDate } from '../../utils/date';

const ITEMS_PER_PAGE = 3;

export default function Profile() {
  const [currentPage, setCurrentPage] = useState(1);
  const userState = useSelector((state) => state.userReducer);

  const [profile, setProfile] = useState({});
  const [transactionsList, setTransactionList] = useState([]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const result = await userService.fetchProfileApi(userState);

    setProfile(result.data.content);
    setTransactionList(result.data.content.thongTinDatVe);
  };

  const { hoTen, email, soDT } = profile;

  const renderTransactions = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedTransactions = transactionsList.slice(startIndex, endIndex);

    return paginatedTransactions.map((element) => {
      const { maVe, hinhAnh, ngayDat, tenPhim, danhSachGhe } = element;

      return (
        <div key={maVe} className="col-12 mb-2">
          <div
            className="row container-fluid mx-auto pb-2"
            style={{ borderBottom: '1px dotted black' }}
          >
            <div className="col-3 text-center">
              <img className="img-fluid" src={hinhAnh} alt="" />
            </div>
            <div className="col-9">
              <p style={{ fontWeight: 'bold' }}>{tenPhim}</p>
              <p>{formatDate(ngayDat)}</p>
              <p>{danhSachGhe[0].tenHeThongRap}</p>
              <p>
                <span>{danhSachGhe[0].tenRap}</span> -{' '}
                <span>
                  Ghế:{' '}
                  {danhSachGhe.map((element) => {
                    return (
                      <span
                        key={element.maGhe}
                        className="badge badge badge-success mr-1"
                      >
                        {element.tenGhe}
                      </span>
                    );
                  })}
                </span>
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div
      className="account-profile container py-3 my-4"
      style={{ background: '#d8d8d8' }}
    >
      <div className="row">
        <div className="col-3 account-profile-left">
          <div
            className="nav flex-column nav-pills"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <button
              className="nav-link active mb-2"
              id="v-pills-home-tab"
              data-toggle="pill"
              data-target="#account-info"
              type="button"
              role="tab"
              aria-controls="account-info"
              aria-selected="true"
            >
              ACCOUNT INFORMATION
            </button>
            <button
              className="nav-link"
              id="v-pills-profile-tab"
              data-toggle="pill"
              data-target="#transactions-history"
              type="button"
              role="tab"
              aria-controls="transactions-history"
              aria-selected="false"
            >
              TRANSACTIONS HISTORY
            </button>
          </div>
        </div>
        <div className="col-9 account-profile-right">
          <div className="tab-content" id="v-pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="account-info"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <h4>ACCOUNT INFORMATION</h4>
              <div className="row">
                <div className="col-4 text-center">
                  <img
                    className="img-fluid"
                    src="https://vora.dexignlab.com/react/demo/static/media/17.a7b6b9cb820bffd162bf.jpg"
                    alt=""
                  />
                </div>
                <div className="col-5">
                  <h5>Contact Information</h5>
                  <p>Name: {hoTen}</p>
                  <p>Email: {email}</p>
                  <p>Telephone: {soDT}</p>
                </div>
                <div className="col-3">
                  <button className="btn btn-dark">Edit</button>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="transactions-history"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <h4>TRANSACTIONS HISTORY</h4>
              <div className="row">{renderTransactions()}</div>

              {/* Bootstrap Pagination */}
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-end">
                  {Array.from({
                    length: Math.ceil(transactionsList.length / ITEMS_PER_PAGE),
                  }).map((_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPage === index + 1 ? 'active' : ''
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
