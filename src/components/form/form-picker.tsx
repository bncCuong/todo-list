//Component goi va render image lay api tu unspash
'use client';

import { defaultImages } from '@/constant/images';
import { unsplash } from '@/lib/unslash';
import { cn } from '@/lib/utils';
import { Check, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const [images, setImages] = useState<Array<Record<string, any>>>(defaultImages);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState(null);

  const { pending } = useFormStatus();

  //lấy random ảnh từ constant
  useEffect(() => {
    function getRandomSubarray(arr: [], count: number) {
      // Tạo mảng mới để chứa các phần tử ngẫu nhiên
      const result = []!;

      // Mảng vị trí ban đầu từ 0 đến chiều dài của mảng arr
      const indices = Array.from({ length: arr.length }, (_, index) => index);

      // Lấy ngẫu nhiên 'count' vị trí từ mảng indices
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * indices.length);
        const index = indices.splice(randomIndex, 1)[0];
        result.push(arr[index]);
      }

      return result;
    }

    setImages(getRandomSubarray(images as [], 9));
  }, []);

  //get images từ api unsplash
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9,
        });
        if (result && result.response) {
          const imagesList = result.response as Array<Record<string, any>>;
          setImages(imagesList);
        } else {
          console.log('Failed to get images form Unspash');
        }
      } catch (error) {
        console.log(error);
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center ">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => {
          return (
            <div
              key={image.id}
              className={cn(
                'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
                pending && 'opacity-50 hover:opacity-50 cursor-auto',
              )}
              onClick={() => {
                if (pending) return;
                setSelectedId(image.id);
              }}
            >
              {/* send value to form(form-popover) */}
              <input
                onChange={() => {}}
                type="radio"
                id={id}
                name={id}
                className="hidden"
                checked={selectedId === image.id}
                disabled={pending}
                value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
              />
              <Image fill src={image.urls.thumb} alt="images" sizes="10" className="object-cover rounded-sm" />
              {selectedId === image.id && (
                <div className="absolute inset-y-0 w-full h-full bg-black/30 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              <Link
                href={image.links.html}
                target="_blank"
                className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/80"
              >
                {image.user.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
