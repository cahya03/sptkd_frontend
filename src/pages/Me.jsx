import React, {useEffect} from "react";
import Layout from "./Layout";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe, reset } from "../features/authSlice";

function Me() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { akun, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{message}</div>;
  return (
    <div>
      <Layout>
      <h1>Data Diri</h1>
      {akun && (
        <div>
          <p>Nama: {akun.akun_username}</p>
          <p>Email: {akun.akun_email}</p>
          <p>Username: {akun.username}</p>
        </div>
      )}
      </Layout>
    </div>
  );
}

export default Me;
