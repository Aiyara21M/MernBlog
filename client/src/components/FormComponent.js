import { useState, useCallback, useRef } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getToken } from "../service/authorize";


export default function FormComponents() {



  const [formData, setFormData] = useState({
    title: "",
    author: ""
  });

  const [content, setContent] = useState("");
  const quillRef = useRef(null);

  const { title, author } = formData;

  const chgContent = useCallback((newContent) => {
    setContent(newContent);
  }, []);

  const inputData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ฟังก์ชันจัดการการส่งข้อมูล
  const inputSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !content) {
      Swal.fire({
        icon: "warning",
        title: "ข้อมูลไม่ครบถ้วน",
        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
      });
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API}/create`, { ...formData, content },{
        headers:{
        Authorization: `Bearer ${getToken()}` 
      }});

      // รีเซ็ต state และ content หลังจากบันทึกสำเร็จ
      setFormData({ title: "", author: "" });
      setContent("");
      Swal.fire({
        title: "แจ้งเตือน",
        text: "ทำการบันทึกข้อมูลเรียบร้อยแล้ว",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "แจ้งเตือน",
        text: err.response.data.error || "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
      });
    }
  };

  return (
    <div className="container p-5">
      <Navbar />
      <h1>เขียนบทความ</h1>
      <form onSubmit={inputSubmit}>
        <div className="form-group">
          <label>ชื่อบทความ</label>
          <input
          ref={quillRef}
            type="text"
            name="title"
            className="form-control"
            value={title}
            onChange={inputData}
          />
        </div>
        <div className="form-group">
          <label>เนื้อหาบทความ</label>
          <ReactQuill
          ref={quillRef}
            theme="snow"
            className="pb-5 mb-3"
            value={content}
            onChange={chgContent}
            placeholder="เขียนบทความ"
            style={{ border: '1px solid #666' }}
          />
        </div>
        <div className="form-group">
          <label>ผู้เขียน</label>
          <input
          ref={quillRef}
            type="text"
            name="author"
            className="form-control"
            value={author}
            onChange={inputData}
          />
        </div>
        <br />
        <input type="submit" value="บันทึก" className="btn btn-primary" />
      </form>
    </div>
  );
}
