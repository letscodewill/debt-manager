
import logo from "../assets/images/logo.jpg"
import * as React from 'react';


export default function LogoImage() {
  
  return (
    < >
          <img
          style={{  width: 120,
  height: 120}}
            srcSet={`${logo}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${logo}?w=164&h=164&fit=crop&auto=format`}
            alt={logo}
            loading="lazy"
          />
    </>
  );
}

