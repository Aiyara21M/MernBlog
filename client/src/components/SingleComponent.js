import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "./Navbar";

const SingleComponent = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState("");
  
  const fetchBlog = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/blog/${slug}`);
      setBlog(response.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "แจ้งเตือน",
        text: err.response.data.error,
      });
    }
  };

  useEffect(() => {
    fetchBlog();
  // eslint-disable-next-line
  }, [slug]);

  return (
    <div className="container p-5">
      <Navbar/>
      <h1>{blog.title}</h1>
      <div className="pt-5 pb-5"  dangerouslySetInnerHTML={{ __html: blog.content }} />
      <p className='text-muted'>ผู้เขียน : {blog.author} , เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default SingleComponent;




