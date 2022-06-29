import React, { useState } from 'react';
import Axios from 'axios';
import DisplayModal from '../components/DisplayModal';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  email: '',
  password: '',
};
export default function Login() {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();

  const inputChangehandler = (e) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await Axios.post(
        'https://emgeserver.herokuapp.com/users/login',
        values
      );
      // console.log(data);
      if (data) {
        navigate('/AllExpense');
        sessionStorage.setItem('userInfo', JSON.stringify(data));
      }
    } catch (err) {
      setLoading(false);
      const errorMsg =
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message;
      setError(errorMsg);
    }
  };

  let btn;

  if (loading) {
    btn = (
      <button className="btn btn-primary" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </button>
    );
  } else {
    btn = (
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    );
  }

  return (
    <div>
      {error && <DisplayModal showError={error} />}
      {success && <DisplayModal showSuccess={success} />}
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="displayName" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={values.email}
            onChange={inputChangehandler}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={values.password}
            onChange={inputChangehandler}
            required
          />
        </div>
        {btn}
      </form>
    </div>
  );
}
