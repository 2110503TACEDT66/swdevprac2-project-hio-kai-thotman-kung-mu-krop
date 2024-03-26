'use client'
import React from 'react';
import DentistInformation from "./DentistInformation";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { DentistItem, DentistJson } from "../../interface";
import { useEffect, useState } from "react";
import getDentists from "@/libs/getDentists";

export default function DentistScrollHorizontally() {
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

    const slideLeft = () => {
        const slider = document.getElementById('slider') as HTMLElement;
        slider.scrollLeft -= 500;
    }

    const slideRight = () => {
        const slider = document.getElementById('slider') as HTMLElement;
        slider.scrollLeft += 500;
    }

    return (
        <div className="relative items-center m-auto p-auto flex">
            <MdChevronLeft size={100} onClick={slideLeft} className='opacity-50 cursor-pointer hover:opacity-100' />
            <div id='slider' className="scrollbar-hide flex flex-no-wrap overflow-x-scroll scroll-smooth items-start mb-8 scrollbar-hide">
                {dentists?.data.map((Dentist:DentistItem) => (
                    <DentistInformation key={Dentist.id} id={Dentist.id} name={Dentist.name} year_of_experience={Dentist.year_of_experience} area_of_experience={Dentist.area_of_expertise} medical_fee={Dentist.medical_fee} />
                ))}
            </div>
            <MdChevronRight size={100} onClick={slideRight} className='opacity-50 cursor-pointer hover:opacity-100' />
        </div>
    )
}


