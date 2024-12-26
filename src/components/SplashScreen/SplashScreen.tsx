import nasdaqLogo from "@assets/nasdaqLogo.svg";
const SplashScreen = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
     
        <img src={nasdaqLogo} alt="Nasdaq Logo" style={{ width: "300px", height:"100%" }} />
     
      <p className="mt-auto text-dark fw-bold">Developed By: Ali Helmi</p>
    </div>
  );
};

export default SplashScreen;
