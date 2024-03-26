

// // import { getSession } from 'next-auth/react';
// // import { dbConnect } from '@/db/dbConnect';
// // import Booking from '@/db/models/Appointment';

// // const addAppointment = async (apptDate: Date | undefined, DentistId: string | null): Promise<void> => {
// //     try {
// //         const session = await getSession(); // Get the session information
// //         if (!session) {
// //             throw new Error('User session not found');
// //         }

// //         // Assuming your user ID is stored in session.user.id
// //         const userId = session.user._id;
// //         await dbConnect();
// //         const booking = await Booking.create({
// //             "apptDate": apptDate,
// //             "user": userId,
// //             "dentist": DentistId
// //         });
// //         return;
// //     } catch (error) {
// //         console.log("Mongo Connect Error", error);
// //     }
// // }

// // export default addAppointment;

// import mongoose, { Date, ObjectId } from "mongoose";
// export default async function addAppointment(appointmentDate: string, userId: string, dentistId: string) {
    
//     const userID = new mongoose.Types.ObjectId(userId)
//     const id = new mongoose.Types.ObjectId(dentistId)
    
//     console.log("addAppoint userId:", userID);
//     console.log("addAppoint DentistId:", id);
//     console.log("addAppoint Appt Date:", appointmentDate);

//     const response = await fetch(`http://localhost:5000/api/v1/dentists/${id}/appointments/`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             apptDate: appointmentDate,
//             user: userID,
//             dentist: id
//         }),
//     });

//     if (!response.ok) {
//         throw new Error("Failed to create appointment");
//     }

//     return await response.json();
// }

import { getSession } from 'next-auth/react';
import mongoose from "mongoose";

export default async function addAppointment(appointmentDate: string, userId: string, dentistId: string) {
    try {
        const session = await getSession(); // Get the session information
        if (!session) {
            throw new Error('User session not found');
        }

        const userID = new mongoose.Types.ObjectId(userId);
        const id = new mongoose.Types.ObjectId(dentistId);

        console.log("addAppoint userId:", userID);
        console.log("addAppoint DentistId:", id);
        console.log("addAppoint Appt Date:", appointmentDate);

        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/dentists/${id}/appointments/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.user.token}`
            },
            body: JSON.stringify({
                apptDate: appointmentDate,
                user: userID,
                dentist: id
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to create appointment");
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating appointment:", error);
        throw error;
    }
}
