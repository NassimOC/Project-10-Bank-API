import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [errorForm, setErrorForm] = useState("")
  const navigate = useNavigate();


  const formSubmit = async (e) => {
    e.preventDefault()
    setErrorForm("")
    const formData = {
      email,
      password
    }

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(formData)
      })
      if (!response.ok) {
        const data = await response.json()
        console.log(data.message)
        setErrorForm(data.message)
        return
      }
      
      const data = await response.json()

      if (response.ok && !remember) {
        sessionStorage.setItem("token", data.body.token)
      } else if (response.ok && remember) {
        localStorage.setItem("token", data.body.token)
      }

      navigate("/user")

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={formSubmit}>
      <div className="input-wrapper">
        <label htmlFor="email">Username</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" onChange={(e) => setRemember(!remember)}/>
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button className="sign-in-button">Sign In</button>
      {errorForm && <p className="sign-in-error">{errorForm}</p>}
    </form>
  )
}

export default LoginForm;