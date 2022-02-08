import React, {useState} from "react";
import axios from "axios";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  console.log(user);

  const InputEvent = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const loginData = (e) => {
    e.preventDefault();
    const { email, password } = user;
    if (email && password) {
      axios
        .post("http://localhost:6001/login", user)
        .then((res) => console.log(res));

      alert("successfully done");
    } else {
      alert("Invalid input");
    }
  };

  return (
    <>
      <div className="my-5">
        <h1 className="text-center">Login</h1>
      </div>
      <div className=" container-fluid contact_div">
        <div className="row">
          <div className="col-md-6 col-10 max-auto">
            <form>
              <div className="mb-3 ">
                <label for="exampleFormControlInput1" class="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  name="email"
                  value={user.email}
                  onChange={InputEvent}
                  placeholder="Enter your Email"
                />
              </div>
              <div className="mb-3 ">
                <label for="exampleFormControlInput1" class="form-label">
                  Password
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  name="password"
                  value={user.password}
                  onChange={InputEvent}
                  placeholder="Enter Your Password"
                />
              </div>
              <div className="col-12">
                  <button className="btn btn-outline-primary" type="Login" onClick = {loginData} >
                    Logged
                  </button>
  
                </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
