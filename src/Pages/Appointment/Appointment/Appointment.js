import React, { useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvailableAppoinments from '../AvailableAppoinments/AvailableAppoinments';

const Appointment = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());

    const changeDate = (date) => {
        if (!date) {
            return;
        }
        setSelectedDate(date)
    }

    return (
        <div>
            <AppointmentBanner
                selectedDate={selectedDate}
                setSelectedDate={changeDate}>
            </AppointmentBanner>
            <AvailableAppoinments
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            ></AvailableAppoinments>
        </div>
    );
};

export default Appointment;