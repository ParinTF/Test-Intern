// client/src/components/UserList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  // 1. สร้าง State เพื่อเก็บข้อมูลผู้ใช้
  const [users, setUsers] = useState([]); // เริ่มต้นเป็น array ว่าง
  const [loading, setLoading] = useState(true); // State สำหรับบอกว่ากำลังโหลดข้อมูลหรือไม่
  const [error, setError] = useState(null); // State สำหรับเก็บข้อความ error

  // 2. ใช้ useEffect เพื่อดึงข้อมูลจาก API เมื่อ Component โหลดเสร็จ
  
  useEffect(() => {
    // 3. สร้างฟังก์ชันเพื่อเรียก API
    const fetchUsers = async () => {
      try {
        // --- ส่วนที่สำคัญที่สุด ---
        // 4. ใช้ axios ส่ง GET request ไปยัง API ของเรา
        const response = await axios.get('http://localhost:5000/api/users'); 
        
        // 5. เมื่อสำเร็จ ให้นำข้อมูลที่ได้ (response.data) มาอัปเดต State
        setUsers(response.data);
      } catch (err) {
        // 6. หากล้มเหลว ให้อัปเดต State ของ error
        setError('Failed to fetch users');
        console.error(err);
      } finally {
        // 7. ไม่ว่าจะสำเร็จหรือล้มเหลว ให้หยุดการโหลด
        setLoading(false);
      }
    };

    fetchUsers(); // เรียกใช้ฟังก์ชัน
  }, []); // [] ที่ใส่ไว้หมายถึงให้ useEffect ทำงานแค่ครั้งเดียวตอน Component โหลด

  // 8. แสดงผลตาม State ปัจจุบัน
  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.firstName} {user.lastName} ({user.username})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;