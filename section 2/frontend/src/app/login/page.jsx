'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(7, 'Password is too short').required('Required'),
});

const Login = () => {
  const router = useRouter();

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values, { resetForm }) => {
      axios.post('http://localhost:5000/user/login', values)
        .then((result) => {
          toast.success('Login Successful!');
          resetForm();
          router.push('/');
        }).catch((err) => {
          console.log(err);
          toast.error('Invalid credentials!');
        });
    },
    validationSchema: LoginSchema,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-white to-purple-100 px-2">
      <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png"
            alt="ASHU Logo"
            className="h-16 mb-2 drop-shadow"
          />
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Login to your <span className="font-semibold text-purple-700">ASHU</span> account</p>
        </div>
        <form onSubmit={loginForm.handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              value={loginForm.values.email}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-gray-50"
              placeholder="Enter your email"
            />
            {loginForm.touched.email && loginForm.errors.email && (
              <div className="text-red-500 text-xs mt-1">{loginForm.errors.email}</div>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              value={loginForm.values.password}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-gray-50"
              placeholder="Enter your password"
            />
            {loginForm.touched.password && loginForm.errors.password && (
              <div className="text-red-500 text-xs mt-1">{loginForm.errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-700 via-pink-500 to-yellow-400 text-white font-bold py-2 rounded-lg shadow hover:from-purple-800 hover:to-yellow-500 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-purple-700 hover:underline font-semibold transition">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;