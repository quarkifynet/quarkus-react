import React, {useState} from 'react';
import Networking from "./Networking";

export default function Auth({authCallback, ...props}) {
  const [info, setInfo] = useState(null);
  const [login, setLogin] = useState("test");//pre-fill user data for usability
  const [password, setPassword] = useState("test");
  const [email, setEmail] = useState("test@mail.com");
  const [isRegistering, setRegistering] = useState(false)

  const register = () => {
    Networking.exec({
      endpoint: client => client.apis.default.register,
      data: {requestBody: {name: login, email: email, password: password /* never do this in production */}},
      success: res => {
        setInfo("You've registered successfully, now login")
      },
      failure: err => {
        console.log(err)
      }
    })
  }
  const authenticate = () => {
    Networking.exec({
      endpoint: client => client.apis.default.login,
      attributes: {login: login, password: password},
      success: res => {
        localStorage.setItem("id_token", res.data); // store token in local storage
        authCallback()
      },
      failure: res => {
        setInfo(res)
      }
    })
  }
  return <div>
    <h1>{isRegistering ? 'Register' : 'Login'}</h1>
    Register:<input type="checkbox" onChange={(e) => {
    setRegistering(!isRegistering)
  }}/>
    {info && <div>{info}</div>}
    <div>
      Login:
      <input name="Login" value={login} onChange={(e) => setLogin(e.target.value)}/>
    </div>
    {isRegistering && <div>
      Email:
      <input name="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
    </div>}
    <div>
      Password:
      <input type="password" value={password} name="Password" onChange={(e) => setPassword(e.target.value)}/>
    </div>
    <button onClick={isRegistering ? register : authenticate}>Submit</button>
  </div>
}
