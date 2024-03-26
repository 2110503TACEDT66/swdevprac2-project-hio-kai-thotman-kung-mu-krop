// "use client"

// import DateReserve from "@/components/DateReserve";
// import { TextField,FormControl, Select, Button } from "@mui/material";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
// import getUserProfile from "@/libs/getUserProfile";
// import { useSearchParams } from "next/navigation";
// import { useState } from "react";
// import dayjs, { Dayjs } from "dayjs";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { useCallback } from "react";
// import { addBooking } from "@/redux/features/bookSlice";
// import Booking from '@/db/models/Appointment'
// import { dbConnect } from "@/db/dbConnect";
// import { getSession } from "next-auth/react";
// import { BookingItem } from "../../../interface";
// import addAppointment from "@/libs/addAppointment";

// export default async function BookingPage(){

//     const urlParams = useSearchParams()
//     const DentistId = urlParams.get('id')
//     const did = DentistId || ""


//     // const name = urlParams.get('name')
//     // const surname = urlParams.get('surname')

//     const [cid, setCid] = useState("");
//     const [name, setName] = useState("");
//     const [surname, setSurname] = useState("");

    

//     const dispatch = useDispatch<AppDispatch>()

//     const makeBooking = () => {
//         if(cid && name && surname && dentist && bookDate) {
//             const item:BookingItem = {
//                 name: name,
//                 surname: surname,
//                 id: cid,
//                 dentist: dentist,
//                 bookDate: dayjs(bookDate).format("YYYY/MM/DD")
//             }
//             dispatch(addBooking(item))
//         }
//     }

//     const [bookDate, setBookDate] = useState<Dayjs|null>(null)
//     const [dentist, setDentist] = useState<string>(did)

//     const message = `Name: ${name}\nSurname: ${surname}\nID: ${cid}\nDentist: ${dentist}\nBook Date: ${bookDate}`;

//     const addAppointmentos=async (apptDate: Date | undefined): Promise<void> => {
//         try {
//             await addAppointment(apptDate,DentistId);
//         } catch (error) {
//             console.log("Error adding appointment", error);
//         }
//     }

// //profile display
//     // const session = await getServerSession(authOptions)
//     // if(!session || !session.user.token) return null

//     // const profile = await getUserProfile(session.user.token)
//     // var createdAt = new Date(profile.data.createdAt)

//     return(
//         <main className="w-[100%] flex flex-col items-center space-y-4 ">
//             {/* <div className="text-2xl">{profile.data.name}</div>
//             <table className="table-auto border-separate border-spacing-2"><tbody>
//                 <tr><td>Name </td><td>{profile.data.name}</td></tr>
//                 <tr><td>Email </td><td>{profile.data.email}</td></tr>
//                 <tr><td>Tel. </td><td>{profile.data.tel}</td></tr>
//                 <tr><td>Member Since </td><td>{createdAt.toString()}</td></tr>
//             </tbody></table> */}
//             <div className="text-xl font-medium">Vaccine Booking</div>
//             <div className="text-xl font-medium">dentist : {name}</div>
            
//             <div className="w-fit space-y-2">
//                 <div className="text-md text-left text-gray-600">Pick-Up Date and Location</div>
//                 {/* <DateReserve onDateChange={(value:Dayjs)=>{setPickupDate(value)}}
//                 onLocationChange={(value:string)=>{setPickupLocation(value)}}/> */}
//             </div>

