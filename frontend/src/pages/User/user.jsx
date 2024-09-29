import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userProfile } from "../../store/authActions";
import Account from "../../components/Account/account";
import { useSelector } from "react-redux";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {firstName} = useSelector(state => state.firstName)

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token")

    if (!token) {
      navigate("/login")
    }

    dispatch(userProfile(token))
  }, [])

  return (
    <main className="main bg-dark">
    <div className="header">
      <h1>Welcome back<br />{}</h1>
      <button className="edit-button">Edit Name</button>
    </div>
    <h2 className="sr-only">Accounts</h2>
    <Account 
      title="Argent Bank Checking (x8349)" 
      amount="$2,082.79" 
      description="Available Balance" 
    />
    <Account 
      title="Argent Bank Savings (x6712)" 
      amount="$10,928.42" 
      description="Available Balance" 
    />
    <Account 
      title="Argent Bank Checking (x8349)" 
      amount="$184.30" 
      description="Current Balance" 
    />
  </main>
  )
}

export default User