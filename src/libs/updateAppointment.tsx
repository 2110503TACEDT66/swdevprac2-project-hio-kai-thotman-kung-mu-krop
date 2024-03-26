import { getSession } from 'next-auth/react';
import mongoose from 'mongoose';

export default async function updateAppointment(id: string, apptDate?: string, dentist?: string) {
    try {
        const session = await getSession(); // Get the session information
        if (!session) {
            throw new Error('User session not found');
        }

        const dentistId = new mongoose.Types.ObjectId(dentist);

        const response = await fetch(`http://localhost:5000/api/v1/appointments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.user.token}` // Include the Bearer token in the Authorization header
            },
            body: JSON.stringify({
                apptDate: apptDate,
                dentist: dentistId
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update appointment');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw error;
    }
}
