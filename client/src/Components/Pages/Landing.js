import React from 'react';
import '../../style/landing.css';
import Style from '../../style/home.module.css';
import About from '../About';
const Landing = () => {
  const us = [
    {
      name: 'Ahmad Herzallah',
      Linkedin: 'https://www.linkedin.com/in/ahmad-herzallah/',
      Facebook: 'https://www.facebook.com/ahmad.codes05',
      Instagram: 'https://www.instagram.com/itsahmd25/',
    },
    {
      name: 'Shams Hamed',
      Linkedin:
        'https://www.linkedin.com/in/shams-hmead-5a723322b/?fbclid=IwAR2hxag2rc_T6ZDk-MUlh6NprWmsTSyR2TF2_Psn5S05k60C_eu_emSMbco',
      Facebook: 'https://www.facebook.com/profile.php?id=100035485697657',
      Instagram: 'https://www.instagram.com/shams.5t/',
    },
    {
      name: 'Hosny Al-khatib',
      Linkedin: 'https://www.linkedin.com/in/hosny-al-khatib-2973b5223/',
      Facebook: 'https://www.facebook.com/profile.php?id=100016372425497',
      Instagram: 'https://www.instagram.com/noname21.08/',
    },
  ];
  return (
    <div>
      <div>
        <div className='two-column'>
          <div className='firstDev'>
            <h1 className={Style.title}>
              Welcome to <span className='title title__name'>Groover</span>
            </h1>
            <p className='header__brief'>
              We provide you with data about your favorite artist.
            </p>
          </div>
          <div>
            <img
              src={require('../../media/image1.png')}
              alt='image1'
              className='image image1'
            />
          </div>
        </div>
        <div className='two-column'>
          <div>
            <img
              src={require('../../media/Left.png')}
              alt='image2'
              className='image'
            />
          </div>
          <div className='secondDev'>
            <h1>What is Groover?</h1>
            <p className='header__brief'>
              Groover is a website to provide you with data about your favorite
              artist and track. With a profile page and an algorithem to
              recommend artists to the user based on his taste using JukeBox
            </p>
          </div>
        </div>
        <h1 style={{ textAlign: 'center' }}>Who’s behind Groover </h1>
        <div className='aboutCardCon'>
          {us.map((data) => (
            <About data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
