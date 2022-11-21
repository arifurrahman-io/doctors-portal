import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);
    const closeModal = () => {
        setDeletingDoctor(null);
    }


    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch(' https://doctors-portal-server-jade.vercel.app/doctors', {
                    headers: {
                        authorization: `berear ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    })

    const handleDeleteDoctor = doctor => {
        fetch(` https://doctors-portal-server-jade.vercel.app/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${doctor.name} delete successfully!`)
                }

            })
    };


    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h3 className="text-xl mb-5">Manage Doctors {doctors?.length}</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Speciality</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.length && doctors.map((doctor, i) => <tr key={doctor._id}>
                                <th>{i + 1}</th>
                                <th><div className='avatar'>
                                    <div className='w-20 rounded-full'><img src={doctor.image} alt="" /></div>
                                </div></th>
                                <td>{doctor.name}</td>
                                <td>{doctor.speciality}</td>
                                <td>{doctor.phone}</td>
                                <td>{doctor.email}</td>
                                <td>
                                    <label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>

                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingDoctor.name}, it cannot be undone.`}
                    successAction={handleDeleteDoctor}
                    successButtonName="Delete"
                    modalData={deletingDoctor}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }

        </div>
    );
};

export default ManageDoctors;