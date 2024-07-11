import React, {useEffect} from 'react'
import Layout from './Layout'
import FormEditPejabat from '../components/FormEditPejabat'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

function EditPejabat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, akun} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (akun && akun.akun_role !== "Admin") {
      navigate("/dashboard");
    }
  }, [isError, akun, navigate]);
  return (
    <Layout>
        <FormEditPejabat />
    </Layout>
  )
}

export default EditPejabat;