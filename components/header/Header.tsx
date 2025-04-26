"use client"

import Image from 'next/image';
import Navbar from './Navbar';
import Socials from './Socials';

const Header = () => {
  const name = "jwoo"
  const intro = "unemployed cs grad disguised as an entreprenuer"
  const quote = "\"Chase your dreams. Or die trying.\" - Someone"
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
        <div className="text-lg">@{name}</div>
        <div className="text-lg">{intro}</div>
        <div className="text-lg">{quote}</div>
        <Socials />
        <Navbar />
      </div>
    </div>
  );
}

export default Header
