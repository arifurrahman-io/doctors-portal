import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
import { toast } from 'react-hot-toast';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const navigate = useNavigate()

    const { data: specialities, isLoading } = useQuery({
        queryKey: ['speciality'],
        queryFn: async () => {
            const res = await fetch(' https://doctors-portal-server-jade.vercel.app/appointmentSpeciality');
            const data = await res.json();
            return data;
        }
    })

    const handleAddDoctor = data => {

        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const doctor = {
                        name: data.name,
                        phone: data.phone,
                        email: data.email,
                        speciality: data.speciality,
                        image: imgData.data.url
                    }
                    // save doctors info to db
                    fetch(' https://doctors-portal-server-jade.vercel.app/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `berear ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(result => {
                            toast.success(`${doctor.name} added successfully`);
                            navigate('/dashboard/managedoctors');
                        })
                }
            })

    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='w-96 p-7'>
            <h3 className="text-3xl">Add A Doctor</h3>
            <form onSubmit={handleSubmit(handleAddDoctor)}>

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
                    <label className="label"><span className="label-text">Speciality</span></label>
                    <select
                        {...register("speciality", { required: "Speciality Number is Required." })}
                        className="select input-bordered w-full max-w-xs text-black">
                        <option selected>Pick A Speciality</option>
                        {
                            specialities.map(speciality => <option
                                key={speciality._id}
                                value={speciality.name}
                            >{speciality.name}</option>)
                        }

                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Photo</span></label>
                    <input type='file' {...register("image", { required: "Photo is Required." })} className="input input-bordered w-full max-w-xs" />
                    {errors.image && <p className='text-red-600' role="alert">{errors.image?.message}</p>}
                </div>

                <input className='btn btn-accent w-full' value='Add Doctor' type="submit" />
            </form>
        </div>
    );
};

export default AddDoctor;