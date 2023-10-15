import { userService } from "../../services/user";
import { DELETE_USER, SET_USER_INFO, UPDATE_USER } from "../types/userType"

export const setUserInfoAction = (data) => {
    return {
        type: SET_USER_INFO,
        payload: data,
    }
};
// nhấn nút delete
export const deleteUserAction = (user) => async (dispatch) => {
    try {
      const response = await userService.deleteUserApi(user.taiKhoan);
      if (response.data.statusCode === 200) {
        dispatch({
          type: DELETE_USER,
          payload: user,
        });
        return { success: true };
      } else {
        console.error("Error deleting user:", response.data);
        return { success: false };
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      return { success: false };
    }
  };
  //update
  export const updateUserAction = (userData) => async (dispatch) => {
    try {
      const response = await userService.updateUserApi(userData);
      if (response.data.statusCode === 200) {
        dispatch({
          type: UPDATE_USER,
          payload: userData,
        });
        alert("Cập nhật người dùng thành công!");
        document.getElementById("close").click();
      } else {
        console.error("Error updating user:", response.data);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  