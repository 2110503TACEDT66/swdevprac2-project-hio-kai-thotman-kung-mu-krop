import { getSession } from "next-auth/react";

export default async function getAppointments() {
    try {
        const session = await getSession();
        if (!session || !session.user || !session.user.token) {
            throw new Error("User session not found");
        }

        const response = await fetch("http://localhost:5000/api/v1/appointments/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${session.user.token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch appointments");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching appointments:", error);
        throw error; // Rethrow the error to handle it further up the call stack
    }
}
