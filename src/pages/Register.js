import React, { useState } from 'react';
import Axios from 'axios';
import DisplayModal from '../components/DisplayModal';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  displayName: '',
  email: '',
  password: '',
  passwordCheck: '',
};
export default function Register() {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);

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
        'https://emgeserver.herokuapp.com/users/register',
        values
      );
      setLoading(false);
      if (data) {
        setSuccess('Successfully registered, Please Login');
        navigate('/Login');
      }
    } catch (err) {
      setLoading(false);
      // console.log(err);
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
            FullName
          </label>
          <input
            type="text"
            className="form-control"
            id="displayName"
            name="displayName"
            value={values.displayName}
            onChange={inputChangehandler}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
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
          <label htmlFor="password" className="form-label">
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
        <div className="mb-3">
          <label htmlFor="passwordCheck" className="form-label">
            PasswordCheck
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordCheck"
            name="passwordCheck"
            value={values.passwordCheck}
            onChange={inputChangehandler}
            required
          />
        </div>
        {btn}
      </form>
    </div>
  );
}
