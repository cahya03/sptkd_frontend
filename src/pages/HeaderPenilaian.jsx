import React, {useEffect} from 'react'
import Layout from './Layout'
import HeaderPenilaianList from '../components/HeaderPenilaianList'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

function HeaderPenilaian() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <Layout>
      <HeaderPenilaianList />
    </Layout>
  )
}

export default HeaderPenilaian;