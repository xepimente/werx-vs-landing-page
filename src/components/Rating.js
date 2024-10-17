import React, { useState } from "react";
import VoterDataService from '../services/voter.service';
import { useNavigate } from "react-router-dom";

export default function Rating({restaurantId}) {
  const [rateValue, setRateValue] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (rateValue) {
     
        let options = {
          restaurants: [{
          restaurantId: restaurantId,
          rate: rateValue,
        }]}
      const rest = await VoterDataService.updateVoter(options);
      if(rest.data && rest.data.status === "200") {
        setIsSubmit(true);
      } else {
        setIsSubmit(false);
        localStorage.removeItem("voter")
        alert("you have already rated this restaurant");
        navigate("/invalid-restaurant");
        
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white w-96 p-8 rounded-lg flex flex-col items-center">
        {!isSubmit ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Question</h1>
            <p className="text-gray-400 mb-8">
              On a scale of 1 to 5, with 5 being the highest and 1 being the
              worst, how would you rate the margarita
            </p>
            <div className="grid grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <div
                  key={value}
                  className={`rounded-full cursor-pointer w-8 h-8 flex items-center justify-center ${
                    value === rateValue
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setRateValue(value)}
                >
                  {value}
                </div>
              ))}
            </div>
            <button
              className="mt-8 bg-red-500 text-white py-3 rounded-lg w-full hover:bg-white hover:text-orange-500 transition-colors"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </>
        ) : (
          <>
            <span className="bg-red-500 text-white py-2 px-4 rounded-full">
              You rated {rateValue} out of 5
            </span>
            <h1 className="text-2xl font-bold mt-4">
              Thank you for participating!
            </h1>
            <p className="text-gray-400 mt-2">
              We sincerely appreciate your involvement in our event. Your
              feedback helps us improve and deliver better experiences.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
