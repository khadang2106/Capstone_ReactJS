//đây là hook gọi danh sách người dùng
import { useEffect, useState } from 'react'
import { userService } from '../services/user';

export default function useUserList() {
    const [userList,setUserList] = useState([]);
    const fetchUserList = async () => {
        const result = await userService.fetchUserList()
        setUserList(result.data.content);
    }
    useEffect(()=>{
        fetchUserList();
    },[])
  return userList;
}
