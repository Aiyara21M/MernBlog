import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate, getUser } from "../service/authorize";
import { useNavigate } from "react-router-dom";

function LoginCom() {
  const navigate = useNavigate();

  useEffect(() => {
    if (getUser()) {
      navigate("/");
    }
  
  }, [navigate]);

  const [state, setState] = useState({
    user: "",
    password: "",
  });

  const { user, password } = state;

  const inputData = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const inputLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/login`,
        state
      );

      authenticate(response, () => navigate("/"));

      Swal.fire({
        title: "เข้าสู่ระบบสำเร็จ",
        text: `ยินดีต้อนรับ ${user}`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "เกิดข้อผิดพลาดในการเข้าสู่ระบบ";
      Swal.fire({
        icon: "error",
        title: "เข้าสู่ระบบไม่สำเร็จ",
        text: errorMessage,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="container p-5">
      <Navbar />
      <h1>เข้าสู่ระบบ</h1>
      <form onSubmit={inputLogin}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="user"
            className="form-control"
            value={user}
            onChange={inputData}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={password}
            onChange={inputData}
          />
        </div>
        <br />
        <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary" />
      </form>
    </div>
  );
}

export default LoginCom;
