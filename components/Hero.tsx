import Image from "next/image";
import React from "react";
import Me from "public/images/me.png";

export const Hero = () => {
  return (
    <div className="py-28">
      <div className="px-2 grid grid-cols-1 md:grid-cols-2 gap-x-40 gap-y-20 justify-center items-center">
        <div className="">
          <h1 className="text-5xl md:text-7xl mb-5 font-bold tracking-wide">
            Samar Ali Hatroum
          </h1>
          <p className="text-xl mb-5">
            <ul className="list-disc pl-6">
              <li>ICT Servicedesk Medewerker</li>
              <li>ICT Trainer</li>
              <li>Web designer</li>
              <li>Support Engineer</li>
            </ul>
          </p>
        </div>

        <div>
          <Image
            src={Me}
            alt="Mahmoud Abdelwahab"
            width="320px"
            height="400px"
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
