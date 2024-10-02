import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userProfile } from "../../store/authActions";
import Account from "../../components/Account/account";
import { useSelector } from "react-redux";
import { selectAuth } from "../../store/authSlice";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {firstName, lastName} = useSelector(selectAuth)

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token")

    if (!token) {
      navigate("/login")
    }

    dispatch(userProfile(token))
  }, [dispatch, navigate])

  return (
    <main className="main bg-dark">
    <div className="header">
      <h1>Welcome back <br />{firstName && firstName} {lastName && lastName}</h1>

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