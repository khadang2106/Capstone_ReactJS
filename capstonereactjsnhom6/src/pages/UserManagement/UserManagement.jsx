import React, { useEffect, useState } from "react";
import useUserList from "../../hooks/userList";
import { userService } from "../../services/user";
import {
  deleteUserAction,
  updateUserAction,
} from "../../store/actions/userAction";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

export default function MovieManagement() {
  const userList = useUserList();
  const dispatch = useDispatch();
  //hiển thị số đếm trang
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDt: "",
    maLoaiNguoiDung: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  //thêm thành công
  const [addSuccess, setAddSuccess] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { ...state, maNhom: "GP01" };
    if (isEditing) {
      //cập nhật
      if (window.confirm("Bạn có chắc muốn cập nhật người dùng này không?")) {
        await dispatch(updateUserAction(userData));
        
      }
    } else {
      //thêm mới
      if (window.confirm("Bạn có chắc muốn thêm người dùng này không?")) {
        const response = await userService.addUserApi(userData);
        if (response && response.data.statusCode === 200) {
          setAddSuccess(true);
        }
      }
    }
  };

  useEffect(() => {
    if (addSuccess) {
      alert("Thêm người dùng thành công!");
      document.getElementById("close").click();
      setAddSuccess(false);
    }
  }, [addSuccess]);
  //hàm này để reset lại data trong form
  const [isEditing, setIsEditing] = useState(false);
  const resetModalState = () => {
    setIsEditing(false);
    setState({
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDt: "",
      maLoaiNguoiDung: "",
    });
  };
  const handleEditClick = async (taiKhoan) => {
    try {
      const response = await userService.getUserDetailApi(taiKhoan);
      if (response.data.statusCode === 200) {
        setState(response.data.content);
        setIsEditing(true);
      } else {
        console.error("Error fetching user details:", response.data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const handleSearch = async () => {
    setHasSearched(true);
    setSearchClicked(true);
    setCurrentPage(1);
    if (!searchValue.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await userService.searchUserApi(searchValue);
      if (response.data.statusCode === 200) {
        setSearchResults(response.data.content);
      } else {
        console.error("Error searching user:", response.data);
      }
    } catch (error) {
      console.error("Error searching user:", error);
    }
  };
  const handleShowAll = () => {
    setSearchResults([]);
    setHasSearched(false);
    setSearchValue("");
    setSearchClicked(false);
  };
  const [displayedUsers, setDisplayedUsers] = useState(userList);
  useEffect(() => {
    if (hasSearched) {
      setDisplayedUsers(searchResults);
    } else {
      setDisplayedUsers(userList);
    }
  }, [hasSearched, searchResults, userList]);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(displayedUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  const currentUsers = displayedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const renderContent = () => {
    const displayList = hasSearched ? searchResults : currentUsers;
    if (searchResults.length === 0 && hasSearched) {
      return (
        <tr>
          <td colSpan="8" style={{ textAlign: "center" }}>
            Không tìm thấy
          </td>
        </tr>
      );
    }
    return displayList.map((element, index) => {
      const soThuTu =
        searchResults.length > 0 ? index + 1 : indexOfFirstUser + index + 1;
      return (
        <tr key={index}>
          <td>{soThuTu}</td>
          <td>{element.taiKhoan}</td>
          <td>{element.matKhau}</td>
          <td>{element.hoTen}</td>
          <td>{element.email}</td>
          <td>{element.soDT}</td>
          <td>{element.maLoaiNguoiDung}</td>
          <td>
            <button
              onClick={() => {
                setIsEditing(true);
                setState(element);
                handleEditClick(element.taiKhoan);
              }}
              className="btn btn-info mr-2 "
              data-toggle="modal"
              data-target="#myModal"
            >
              SỬA
            </button>
            <button
              onClick={async () => {
                if (
                  window.confirm("Bạn có chắc muốn xóa người dùng này không?")
                ) {
                  const result = await dispatch(deleteUserAction(element));
                  if (result && result.success) {
                    alert("Xóa người dùng thành công!");
                  } else {
                    alert("Có lỗi xảy ra khi xóa người dùng!");
                  }
                }
              }}
              className="btn btn-danger"
            >
              XÓA
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="container">
      <h2
        style={{
          textAlign: "center",
          color: "rgb(245, 48, 48)",
          fontSize: 40,
          fontWeight: "bold",
          paddingTop: 20,
        }}
      >
        QUẢN LÝ NGƯỜI DÙNG
      </h2>
      {/* Phan tab menu */}
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item">
          <NavLink
            className="nav-link active"
            role="tab"
            data-toggle="tab"
            style={{ fontWeight: 800 }}
          >
            Danh Sách Người Dùng
          </NavLink>
        </li>
      </ul>
      <br />
      {/* Tab panes */}
      <div className="tab-content">
        {/*Danh sách đối tượng */}
        <div role="tabpanel" className="tab-pane in active" id="DanhSachSP">
          <div className="row">
            <div
              className="col-8 d-flex justify-content-end "
              style={{ height: 40, marginBottom: "16px" }}
            >
              {/* BEGIN BUTTOM THÊM MỚI */}
              <button
                id="btnAddUser"
                className="btn btn-success mr-auto"
                data-toggle="modal"
                data-target="#myModal"
                onClick={() => {
                  setIsEditing(false);
                  resetModalState();
                }}
              >
                <i className="fa fa-plus mr-1" /> Thêm Người Dùng
              </button>
              {/* END BUTTON THÊM MỚI */}
            </div>
            {/* INPUT SEARCH */}
            <div className="col-12 form-group has-search mt-16">
              <div className="form-group mb-0">
                <div className="row">
                  <div className="col-9">
                    <input
                      type="text"
                      placeholder="Search by name..."
                      className="form-control"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  </div>
                  <div className="col-1">
                    <button className="btn btn-danger" onClick={handleSearch}>
                      Tìm
                    </button>
                  </div>
                  <div className="col-2">
                    {searchClicked && (
                      <button
                        className="btn btn-primary"
                        onClick={handleShowAll}
                      >
                        Xem tất cả
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
          <div className="clear-fix" />
          <div className="tblSanPham" id="tblSanPham">
            {/* BEGIN TABLE SẢN PHẨM */}
            <div className="loader" id="loader" />
            <table className="table table-bordered">
              <thead align="center">
                <tr>
                  <th>STT</th>
                  <th>Tài Khoản</th>
                  <th>Mật Khẩu</th>
                  <th>Họ Tên</th>
                  <th>Email</th>
                  <th>Số Điện Thoại</th>
                  <th>Loại Người Dùng</th>
                  <th>Hành Động</th>
                </tr>
              </thead>
              <tbody>{renderContent()}</tbody>
            </table>
            {/**hiển thị next previous trong ul này */}
            <ul className="pagination">
              <li
                className={
                  currentPage === 1 ? "page-item disabled" : "page-item"
                }
                onClick={() => {
                  if (currentPage !== 1) {
                    handlePageChange(currentPage - 1);
                  }
                }}
              >
                <span className="page-link">Previous</span>
              </li>
              {pageNumbers.map((number) => (
                <li
                  key={number}
                  className={
                    currentPage === number ? "page-item active" : "page-item"
                  }
                  onClick={() => handlePageChange(number)}
                >
                  <span className="page-link">{number}</span>
                </li>
              ))}
              <li
                className={
                  currentPage ===
                    Math.ceil(displayedUsers.length / usersPerPage) ||
                  displayedUsers.length <= usersPerPage
                    ? "page-item disabled"
                    : "page-item"
                }
                onClick={() => {
                  if (
                    currentPage !==
                    Math.ceil(displayedUsers.length / usersPerPage)
                  ) {
                    handlePageChange(currentPage + 1);
                  }
                }}
              >
                <span className="page-link">Next</span>
              </li>
            </ul>

            {/* END TABLE SẢN PHẨM */}
          </div>
          <br />
        </div>
        {/* Kết thúc danh sách sản phẩm */}
      </div>
      {/*KetThuc Tabmenu*/}

      {/* The Modal */}
      <div className="modal fade" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title font-weight-bold text-danger">
                {isEditing ? "Cập nhật người dùng" : "Thêm người dùng"}
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                id="close"
              >
                ×
              </button>
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {/* ID */}
                <div className="form-group">
                  <label>Tài khoản</label>
                  <input
                    onChange={handleChange}
                    name="taiKhoan"
                    className="form-control"
                    placeholder="Nhập tài khoản..."
                    value={state.taiKhoan}
                  />
                  {/* validation ID */}
                  <div
                    className="text-danger"
                    style={{ display: "none" }}
                    id="errorID"
                  />
                </div>
                {/* MẬT KHẨU */}
                <div className="form-group">
                  <label>Mật khẩu</label>
                  <input
                    onChange={handleChange}
                    name="matKhau"
                    className="form-control"
                    placeholder="Nhập mật khẩu..."
                    value={state.matKhau}
                  />
                  <div
                    className="text-danger"
                    style={{ display: "none" }}
                    id="errorHoTen"
                  />
                </div>
                {/* HỌ TÊN */}
                <div className="form-group">
                  <label>Họ tên</label>
                  <input
                    onChange={handleChange}
                    name="hoTen"
                    className="form-control"
                    placeholder="Nhập họ tên..."
                    value={state.hoTen}
                  />
                  <div
                    className="text-danger"
                    style={{ display: "none" }}
                    id="errorDiaChi"
                  />
                </div>
                {/* Email*/}
                <div className="form-group">
                  <label>Email</label>
                  <input
                    onChange={handleChange}
                    name="email"
                    className="form-control"
                    placeholder="Nhập email..."
                    value={state.email}
                  />
                  <div
                    className="text-danger"
                    style={{ display: "none" }}
                    id="errorEmail"
                  />
                </div>
                {/* Loại Người Dùng */}
                <select
                  className="form-control"
                  value={state.maLoaiNguoiDung}
                  onChange={handleChange}
                  name="maLoaiNguoiDung"
                >
                  <option value="selecType">Chọn loại người dùng</option>
                  <option value="QuanTri">Quản Trị</option>
                  <option value="KhachHang">Khách Hàng</option>
                </select>
                <div
                  className="text-danger"
                  style={{ display: "block" }}
                  id="errorDoiTuong"
                />
                <br />
                {/**SỐ ĐIỆN THOẠI */}
                <div className="form-group" id="formdiemToan">
                  <label>Số điện thoại</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="soDt"
                    className="form-control"
                    aria-describedby="helpId"
                    placeholder="Nhập số điện thoại..."
                    value={state.soDT}
                  />
                  <div
                    className="text-danger"
                    style={{ display: "none" }}
                    id="errorDiemToan"
                  />
                </div>
                <div className="text-right">
                  {isEditing ? (
                    <button className="btn btn-primary">Cập nhật</button>
                  ) : (
                    <button className="btn btn-primary">Thêm người dùng</button>
                  )}
                </div>
              </form>
            </div>
            {/* Modal footer */}
            <div className="modal-footer" id="cancel" />
          </div>
        </div>
      </div>
    </div>
  );
}
