import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VoterDataServer from "../services/voter.service";
import { toast } from "react-toastify";
import Banner from "./banner/Banner";

const RegistrationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ voter, setVoter ] = useState({});
  const [ logoData, setLogoData ] = useState({});

  console.log("logoData", logoData);

  useEffect(() => {
    VoterDataServer.getRestaurantLogo({ restaurantId: id })
      .then((response) => {
        if (
          (response.data && response.data.status === "404") ||
          response.data.status === "500"
        ) {
          navigate("/invalid-restaurant");
        } else {
          setLogoData((prevData) => ({
            ...response.data.data[0].logo[0]
          }));
        }
      })
      .catch((e) => {
        console.log(e);
        navigate("/invalid-restaurant");
      });
  }, []);

  const handleSubmit = async () => {
    VoterDataServer.registerVoter(voter)
      .then((response) => {
        if (response.data && response.data.status === "200") {
          localStorage.setItem("voter", response.data.accessToken);
          toast.success( response.data.message || "Successfully registered");
          setTimeout(()=> {
            // navigate(`/review-product/${id}`);
            window.location.href = `/review-product/${id}`;
          },2000)
        } else {
          toast.error(`${response.data.message}`);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error registering");
      });
  };
  return (
    <div>
      <Banner bannerHeader={logoData.bannerHeader} bannerDescription={logoData.bannerDescription} />
      <div className="container mx-auto h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* <!-- Left column container--> */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> */}
                    <div className="text-center">
                      { logoData.image_url && <img
                        className="mx-auto w-48"
                        src={logoData.image_url}
                        alt="logo"
                      />}
                      { logoData.title && <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        {logoData.title}
                      </h4>}
                    </div>

                    <form>
                      <p className="mb-4">Please register to vote</p>
                      {/* <!--Username input--> */}
                      <div className="space-y-3">
                        <input
                          onChange={(e) => setVoter((prevData) => ({
                            ...prevData, name: e.target.value
                          }))}
                          type="text"
                          label="Name"
                          placeholder="Name"
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <input
                          onChange={(e) => setVoter((prevData) => ({
                            ...prevData, email: e.target.value
                          }))}
                          type="text"
                          label="Phone Number"
                          placeholder="Phone Number"
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />

                        <input
                          onChange={(e) => setVoter((prevData) => ({
                            ...prevData, name: e.target.value
                          }))}
                          type="email"
                          label="Email"
                          placeholder="Email"
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      {/* <!--Submit button--> */}
                      <div className="mb-12 mt-10 pb-1 pt-1 text-center">
                        <button
                          onClick={handleSubmit}
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                          type="button"
                          style={{
                            background:
                              "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                          }}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* <!-- Right column container with background and description--> */}
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      {logoData.sideHeader}
                    </h4>
                    <p className="text-sm">
                      {logoData.sideContent}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
