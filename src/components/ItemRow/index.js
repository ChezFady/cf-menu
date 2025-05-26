import React from "react";

const ItemRow = ({ name, description, price }) => {
  return (
    <div className="flex items-start justify-between w-full mb-4 pl-2 pr-2">
      <div className="flex flex-col items-start w-[80%]">
        <h4 className="text-[#8E1C1C] text-left text-2xl font-indie font-bold">
          {name}
        </h4>
        <p className="text-left text-lg font-indie">{description}</p>
      </div>
      <div className="w-36 text-right">
        <span className="font-indie text-lg">{price ? `$${price}` : ""}</span>
      </div>
    </div>
  );
};

export default ItemRow;
