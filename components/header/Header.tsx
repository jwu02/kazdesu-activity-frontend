"use client"

import Image from 'next/image';
import Navbar from './Navbar';
import Socials from './Socials';

const Header = () => {
  const intro = "hello i am tony";
  const pfpImgSrc = "/pfp.jpg";

  return (
    <div className="flex flex-col sm:flex-row gap-10">
      <Image
        className="mx-auto sm:mx-0"
        alt="profile picture"
        src={pfpImgSrc}
        width={150}
        height={150}
      />

      <div className="flex flex-col justify-between">
        <Socials />
        <div className="text-lg">{intro}</div>
        <Navbar />
      </div>
    </div>
  );
}

export default Header
