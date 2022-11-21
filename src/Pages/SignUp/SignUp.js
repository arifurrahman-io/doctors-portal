import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../Context/AuthProvider';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';

const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);

    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);

    const navigate = useNavigate();

    if (token) {
        navigate('/');
    }

    const handleSignUp = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User Created Successfully!');
                const userInfo = {
                    displayName: data.name,
                    phoneNumber: data.phone
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email, data.phone);
                    })
                    .catch(err => console.error(err));

                console.log(userInfo);
                console.log(user);
            })
            .catch(err => console.error(err));
    }


    const saveUser = (name, email, phone) => {
        const user = { name, email, phone }
        fetch('https://doctors-portal-server-jade.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCreatedUserEmail(email)
            })
    }



    return (
        <div className='h-[800px] flex flex-col justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Signup</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input type='text' {...register("name", { required: "Name is Required." })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-600' role="alert">{errors.name?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Phone</span></label>
                        <input type='number' {...register("phone", { required: "Phone Number is Required." })} className="input input-bordered w-full max-w-xs" />
                        {errors.phone && <p className='text-red-600' role="alert">{errors.phone?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type='email' {...register("email", { required: "Email Address is Required." })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type='password' {...register("password", { required: "Password id Required", minLength: { value: 6, message: "Password must be 6 charecters or longer." }, pattern: { value: /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}/, message: "Password must be strong." } })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600' role="alert">{errors.password?.message}</p>}
                        <label className="label"><span className="label-text">Forgate Password?</span></label>
                    </div>
                    <input className='btn btn-accent w-full' value='Signup' type="submit" />
                </form>
                <p className='text-center'>Already have an account? <Link className='text-secondary' to='/login'>Login</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;