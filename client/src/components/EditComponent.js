import { useEffect, useState, useRef } from "react";
import {  useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getToken } from "../service/authorize";


export default function EditComponent() {



  const { slug } = useParams();
  const [blog, setBlog] = useState({ title: "", author: "" });
  const [content, setContent] = useState("");
  const quillRef = useRef(null);

  const chgContent = (newContent) => {
    setContent(newContent);
  };

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/blog/${slug}`
      );
      setBlog(response.data);
      setContent(response.data.content);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "แจ้งเตือน",
        text: err.response.data.error || "เกิดข้อผิดพลาดในการดึงข้อมูล",
      });
    }
  };

  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line
  }, [slug]);

  const inputValue = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const putSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API}/update/${slug}`,{ ...blog, content },{
        headers:{
        Authorization: `Bearer ${getToken()}` 
      }});
      Swal.fire({
        title: "แจ้งเตือน",
        text: "ทำการอัพเดทข้อมูลเรียบร้อยแล้ว",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      await fetchBlog();

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
      <h1>แก้ไขบทความ</h1>
      <form onSubmit={putSubmit}>
        <div className="form-group">
          <label>ชื่อบทความ</label>
          <input
            ref={quillRef}
            type="text"
            name="title"
            className="form-control"
            value={blog.title}
            onChange={inputValue}
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
            placeholder="อัพเดทบทความ"
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
            value={blog.author}
            onChange={inputValue}
          />
        </div>
        <br />
        <input type="submit" value="อัพเดท" className="btn btn-primary" />
      </form>
    </div>
  );
}
