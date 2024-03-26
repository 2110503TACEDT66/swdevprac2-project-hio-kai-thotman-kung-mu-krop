import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Select, MenuItem } from "@mui/material";
import { Dayjs } from "dayjs";
import getDentists from "@/libs/getDentists";
import { DentistItem, DentistJson } from "../../interface";
import mongoose from "mongoose";

export default function DateReserve({
  onDateChange,
  onDentistChange,
  DentistId
}: {
  onDateChange: Function,
  onDentistChange: Function,
  DentistId?: string
}) {
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
  const [Dentist, setDentist] = useState<string>(DentistId || '');
  // const DentistObject = new mongoose.Schema.Types.ObjectId(Dentist);
  const [dentists, setDentists] = useState<DentistJson | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDentists();
        setDentists(data);
        console.log("getData:", data);
      } catch (error) {
        console.error("Error fetching dentists:", error);
      }
    };

    console.log("dentists data you nee:",dentists)
    
    fetchData();
  }, []);


  return(
    <div className="flex flex-col">
      <Select 
        variant="standard" 
        name="location" 
        id="location" 
        value={Dentist}
        onChange={(e) => { setDentist(e.target.value); onDentistChange(e.target.value) }}
        className="h-[2em] w-[200px] mx-10 my-6"
      >
        
        {dentists?.data.map((dentist:DentistItem) => (
          <MenuItem key={dentist.id} value={dentist._id.toString()}>{dentist.name}</MenuItem>
        ))}
      </Select>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker 
          className="bg-white my-6"
          value={reserveDate}
          onChange={(value) => { setReserveDate(value); onDateChange(value) }}
        />
      </LocalizationProvider>
    </div>
  );
}
