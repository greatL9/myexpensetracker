import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import DisplayModal from '../components/DisplayModal';
import NavBar from '../components/NavBar';

const initialValues = {
  title: '',
  expense: '',
  type: '',
  amount: 0,
  date: '',
};
export default function AddExpense() {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();
  const [error, setError] = useState();

  const inputChangehandler = (e) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const loggedInUser = JSON.parse(sessionStorage.getItem('userInfo'));
  console.log(loggedInUser);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await Axios.post(
        'https://emgeserver.herokuapp.com/expense',
        values,
        {
          headers: { 'x-auth-token': loggedInUser.token },
        }
      );
      if (data) {
        setSuccess('Added Successfully');
      }
      setLoading(false);
    } catch (err) {
      const errorMsg =
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message;
      setError(errorMsg);
      setLoading(false);
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
        Add
      </button>
    );
  }

  return (
    <div>
      <NavBar />
      {error && <DisplayModal showError={error} />}
      {success && <DisplayModal showSuccess={success} />}
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={values.title}
            onChange={inputChangehandler}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="expense" className="form-label">
            Expense
          </label>
          <input
            type="expense"
            className="form-control"
            id="expense"
            name="expense"
            value={values.expense}
            onChange={inputChangehandler}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Type
          </label>
          <input
            type="type"
            className="form-control"
            id="type"
            name="type"
            value={values.type}
            onChange={inputChangehandler}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            value={values.amount}
            onChange={inputChangehandler}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={values.date}
            onChange={inputChangehandler}
            required
          />
        </div>
        {btn}
      </form>
    </div>
  );
}
