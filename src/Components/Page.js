import React from "react";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Form from "./Form";

const Page = ({
  user,
  setName,
  setEmaile,
  setData,
  products,
  heandleAdd,
  info,
  showOTP,
  OtpInput,
  setOtp,
  onOTPVerify,
  loading,
  ph,
  setPh,
  onSignup,
  checkItem,
  setCheckItem,
  otp,
}) => {
  return (
    <div>
      {user ? (
        <div className="flex justify-between">
          <Form
            setName={setName}
            setEmaile={setEmaile}
            setData={setData}
            products={products}
            heandleAdd={heandleAdd}
            checkItem= {checkItem}
            setCheckItem= {setCheckItem}
          />
          <div className="w-3/4 flex flex-wrap ">
            <h2 className="w-full text-center">My Cart</h2>
            {info.map((e) => {
              return (
                <div
                  key={e.id}
                  className="m-5 border-2 border-gray-300 rounded-lg px-2 max-h-40"
                >
                  <ul className="">
                    <li>{e.name}</li>
                    <li>{e.emaile}</li>
                    <li>{e.data.replace("T", " ")}</li>
                    <li>{e["1"]}</li>
                    <li>{e["2"]}</li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="w-80 flex flex-col gap-4 rounded-lg p-4 m-auto">
          <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
            Booking Site
          </h1>
          {showOTP ? (
            <>
              <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                <BsFillShieldLockFill size={30} />
              </div>
              <label
                htmlFor="otp"
                className="font-bold text-xl text-white text-center"
              >
                Enter your OTP
              </label>
              <OtpInput
                value={otp}
                onChange={setOtp}
                OTPLength={6}
                otpType="number"
                disabled={false}
                autoFocus
                className="opt-container "
              ></OtpInput>
              <button
                onClick={onOTPVerify}
                className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>Verify OTP</span>
              </button>
            </>
          ) : (
            <>
              <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                <BsTelephoneFill size={30} />
              </div>
              <label
                htmlFor=""
                className="font-bold text-xl text-white text-center"
              >
                Verify your phone number
              </label>
              <PhoneInput country={"in"} value={ph} onChange={setPh} />
              <button
                onClick={onSignup}
                className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>Send code via SMS</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
