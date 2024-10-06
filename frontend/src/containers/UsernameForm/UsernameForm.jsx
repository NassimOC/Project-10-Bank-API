import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectAuth } from "../../store/authSlice";
import { editUsername } from "../../store/authActions";


const UsernameForm = ({onBack}) => {
  const dispatch =  useDispatch();
  const { firstName, lastName, error } = useSelector(selectAuth);

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const body = {
      "firstName": newFirstName,
      "lastName": newLastName
    }
    dispatch(editUsername({body, token})).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        window.location.reload();
      }
    });
  }

  return (
    <div className='edit-content'>
      <h1>Edit user info</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="sign-in-error">{error}</p>}
        <div className="edit-input-wrapper">
          <label htmlFor="firstname">First name: </label>
          <input 
            type="text" 
            id="firstname" 
            placeholder={firstName}
            onChange={(e) => setNewFirstName(e.target.value)}
            required
          />
        </div>
          <div className="edit-input-wrapper">
          <label htmlFor="lastname">Last name: </label>
          <input 
            type="text" 
            id="lastname" 
            placeholder={lastName}
            onChange={(e) => setNewLastName(e.target.value)} 
            required
          />
        </div>
        <div className="edit-btn-wrapper">
          <button type="submit">Save</button>
          <button onClick={onBack}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default UsernameForm;