import React, {useState}  from "react";
import axios from "axios";
const Register = () => {
  
    const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
    });
    console.log(user)
    
    
    const InputEvent = (event) => {
      const { name, value } = event.target;
      setUser({ 
          ...user,
          [name]: value,
       
      });
    };

    
    
  const registerData = (e)=>{
    e.preventDefault();
    const {name,email,password} = user;
    if(name &&  email && password){
      axios.post('http://localhost:6001/register', user)
      .then(res=> {console.log(res)

        alert("successfully done");
      }).catch(error=>{
        console.log(error);
      });
    }else{
      alert("Invalid input");
    }

    
   
  }

    return (
      <>
        <div className="my-5">
          <h1 className="text-center">Register</h1>
        </div>
        <div className=" container-fluid contact_div">
          <div className="row">
            <div className="col-md-6 col-10 max-auto">
            <form >
                <div className="mb-3 ">
                  <label for="exampleFormControlInput1" class="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    name="name"
                    value={user.name}
                    onChange={InputEvent}
                    placeholder="Enter Your Fullname"
                 />
                 </div>
  
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Email 
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    name="email"
                    value={user.email}
                    onChange={InputEvent}
                    placeholder="Enter your Email"
                  />
                </div>
  
                <div class="mb-3">
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
                    placeholder="Enter your Password"
                  />
                </div>

                <div className="col-12">
                  <button className="btn btn-outline-primary" type="Register" onClick = {registerData} >
                    Register
                  </button>
  
                </div>
  
              </form>
              
            </div>
            <div>
  
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Register;
  