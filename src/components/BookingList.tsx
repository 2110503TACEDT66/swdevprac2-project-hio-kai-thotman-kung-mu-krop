
import { Date, ObjectId } from "mongoose";
import { useAppSelector, AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
// import { removeBooking } from "@/redux/features/bookSlice"
import Link from "next/link";
import getAppointments from "@/libs/getAppointments"
import { AppointmentItem, AppointmentJson, BookingItem, DentistItemSmall } from "../../interface";
import { useEffect, useState } from "react";
import deleteAppointment from "@/libs/deleteAppointment";
import { useCallback } from "react";



export default function BookingList(){

    // const bookItems = useAppSelector((state)=> state.bookSlice.bookItems)
    // const dispatch = useDispatch<AppDispatch>()

    const [appointments, setAppointments] = useState<AppointmentJson | null>(null);
    const [refetch, setRefetch] = useState(true);

    const loadDataOnlyOnce = useCallback(() => {
        console.log(`I need ${refetch}!!`);
      }, [refetch]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getAppointments();
            setAppointments(data);
            console.log("getData:", data);
          } catch (error) {
            console.error("Error fetching dentists:", error);
          }
        };
        console.log("appointments data you nee:",appointments)

        

            fetchData();
      }, [loadDataOnlyOnce]);
  
        
    return (
        <div>
        {appointments ? (
            appointments.data.map((appointment:AppointmentItem) => (
                <div className="bg-blue-800 rounded px-5 mx-5 py-2 my-2 shadow " >
                    <div className="bg-white rounded m-2 p-2 flex flex-row">
                    <div className="flex-grow">
                        <div className="text-xl"><b>apptDate :</b> {appointment.apptDate.toString()}</div>
                        <div className="text-xl"><b>Doctor :</b> {appointment.dentist?.name}</div>
                    </div>
                    <div className="flex flex-row items-top justify-end ">
                        <Link href={`/updatebooking?id=${appointment._id}`} className="inline-block" style={{ display: 'inline-block' }}>
                            <img src="/img/edit.png" alt="" className="w-5 h-5 mx-2"/>
                        </Link>
                            <img src="/img/delete.png" alt="" className="w-5 h-5 cursor-pointer" onClick={() => {deleteAppointment(appointment._id);setRefetch(!refetch)}} />
                    </div>
                    
                        {/*Update Booking และ Remove Booking แบบปุ่ม*/}
                        {/* <div className="my-5 items-center flex flex-row">
                        <Link href={`/updatebooking`} className="block rounded-full bg-green-400 hover:bg-indigo-600 px-3 py-2 text-white mx-7 shadow">
                                Update Booking
                        </Link>
                        <button className="block rounded-full bg-red-600 hover:bg-indigo-600 px-3 py-2 text-white mx-4 shadow"
                                onClick={() => {dispatch(removeBooking(bookItem.id))}}>
                                Remove Booking
                        </button>
                        </div> */}
                    </div>
                    
                </div>
                )
            )
        ): (
            <p>Loading... or No Booking</p>
        )}
        </div>
    )
}
