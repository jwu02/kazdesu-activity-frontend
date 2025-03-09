"use client"

import Image from 'next/image'
import { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { getPlainTextFromRichTextArray } from '@/lib/utils';

interface ImageProps {
  block: ImageBlockObjectResponse;
}

const NotionImage = ({ block }: ImageProps) => {
  
  
  if (!block || block.type !== 'image') {
    return null;
  }

  const image = block.image;
  if (!image || !image.type) {
    console.error('Invalid image block:', block);
    return null;
  }

  let imageUrl;
  if (image.type === 'file') {
    if (image.file && image.file.url) {
      imageUrl = image.file.url;
    } else {
      console.error('Missing file URL in image block:', block);
      return null;
    }
  } else if (image.type === 'external') {
    if (image.external && image.external.url) {
      imageUrl = image.external.url;
    } else {
      console.error('Missing external URL in image block:', block);
      return null;
    }
  } else {
    console.error('Unknown image type:', image.type);
    return null;
  }

  const imgCaption = image.caption ? getPlainTextFromRichTextArray(image.caption) : null;

  return (
    <div className="flex flex-col items-center justify-center my-2 py-4 hover:bg-muted">
      <Image
        src={imageUrl}
        alt={imgCaption || 'Notion Image'}
        width={400}
        height={400}
        className="object-contain"
      />
      {imgCaption && <div className="">{imgCaption}</div>}
    </div>
  );
};

export default NotionImage;