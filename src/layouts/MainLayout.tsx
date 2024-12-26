import { Container } from "react-bootstrap";
import styles from "./styles.module.css";
import { Header, Footer } from "@components/common";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import SplashScreen from "@components/SplashScreen/SplashScreen";
const { container, wrapper } = styles;
const MainLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }
  return (
    <Container className={container}>
      <Header />
      <div className={`${wrapper} my-4`}>
        <Outlet />
      </div>
      <Footer />
    </Container>
  );
};

export default MainLayout;
