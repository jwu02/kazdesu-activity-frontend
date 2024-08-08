"use client"

import React, { useState, useEffect } from 'react';
import { convertImageToAscii } from '@/lib/convertImageToAscii';

// █▓▒░
const AsciiArtDisplay = ({ imageUrl, density='▓░░  ' }) => {
  const [asciiArt, setAsciiArt] = useState('');

  useEffect(() => {
    const fetchAsciiArt = async () => {
      try {
        const art = await convertImageToAscii(imageUrl, density);
        setAsciiArt(art)
      } catch (error) {
        console.error('Error converting image to ASCII:', error);
      }
    };

    fetchAsciiArt();
  }, [imageUrl, density]);

  return (
    <pre className="text-[1.2px] leading-[.65px]">
      {asciiArt}
    </pre>
  );
};

export default AsciiArtDisplay;
