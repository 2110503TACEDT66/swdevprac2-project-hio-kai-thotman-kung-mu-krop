import DentistScrollHorizontally from './DentistScrollHorizontally'
import styles from './dentistbanner.module.css'

export function DentistBanner(){
    return (
        <div className='bg-blue-800 w-screen h-200 items-center'>
            <p className={styles.bannerTextEng }>Dentists</p>
            <div className='bg-cyan-50 w-full h-3/5 p-10 my-5 rounded-lg items-center shadow'>
                    <DentistScrollHorizontally/>
            </div>
        </div>
    )
}