import Navbar from "./components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { htmlToText } from 'html-to-text';
import { getToken, getUser } from "./service/authorize";


function App() {
  const [blogs, setBlogs] = useState([]);

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "แจ้งเตือน",
          text: err.response.data.error,
        });
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const confirmDelete = async (slug) => {
    const result = await Swal.fire({
      title: 'ยืนยันการลบ',
      text: "คุณแน่ใจหรือไม่ว่าต้องการลบบล็อกนี้?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก'
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${process.env.REACT_APP_API}/delete/${slug}`,{
          headers:{
          Authorization: `Bearer ${getToken()}` 
        }}).then((response)=>{
          Swal.fire({
            title:"Deleted!",
            text:response.data.message,
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
        })
        fetchData();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถลบบล็อกได้',
        });
      }
    }
  };

  return (
    <div className="container p-5">
      <Navbar />

      {blogs.map((blog, index) => (
        <div
          className="row"
          key={blog._id}
          style={{ borderBottom: "1px solid #dcdcdc" }}
        >
          <div className="col pt-3 pb-2">
            <Link to={`/blog/${blog.slug}`}>
              <h2>{blog.title}</h2>
            </Link>
            <div className="pt-3 pb-3">{htmlToText(blog.content).substring(0,180)}...</div>
            <p className="text-muted">
              ผู้เขียน : {blog.author} ,เผยแพร่ :{" "}
              {new Date(blog.createdAt).toLocaleString()}
            </p>
          {
            getUser()&&(
              <div>
              <Link to={`/blog/update/${blog.slug}`} className="btn btn-outline-success" >อัพเดทบทความ</Link>
              &nbsp;
              <button className="btn btn-outline-danger" onClick={()=>confirmDelete(blog.slug)}>ลบบทความ</button>
              </div>
            )
          }


          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
