import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignInPage() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const SignIn = () => {
    if (name !== "" && pass !== "") {
      const formData = new FormData();
      formData.append("username", name);
      formData.append("password", pass);
      axios
        .post("http://127.0.0.1:8000/api/login/", formData)
        .then((response) => {
          console.log(response.data);
          let token = response.data;
          localStorage.setItem("uid", token.token);
          localStorage.setItem("username", token.username);
          console.log(token.token);
          if (token !== undefined || null) {
            //Navigate to the Detection Page
            navigate("/detect");
            window.location.reload();

          }
        })
        .catch((err) => {
          console.log("There was a: ", err);
        });
      setName("");
      setPass("");
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <div className="auth-form">
        <div className="auth-form-content">
          <input
            name="name"
            type="text"
            value={name}
            placeholder="Enter User Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            name="password"
            value={pass}
            type="password"
            placeholder="Enter Password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <button onClick={SignIn}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
