import { Container } from "react-bootstrap";
import styles from "./styles.module.css";
import { Header, Footer } from "@components/common";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import SplashScreen from "@components/SplashScreen/SplashScreen";
import BackToTop from "@components/common/Card/BackToTop/BackToTop";
const { container, wrapper, backToTopContainer } = styles;
const MainLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }
  return (
    <>
      <div className={backToTopContainer}>
        <BackToTop />
      </div>
      <Container className={container}>
        <Header />

        <main className={`${wrapper} my-4`}>
          <Outlet />
        </main>
        <Footer />
      </Container>
    </>
  );
};

export default MainLayout;
