import Image from 'next/image'
import DentistInformation from '@/components/DentistInformation'
import DentistScrollHoricontally from '@/components/DentistScrollHorizontally'
import Banner from '@/components/Banner'
import { DentistBanner } from '@/components/DentistBanner'

export default function Home() {
  return (
    <main className="container flex-grow w-screen py-4 sm:py-16">
      <Banner/>
      <div className='my-10'>
        <DentistBanner/>
      </div>
      
    </main>
  ) 
}
