import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import BookingModal from '../../BookingModal/BookingModal';
import Loading from '../../Shared/Loading/Loading';
import AppointmentOption from './AppointmentOption';

const AvailableAppoinments = ({ selectedDate, setSelectedDate }) => {

    const [treatment, setTreatment] = useState(null);
    const date = format(selectedDate, 'PP');

    const { data: appointmentOptions = [], refetch, isLoading } = useQuery({
        queryKey: ['appointmentOptions', date],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-jade.vercel.app/appointmentOptions?date=${date}`);
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <section className='my-16'>
            <p className='text-center text-secondary font-bold'>Available Apponments on {format(selectedDate, 'PP')} </p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10'>
                {
                    appointmentOptions.map(option => <AppointmentOption key={option._id} option={option}
                        setTreatment={setTreatment}></AppointmentOption>)
                }
            </div>
            {treatment &&
                <BookingModal
                    selectedDate={selectedDate}
                    treatment={treatment}
                    refetch={refetch}
                    setTreatment={setTreatment}></BookingModal>}
        </section>
    );
};

export default AvailableAppoinments;