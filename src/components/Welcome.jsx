import React from 'react'
import { useSelector } from 'react-redux';

const Welcome = () => {
  const { akun } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <h2 className="text-xl text-gray-600">Welcome Back <strong>{akun && akun.akun_username }</strong></h2>
    </div>
  )
}

export default Welcome;