import React from "react";
import DirectoryItem from "../directory-item/directory";
import Beauty from "../../assets/beauty.jpeg";
import Clothing from "../../assets/clothing.jpeg";
import Gym from "../../assets/gym.jpeg";
import Toys from "../../assets/toys.jpeg";
import Electronics from "../../assets/electronics.jpeg";

const categories = [
  {
    id: 1,
    title: "clothing",
    imageUrl: Clothing,
    route: "shop/clothing",
  },
  {
    id: 2,
    title: "electronics",
    imageUrl: Electronics,
    route: "shop/electronics",
  },
  {
    id: 3,
    title: "gym equipment",
    imageUrl: Gym,
    route: "shop/gym-equipment",
  },
  {
    id: 4,
    title: "toys",
    imageUrl: Toys,
    route: "shop/toys",
  },
  {
    id: 5,
    title: "beauty products",
    imageUrl: Beauty,
    route: "shop/beauty-products",
  },
];

const Directory = () => {
  return (
    <div className="px-4">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <React.Fragment key={category.id}>
            {index === 4 && (
              <div
                key="middle-box-desktop"
                className="h-[240px] flex items-center justify-center relative hidden sm:block lg:col-span-1"
              >
                <p className="text-center font-light text-[16px]">
                  Welcome to our store! Discover a wide range of products, from
                  clothing and electronics to beauty essentials and toys. Enjoy
                  your shopping journey!
                </p>
              </div>
            )}
            <DirectoryItem category={category} />
          </React.Fragment>
        ))}

        <div
          key="middle-box-mobile"
          className="h-[240px] flex items-center justify-center relative block sm:hidden"
        >
          <p className="text-center font-light text-[16px]">
            Welcome to our store! Discover a wide range of products, from
            clothing and electronics to beauty essentials and toys. Enjoy your
            shopping journey!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Directory;
