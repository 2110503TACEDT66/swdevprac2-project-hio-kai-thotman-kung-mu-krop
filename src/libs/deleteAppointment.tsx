import { ObjectId } from "mongoose";
import { getSession } from "next-auth/react";

export default async function deleteAppointment(id: ObjectId) {
    try {
        const session = await getSession(); // Get the session information
        if (!session) {
            throw new Error('User session not found');
        }

        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/appointments/${id.toString()}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${session.user.token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete appointment");
        }


        return await response.json();
    } catch (error) {
        console.error("Error deleting appointment:", error);
        throw error;
    }
}
