'use client';
import axios from 'axios';
import { Formik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const UpdateUser = () => {
  const { id } = useParams();
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/user/getbyid/${id}`);
      setUserData(res.data);
    } catch (err) {
      console.error('Error fetching user:', err);
      toast.error('Error fetching user data');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const submitUpdateForm = async (values) => {
    try {
      const res = await axios.put(`http://localhost:5000/user/update/${id}`, values);
      if (res.status === 200) {
        toast.success('User Updated Successfully');
        router.push('/manage-users');
      }
    } catch (err) {
      console.error('Error updating user:', err);
      toast.error('Error Updating User');
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Update User</h1>

      <div>
        {!userData ? (
          <p className="text-xl text-red-500">Loading... Please wait</p>
        ) : (
          <Formik initialValues={userData} onSubmit={submitUpdateForm}>
            {(updateForm) => (
              <form onSubmit={updateForm.handleSubmit} className="space-y-4 max-w-xl">
                <div>
                  <label htmlFor="name" className="block mb-1">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={updateForm.handleChange}
                    value={updateForm.values.name}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-1">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={updateForm.handleChange}
                    value={updateForm.values.email}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block mb-1">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={updateForm.handleChange}
                    value={updateForm.values.password || ''}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    onChange={updateForm.handleChange}
                    value={updateForm.values.confirmPassword || ''}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Update User
                </button>
              </form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default UpdateUser;
