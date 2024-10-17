import React, { useEffect, useState } from "react";
import VoterDataService from "../services/voter.service";
import { useNavigate, useParams } from "react-router-dom";
import ImageGallery from "./product/ImageGallery";
import Banner from "./banner/Banner";
import { StarIcon } from "@heroicons/react/20/solid";
import Rating from "./Rating";


const ReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [data, setData] = useState(null);
  const [isRate, setIsRate] = useState(false);
  const [bannerHeader, setBannerHeader] = useState("");
  const [bannerDescription, setBannerDescription] = useState("");

  useEffect(() => {
    // getData()
    let options = {
      restaurantId: id,
    };
    VoterDataService.getRestaurant(options).then((response) => {
      if (
        (response.data && response.data.status === "404") ||
        response.data.status === "500"
      ) {
        localStorage.removeItem("voter")
        navigate("/invalid-restaurant");
      } else {
        getData(response.data.data.logoId);
        setImages(response.data.data.images);
        setData(response.data.data);
      }
    }).catch((er)=> {
      localStorage.removeItem("voter")
      navigate("/invalid-restaurant");
    });
  }, []);

  const getData = async (logoId) => {
    const resp = await VoterDataService.getLogo({ logoId });

    if (resp.data && resp.data.status === "200") {
      setBannerHeader(resp.data.data.bannerHeader);
      setBannerDescription(resp.data.data.bannerDescription);
    }
  }

  return (
    <div className="bg-white isolate">
    <Banner bannerHeader={bannerHeader} bannerDescription={bannerDescription} />
      <div className="mx-auto max-w-screen-xl px-4 md:px-8 mt-[5%]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {images.length > 0 && <div className="col-span-2"><ImageGallery images={images} /></div>}
          {data && <div className="md:py-8 col-span-1">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">Restaurant</span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data.restaurant_name}
              </h2>
            </div>
            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <button className="rounded-full gap-x-2">
                <StarIcon className="w-5 h-5 text-yellow-500" />
              </button>

              <span className="text-sm text-gray-500 transition duration-100">
                {data.votes} Ratings
              </span>
            </div>
            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                 {data.drinks}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {data.drink_description}
              </span>
            </div>
            <div className="w-full">
              <button onClick={()=> setIsRate(true)} className="px-4 py-2 bg-red-500 text-white rounded">
                Rate Now
              </button>
            </div>
          </div>}
        </div>
      </div>
      {isRate && <Rating restaurantId={id}/>}
    </div>
  );
};

export default ReviewPage;
