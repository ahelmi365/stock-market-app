import styles from "./styles.module.css";
const { footerContainer } = styles;
const thisYear = new Date().getFullYear();
const Footer = () => {
  return (
    <div className={footerContainer}>
      © {thisYear} Stock Market. All rights reserved.
    </div>
  );
};

export default Footer;
