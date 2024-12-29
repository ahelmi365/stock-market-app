import styles from "./styles.module.css";
const { footerContainer } = styles;
const thisYear = new Date().getFullYear();
const Footer = () => {
  return (
    <footer className={footerContainer} data-testid="footer">
      © {thisYear} Stock Market. All rights reserved.
    </footer>
  );
};

export default Footer;
