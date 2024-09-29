import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authActions";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth)

  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = { email, password, rememberMe}
    dispatch(loginUser(userInfo)).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        navigate('/user')
      }
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    
    if (token) {
      navigate('/user')
    }
  }, [navigate])

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="email">Username</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" onChange={(e) => setRememberMe(!rememberMe)}/>
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button className="sign-in-button">Sign In</button>
      {error && <p className="sign-in-error">{error}</p>}
    </form>
  )
}

export default LoginForm;