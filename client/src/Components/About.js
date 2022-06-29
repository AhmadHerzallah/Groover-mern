import React from 'react';
import '../style/landing.css';
import { Linkedin, Instagram, Facebook } from 'react-feather';
const About = (props) => {
  const data = props.data;
  return (
    <div className='Us'>
      <div className='artist__card2'>
        <div className='artist__card'>
          <img
            src={require(`../media/${data.name.split(' ')[0]}.png`)}
            alt={data.name.split(' ')[0]}
          />
        </div>
        <div className='artist__card3'>
          <h3>{data.name}</h3>
          <div className='Media'>
            <Instagram color='white' size={35} />
            <Linkedin color='white' size={35} />
            <Facebook color='white' size={35} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
