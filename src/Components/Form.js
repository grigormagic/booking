import React from "react";

const Form = ({
  setName,
  setEmaile,
  setData,
  products,
  heandleAdd,
  checkItem,
  setCheckItem,
}) => {
  return (
    <div>
      <form
        className=" w-3/4 border-r border-gray-600 h-screen p-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className=" w-full bg-blue-300 my-4 text-black placeholder-black "
          required
          placeholder="Enter Name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          className=" w-full bg-blue-300 my-4 text-black placeholder-black"
          placeholder="Enter Email"
          type="email"
          onChange={(e) => setEmaile(e.target.value)}
        />
        <input
          required
          className=" w-full bg-blue-300 my-4 text-black "
          type="datetime-local"
          onChange={(e) => setData(e.target.value)}
        />
        {products.map((e) => {
          return (
            <div
              className={`my-2 px-2 border-2 border-gray-600 rounded-xl cursor-pointer
                     ${e.id == checkItem[0] ? "bg-white" : ""}`}
              onClick={() => {
                setCheckItem([e.id, e.name, e.duration]);
              }}
              key={e.id}
            >
              <ul className=" w-full flex ">
                <li className="mr-2">{e.name}</li>
                <li>{e.duration}</li>
              </ul>
              <p className=" ">{`${e.price}dram`}</p>
            </div>
          );
        })}
        <button
          type="submit"
          className=" w-full bg-slate-700 rounded-lg text-blue-300 h-10"
          onSubmit={(e) => e.preventDefault()}
          onClick={() => heandleAdd()}
        >
          Add New
        </button>
      </form>
    </div>
  );
};

export default Form;
