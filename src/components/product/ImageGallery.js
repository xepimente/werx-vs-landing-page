import { useState } from "react";

export default function ImageGallery({ images }) {
  const [bigImage, setBigImage] = useState(
    images && images.length > 0 ? images[0] : ""
  );

  const handleChangeBigImage = (image) => {
    setBigImage(image);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images &&
          images.map((image, index) => {
            return (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-gray-100"
              >
                <img
                  src={image}
                  width={200}
                  height={200}
                  alt="photo"
                  className="h-full w-full object-cover object-center cursor-pointer"
                  onClick={() => handleChangeBigImage(image)}
                />
              </div>
            );
          })}
      </div>
      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        <img
          src={bigImage}
          alt="big image"
          height={500}
          width={500}
          className="w-full h-full object-cover object-center"
        />
        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Best Seller
        </span>
      </div>
    </div>
  );
}
