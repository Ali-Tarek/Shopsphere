import React from "react";
import { assets } from "../assets/assets";

interface Policy {
  icon: string;
  title: string;
  description: string;
}

const policies: Policy[] = [
  {
    icon: assets.exchange_icon,
    title: "Easy Exchange Policy",
    description: "We offer hassle free exchange policy",
  },
  {
    icon: assets.quality_icon,
    title: "7 Days Return Policy",
    description: "We provide 7 days free return policy",
  },
  {
    icon: assets.support_img,
    title: "Best customer support",
    description: "We provide 24/7 customer support",
  },
];

const OurPolicy: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      {policies.map((policy, index) => (
        <div key={index}>
          <img
            src={policy.icon}
            alt={policy.title}
            className="w-12 m-auto mb-5"
          />
          <p className="font-semibold">{policy.title}</p>
          <p className="text-gray-400">{policy.description}</p>
        </div>
      ))}
    </div>
  );
};

export default OurPolicy;
