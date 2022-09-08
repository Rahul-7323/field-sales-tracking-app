import {useState, useEffect} from "react";

const Customer = ({customer, handleClick}) => {
  return (
    <div
      className="flex flex-row gap-5 bg-slate-200 border-b-2 border-slate-300 p-3 hover:bg-slate-400 active:scale-95 ease-in-out duration-200 active:rounded-lg"
      onClick={() => handleClick(customer.location)}
    >
      <div className="">
        <img
          src="https://api.lorem.space/image/face?w=100&h=100"
          alt=""
          className="rounded-full w-[5rem]"
        />
      </div>
      <div>
        <p className="text-lg">Name: {customer.name}</p>
        <p className="text-sm">Phone: {customer.phoneNumber}</p>
        <p className="text-sm">address: {customer.address}</p>
      </div>
    </div>
  );
};

export default Customer;
