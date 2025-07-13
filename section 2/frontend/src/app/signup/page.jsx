'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short..!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(7, 'Password is too short').required('Required'),
  confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const Signup = () => {
  const router = useRouter();

  const signupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: (values, { resetForm }) => {
      axios.post('http://localhost:5000/user/add', values)
        .then((result) => {
          toast.success('User Created Successfully !!')
          resetForm();
          router.push('/login');
        }).catch((err) => {
          console.log(err);
          toast.error('Something went wrong !!')
        });
    },
    validationSchema: SignupSchema,
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
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">Create your account</h1>
          <p className="text-gray-500 text-sm">Sign up to get started with <span className="font-semibold text-purple-700">ASHU</span></p>
        </div>
        <form onSubmit={signupForm.handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.name}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-gray-50"
              placeholder="Enter your name"
            />
            {signupForm.touched.name && signupForm.errors.name && (
              <div className="text-red-500 text-xs mt-1">{signupForm.errors.name}</div>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.email}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-gray-50"
              placeholder="Enter your email"
            />
            {signupForm.touched.email && signupForm.errors.email && (
              <div className="text-red-500 text-xs mt-1">{signupForm.errors.email}</div>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.password}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-gray-50"
              placeholder="Enter your password"
            />
            {signupForm.touched.password && signupForm.errors.password && (
              <div className="text-red-500 text-xs mt-1">{signupForm.errors.password}</div>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.confirmPassword}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-gray-50"
              placeholder="Confirm your password"
            />
            {signupForm.touched.confirmPassword && signupForm.errors.confirmPassword && (
              <div className="text-red-500 text-xs mt-1">{signupForm.errors.confirmPassword}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-700 via-pink-500 to-yellow-400 text-white font-bold py-2 rounded-lg shadow hover:from-purple-800 hover:to-yellow-500 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-purple-700 hover:underline font-semibold transition">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;