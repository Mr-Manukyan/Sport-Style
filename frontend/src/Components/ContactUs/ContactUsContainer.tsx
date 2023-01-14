import React from 'react'
import { AnimatedPage } from '../Common/AnimatedPage/AnimatedPage'
import { Footer } from '../Footer/Footer'
import { ContactUs } from './ContactUs'
import style from './ContactUs.module.css'


const ContactUsContainer:React.FC = () => {

  return (
   <AnimatedPage>
      <div className = {style.contactUsContainer}>
        <ContactUs />
        <Footer />
      </div>
   </AnimatedPage> 
  )
}

export default ContactUsContainer