//             <FormControl>
//                 <TextField
//                     name="Name"
//                     label="Name"
//                     variant="standard"
//                     value={name}
//                     onChange={(e)=>{
//                         setName(e.target.value)
//                     }}
//                 />
//                 <TextField
//                     name="Lastname"
//                     label="Lastname"
//                     variant="standard"
//                     value={surname}
//                     onChange={(e)=>{
//                         setSurname(e.target.value)
//                     }}
//                 />
//                 <TextField
//                     name="Citizen ID"
//                     label="Citizen ID"
//                     variant="standard"
//                     value={cid}
//                     onChange={(e)=>{
//                         setCid(e.target.value)
//                     }}
//                 />
//                 <DateReserve onDateChange={(value:Dayjs)=>{setBookDate(value)}}
//                 onDentistChange={(value:string)=>{setDentist(value)}}
//                 DentistId={did}/>
//                 <Button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
//                 text-white shadow-sm" name="Book Vaccine" onClick={()=>{
//                     console.log("CID:", cid);
//                     console.log("Name:", name);
//                     console.log("Surname:", surname);
//                     console.log("Dentist:", dentist);
//                     console.log("Book Date:", bookDate);
//                     makeBooking();alert("Booking made!");
//                     addAppointmentos(bookDate?.toDate())}}>
//                 Book Vaccine
//                 </Button>
            
//             </FormControl>

//         </main>
//     );
// }

'use client'

import DateReserve from "@/components/DateReserve";
import { TextField, FormControl, Select, Button } from "@mui/material";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
// import { addBooking } from "@/redux/features/bookSlice";
import { BookingItem } from "../../../interface";
import addAppointment from "@/libs/addAppointment";
import mongoose, { Types } from "mongoose";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import { useSession } from "next-auth/react";


const BookingPage = () => {
    const session = useSession();

    const [appointmentDate, setappointmentDate] = useState<Dayjs|undefined>();
    const apptDate = appointmentDate?.toString()

    const dispatch = useDispatch<AppDispatch>();

    // const apptDate = appointmentDate?.toDate();

    const [dentist, setDentist] = useState<string>("");
    // const dentistObjectId =  new mongoose.Schema.Types.ObjectId(dentist);

    const [userId, setUserId] = useState<string>("");
    // const userObjectId = new mongoose.Schema.Types.ObjectId(userId);
    
    const fetchData = async () => {
        try {
            
            console.log('session',session)
            if (!session || !session.data) {
                throw new Error("User session not found");
            }

            const userId = session.data.user._id;
            
            console.log("USSSSSSSSSSSSEEEEEEEEEEEEEEEEEEEEEEEE",session.data.user._id)
            console.log("USERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR ID:",userId)
            setUserId(userId);

            // Your logic here

        } catch (error) {
            console.error("Error fetching user session:", error);
            // Handle error, e.g., redirect to login page
        }
    };


    // const makeBooking = () => {
    //     if (cid && name && surname && dentist && bookDate) {
    //         const item: BookingItem = {
    //             name: name,
    //             surname: surname,
    //             id: cid,
    //             dentist: dentist,
    //             bookDate: dayjs(bookDate).format("YYYY/MM/DD"),
    //         };
    //         dispatch(addBooking(item));
    //     }
    // };

    // const addAppointmentos = (apptDate: Date | undefined) => {
    //     addAppointment(apptDate, dentist)
    //         .then(() => {
    //             alert("Booking made!");
    //         })
    //         .catch((error) => {
    //             console.error("Error adding appointment", error);
    //         });
    // };

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4 ">
            <div className="text-xl font-medium">Dentist Appointment</div>

            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-600">Pick-Up Date and Dentist</div>
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
                        if(apptDate && session?.data?.user._id){
                            try {
                                await fetchData();
                                console.log("userId:", session.data.user._id);
                                console.log("DentistId:", dentist);
                                console.log("Appt Date:", appointmentDate);
                
                                await addAppointment(apptDate, session.data.user._id, dentist);
                                alert("Create Booking successful!");
                            } catch (error) {
                                console.error("Create Booking failed:", error);
                                console.log(error)
                                // Handle any registration errors here
                                alert("Create Booking failed. Please try again.");
                            }
                        }
                        
                    }}
                
                >
                    Make Appointment
                </Button>
            </FormControl>
        </main>
    );
};

export default BookingPage;
