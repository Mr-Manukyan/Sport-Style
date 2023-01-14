import React from 'react'
import style from './Home.module.css'
import { Link } from 'react-router-dom'
import productPhoto1 from '../../Assets/Images/AirMax1.png'
import productPhoto2 from '../../Assets/Images/AirMax2.png'
import productPhoto3 from '../../Assets/Images/AirMax3.png'
import { homeData } from './homeData'
import { Text3D } from '../Common/Text3D/Text3D'


type PropsType = {
    isAuth : boolean
}

export const Home:React.FC<PropsType> = React.memo( ({isAuth}) => {

    return (
        <div className = {style.container}>
 
            <div className = {style.contentBody}>
          
                <div className = {style.box}>
                  <span className = {style.logoText}>SportStyle</span>
                  <span className = {style.photo1}><img src = {productPhoto1} alt = 'photoProduct'/></span>
                  <span className = {style.photo2}><img src = {productPhoto2} alt = 'photoProduct'/></span>
                  <span className = {style.photo3}><img src = {productPhoto3} alt = 'photoProduct'/></span>
                  <span className = {style.photo4}><img src = {productPhoto1} alt = 'photoProduct'/></span>
                  <span className = {style.photo5}><img src = {productPhoto2} alt = 'photoProduct'/></span>
                  <span className = {style.photo6}><img src = {productPhoto3} alt = 'photoProduct'/></span>
                  <span className = {style.photo7}><img src = {productPhoto1} alt = 'photoProduct'/></span>
                  <span className = {style.photo8}><img src = {productPhoto2} alt = 'photoProduct'/></span>
                </div>

                <div className = {style.textWrapper}>
                    <Text3D text = 'SPORT STYLE SHOP' />
                    <p className = {style.text}>{homeData.text}</p>
                    <p className={style.text}>By registering on  
                    {
                    !isAuth ? <Link to='/auth/register' className={ style.link }> our website </Link>
                            : ' our website '
                    }
                and becoming our client, you can purchase the entire range 
                presented on the website of the Sport Style store 
                <i className={style.discount}> 10% discount. </i>
            </p>
                </div>

                <div className = {style.linkWrapper}>
                    <Link className = {style.linkProducts} to = '/products'>
                          {'Our Products'}
                    </Link>
                </div>
              
            </div>
        </div>
    )
})
