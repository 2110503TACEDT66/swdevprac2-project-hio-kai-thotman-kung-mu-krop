
'use client'

import DateReserve from "@/components/DateReserve";
import { TextField, FormControl, Select, Button } from "@mui/material";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
// import { addBooking } from "@/redux/features/bookSlice";
import { BookingItem } from "../../../interface";
import register from "@/libs/register";

const BookingPage = () => {
    const [password, setpassword] = useState("");
    const [name, setName] = useState("");
    const [tel, settel] = useState("");
    const [email, setemail] = useState("");
    const [balance, setbalance] = useState("");
    const [bookDate, setBookDate] = useState<Dayjs | null>(null);
    const [dentist, setDentist] = useState<string>("");

    const dispatch = useDispatch<AppDispatch>();

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4 ">
            <div className="text-xl font-black text-2xl py-8">Register</div>

            <div className="w-fit space-y-2">
            </div>

            <FormControl>
                <TextField
                    name="Name"
                    label="Name"
                    variant="standard"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <TextField
                    name="Telephone number"
                    label="Telephone number"
                    variant="standard"
                    value={tel}
                    onChange={(e) => {
                        settel(e.target.value);
                    }}
                />

                <TextField
                    name="Email"
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={(e) => {
                        setemail(e.target.value);
                    }}
                />
                <TextField
                    name="Password"
                    label="Password"
                    variant="standard"
                    value={password}
                    onChange={(e) => {
                        setpassword(e.target.value);
                    }}
                />
                {/* <TextField
                    name="Balance"
                    label="Balance"
                    variant="standard"
                    value={balance}
                    onChange={(e) => {
                        setbalance(e.target.value);
                    }}
                /> */}
                
                <Button
                    className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                    name="Book Vaccine"
                    onClick={async () => {
                        try {
                            console.log("password:", password);
                            console.log("Name:", name);
                            console.log("tel:", tel);
                            console.log("Email:", email);
                            console.log("Balance:", balance);

                            setbalance("");
                            
                            // Call the register function with the user data
                            await register(name, tel, email, password, parseFloat(balance));
                            
                            // You can also add a success message or redirect the user
                            alert("Registration successful!");
                        } catch (error) {
                            console.error("Registration failed:", error);
                            // Handle any registration errors here
                            alert("Registration failed. Please try again.");
                        }
                    }}
                >
                    Register
                </Button>
            </FormControl>
        </main>
    );
};

export default BookingPage;
