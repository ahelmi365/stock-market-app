import nasdaqLogo from "@assets/nasdaqLogo.svg";
import Loading from "@components/common/Loading/Loading";
const SplashScreen = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <img
        src={nasdaqLogo}
        alt="Nasdaq Logo"
        style={{ width: "300px", height: "100%" }}
      />
      <Loading />
      <p className="mt-auto text-dark fw-bold m-4">Developed By: Ali Helmi</p>
    </div>
  );
};

export default SplashScreen;
