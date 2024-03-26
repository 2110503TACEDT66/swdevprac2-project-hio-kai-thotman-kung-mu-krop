
// import Image from 'next/image'
// import Link from "next/link";

// export default function Banner(){
//     return (
//         <div className="flex flex-row items-center w-full px-4">
//             <div className="mx-auto">
//                 <div>
//                     <p className='text-9xl font-mono font-black text-yellow-400' >Smile</p>
//                     <p className='text-5xl font-mono font-black text-blue-900'>it lets your teeth breathe.</p>
//                 </div>
//                 <div className='my-10 text-stone-400'>
//                     <p className='text-2xl fon t-mono'>คลินิกทันตกรรมที่ดีไม่ที่สุด นัดหมายทันตกรรมที่เกือบสะดวก </p>
//                     <p className='text-2xl font-mono'>บันทึกการรักษาอย่างเกือบเต็มรูปแบบ</p>
//                 </div>
//                 <Link href={`/user`} className="inline-flex items-center px-3 py-2 text-xl font-medium text-center text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                 สมัครเลย
//                 </Link>
//             </div>
//             <div className="mx-auto ">
//                 <Image src="/img/cover1.jpg" width={500} height={500} alt="" className='rounded-lg'/>
//             </div>
//         </div>
//     )
// }
import styles from './banner.module.css'
import Image from 'next/image'
import Link from "next/link";

export default function Banner(){
    return (
        <div className="flex flex-row items-center w-full px-4">
            <div className="mx-auto">
                <div>
                    <p className='text-9xl font-black text-yellow-400'>Smile</p>
                    <p className='text-5xl font-black text-blue-900'>it lets your teeth breathe.</p>
                </div>
                <div className='my-4 text-stone-400' >
                    <p className= {styles.bannerTextthai} >คลินิกทันตกรรมที่ดีไม่ที่สุด นัดหมายทันตกรรมที่เกือบสะดวก </p>
                    <p className={styles.bannerTextthai}>บันทึกการรักษาอย่างเกือบเต็มรูปแบบ</p>
                </div>
                <Link href={`/user`} 
                className="inline-flex items-center px-3 py-2 text-xl font-medium text-center text-white bg-blue-700 rounded-xl hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                สมัครเลย
                </Link>
            </div>
            <div className="mx-auto ">
                <Image src="/img/cover1.jpg" width={500} height={500} alt="" className='rounded-lg'/>
            </div>
        </div>
    )
}


