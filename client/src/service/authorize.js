export const authenticate = (response, next) => {
    if (typeof window !== "undefined") { // ตรวจสอบการเข้าถึง window
      // เก็บข้อมูล token และ user ลงใน session storage
      sessionStorage.setItem("token", JSON.stringify(response.data.token)); // เก็บ token
      sessionStorage.setItem("user", JSON.stringify(response.data.user)); // เก็บ user
    }
    next();
  };



  //ดึง token 
export const getToken =()=>{
  if(window !== "undefined"){
      if(sessionStorage.getItem("token")){
        return JSON.parse(sessionStorage.getItem("token"));
      }
      else{
        return false;
      }
  }
}

  //ดึง user
  export const getUser =()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("user")){
          return JSON.parse(sessionStorage.getItem("user"));
        }
        else{
          return false;
        }
    }
  }

  export const logout = (next) => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    }
    next();
  };

