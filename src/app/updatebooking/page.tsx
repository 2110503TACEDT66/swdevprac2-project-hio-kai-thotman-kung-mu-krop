'use client'

import DateReserve from "@/components/DateReserve";
import { TextField, FormControl, Select, Button } from "@mui/material";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { addBooking } from "@/redux/features/bookSlice";
import { BookingItem } from "../../../interface";
import addAppointment from "@/libs/addAppointment";
import mongoose, { Types } from "mongoose";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import { useSession } from "next-auth/react";
import updateAppointment from "@/libs/updateAppointment";
import { useSearchParams } from "next/navigation";


const BookingPage = () => {
    const session = useSession();

    const urlParams = useSearchParams();
    let appointmentId = "";
    if (urlParams) {
        appointmentId = urlParams.get('id')?.toString() || "";
    }


    const [appointmentDate, setappointmentDate] = useState<Dayjs|undefined>();
    const apptDate = appointmentDate?.toString()

    // const dispatch = useDispatch<AppDispatch>();

    // const apptDate = appointmentDate?.toDate();

    const [dentist, setDentist] = useState<string>("");
    // const dentistObjectId =  new mongoose.Schema.Types.ObjectId(dentist);
    // const userObjectId = new mongoose.Schema.Types.ObjectId(userId);
    
    // const fetchData = async () => {
    //     try {
            
    //         console.log('session',session)
    //         if (!session || !session.data) {
    //             throw new Error("User session not found");
    //         }

    //         const userId = session.data.user._id;
            
            
    //         setUserId(userId);

    //         // Your logic here

    //     } catch (error) {
    //         console.error("Error fetching user session:", error);
    //         // Handle error, e.g., redirect to login page
    //     }
    // };


    return (
        <main className="w-[100%] flex flex-col items-center space-y-4 ">
            <div className="text-xl font-medium">Update Appointment</div>

            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-600">Change Date and Dentist</div>
            </div>

            <FormControl>
                <DateReserve
                    onDateChange={(value: Dayjs) => {
                        setappointmentDate(value);
                    }}
                    onDentistChange={(value: string) => {
                        setDentist(value);
                    }}
                    DentistId={dentist}
                />
                <Button
                    className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                    name="Book Vaccine"
                    onClick={async () => {
                        if(apptDate){
                            try {
                                console.log("DentistId:", dentist);
                                console.log("Appt Date:", appointmentDate);
                
                                await updateAppointment(appointmentId,apptDate, dentist);
                                alert("Update Booking successful!");
                            } catch (error) {
                                console.error("Update Booking failed:", error);
                                console.log(error)
                                // Handle any registration errors here
                                alert("Update Booking failed. Please try again.");
                            }
                        }
                        
                    }}
                
                >
                    Change Appointment
                </Button>
            </FormControl>
        </main>
    );
};

export default BookingPage;
