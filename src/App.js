import OtpInput from "otp-input-react";
import { useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import { auth, db } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Page from "./Components/Page";
const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("374");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [emaile, setEmaile] = useState("");
  const [data, setData] = useState("");
  const [info, setInfo] = useState([]);
  const [number, setNumber] = useState(null);
  const [products, setProducts] = useState([]);
  const [checkItem, setCheckItem] = useState([]);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier);
    getdata()
      .then((confirmationResult) => {
        setNumber(formatPh);
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  const getdata = async () => {
    const querySnapshot = await getDocs(collection(db, `${number}`));
    const product = await getDocs(collection(db, "information"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const products = product.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setInfo(data);
    setProducts(products);
    setLoading(false);
  };
  useEffect(() => {
    getdata();
  }, []);
  const heandleAdd = async () => {
    if (!name || !emaile || !data || !checkItem[0]) {
      alert("Warning. Sax dashter@ lracreq");
      return false;
    }
    const newData = {
      name,
      emaile,
      data,
      ...checkItem,
    };
    try {
      await addDoc(collection(db, `${number}`), {
        ...newData,
      });
    } catch (err) {
      console.log(err);
    }
    getdata();
  };
  return (
    <section className="bg-blue-300 w-full h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        <Page
          user={user}
          setName={setName}
          setEmaile={setEmaile}
          setData={setData}
          products={products}
          heandleAdd={heandleAdd}
          info={info}
          showOTP={showOTP}
          OtpInput={OtpInput}
          setOtp={setOtp}
          onOTPVerify={onOTPVerify}
          loading={loading}
          ph={ph}
          setPh={setPh}
          onSignup={onSignup}
          checkItem={checkItem}
          setCheckItem={setCheckItem}
          otp={otp}
        />
      </div>
    </section>
  );
};

export default App;
