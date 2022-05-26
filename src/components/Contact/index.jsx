import './index.css'

const Contact = ({ name, phoneNumber, emailAddress }) => {
  return (
    <div className='contact'>
      <div className='avatar'>
        <img src='https://media-exp1.licdn.com/dms/image/C5603AQH-NS6BxJ8UQg/profile-displayphoto-shrink_400_400/0/1624912815876?e=1657756800&v=beta&t=azlPKmNLQyaNHjQ3Tt2DPZHCCKJv_GI2xGDP-qurqcE' />
      </div>
      <div className='info'>
        <div>
          <spam className='name'>&bull; {name}</spam>
        </div>
        <div className='contact-info'>
          <p className='phone-number'>{phoneNumber}</p>
          <b className='email'>Email: <p>{emailAddress}</p></b>
        </div>
      </div>
    </div>
  )
}

export default Contact
