import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import DisplayModal from '../components/DisplayModal';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function AllExpense() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [expense, setExpense] = useState();

  const navigate = useNavigate();

  const editHandler = (expenseId) => {
    navigate(`/expense/${expenseId}/edit`);
  };

  const signedInUser = JSON.parse(sessionStorage.getItem('userInfo'));

  // const loggedInUser = JSON.parse(sessionStorage.getItem('userInfo'));

  useEffect(() => {
    const getAllExpense = async () => {
      const loggedInUser = JSON.parse(sessionStorage.getItem('userInfo')); //was outside useEffect before as commented above
      try {
        setLoading(true);
        const { data } = await Axios.get(
          'https://emgeserver.herokuapp.com/expense/mine/all',
          {
            headers: { 'x-auth-token': loggedInUser.token },
          }
        );
        setExpense(data);
        setLoading(false);
        console.log(data);
        if (data.length === 0) {
          setSuccess('No expense Added, Add an expense');
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

    getAllExpense();
  }, []);

  const deleteHandler = async (_id) => {
    if (!window.confirm('Are you sure you want to delete this expense')) {
      return;
    }

    try {
      const { data } = await Axios.delete(
        `https://emgeserver.herokuapp.com/expense/${_id}`,
        {
          headers: { 'x-auth-token': signedInUser.token }, //was loggedInUser before
        }
      );

      const remainingExpense = expense.filter((ee) => ee._id !== _id);
      setExpense(remainingExpense);
    } catch (err) {
      const errorMsg =
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message;
      setError(errorMsg);
    }
  };

  const showExpenseHandler = () => {};

  return (
    <div>
      <NavBar />
      {success && <DisplayModal showSuccess={success} />}
      <table class="table">
        <thead>
          <tr>
            <th scope="col">S/N</th>
            <th scope="col">Title</th>
            <th scope="col">Expense</th>
            <th scope="col">Type</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            'Loading.....'
          ) : error ? (
            <DisplayModal showError={error} />
          ) : (
            expense.map((ae, index) => (
              <tr key={ae._id}>
                <th scope="row">{index + 1}</th>
                <td>{ae.title}</td>
                <td>{ae.expense}</td>
                <td>{ae.type}</td>
                <td>{ae.amount}</td>
                <td>{ae.date}</td>
                <button onClick={() => editHandler(ae._id)}>Edit</button>
                <button onClick={() => deleteHandler(ae._id)}>Delete</button>
                <button onClick={() => showExpenseHandler(ae._id)}>View</button>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
