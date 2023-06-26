import Image from 'next/image';
import { useState } from 'react';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { AiFillEye } from 'react-icons/ai';
import { IoCloudUpload } from 'react-icons/io5';

import { StorageService } from '@/firebase/storage/storage-service';
export default function ImagePicker({
  initialImage,
  onChange,
}: {
  initialImage?: string;
  onChange?: (file: FileList) => void;
}) {
  const [fileUrl, setFileUrl] = useState<string>();

  const [url] = useDownloadURL(StorageService.getRef(initialImage));
  const actions = (
    <>
      <div
        onClick={(e) => e.preventDefault()}
        className='flex cursor-pointer items-center gap-2 rounded border border-white py-1 px-3 text-white hover:bg-[#ffffff20]'
      >
        <AiFillEye />
        <div>View Full Image</div>
      </div>
      <div className='flex cursor-pointer items-center gap-2 rounded border border-white py-1 px-3 text-white hover:bg-[#ffffff20]'>
        <IoCloudUpload />
        <div>Upload New Image</div>
      </div>
    </>
  );
  return (
    <div>
      <label
        htmlFor='upload-image-block'
        className='relative block h-24 overflow-hidden rounded-lg'
      >
        {fileUrl ? (
          <Image className=' object-cover' src={fileUrl} alt='' fill />
        ) : initialImage ? (
          url ? (
            <Image className='object-cover' src={url} alt='' fill />
          ) : (
            <div className='h-full w-full bg-black'></div>
          )
        ) : (
          <div className='flex h-full w-full items-center justify-center rounded-lg border-2 border-dotted border-[#13602C] bg-[#F1F9F4] text-[#13602C]'>
            <div>Click To Upload Image</div>
          </div>
        )}
        {(initialImage || fileUrl) && (
          <div className='absolute inset-0 flex h-full flex-col items-center justify-center gap-4 bg-[#00000074] md:flex-row'>
            {actions}
          </div>
        )}
      </label>
      <input
        onChange={async (e) => {
          if (e.currentTarget?.files && e.currentTarget.files[0]) {
            if (onChange) onChange(e.currentTarget?.files);
            setFileUrl(
              URL.createObjectURL(
                new Blob([await e.currentTarget?.files[0].arrayBuffer()])
              )
            );
          }
        }}
        type='file'
        id='upload-image-block'
        className='hidden'
      />
    </div>
  );
}
