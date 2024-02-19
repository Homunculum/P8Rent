import "./footer.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
type Props = {};

const Footer = (props: Props) => {
  const {t} = useTranslation();
  return (
    <div className="footer">
      <div className="footerContainer container">
        <div className="footerMenuDiv grid">
          <div className="singleGrid" data-aos="fade-up" data-aos-duration="1000">
            <span className="footerTitle">{t("About")}</span>
            <ul className="footerUl grid">
              <li className="footerLi"><Link to="/about">{t("About Us")}</Link></li>
              <li className="footerLi"><Link to="https://tobeto.com/istanbul-kodluyor">{t("Sponsors")}</Link></li>
              <li className="footerLi"><Link to="https://www.istka.org.tr/">{t("Affiliates")}</Link></li>
              
            </ul>
          </div>


          <div className="singleGrid" data-aos="fade-up" data-aos-duration="1600">
            <span className="footerTitle">{t("Relational Pages")}</span>
            <ul className="footerUl grid">
              <li className="footerLi"><Link to="https://tobeto.com/istanbul-kodluyor">{t("Istanbul Kodluyor")}</Link></li>
              <li className="footerLi"><Link to="https://tobeto.com/">Tobeto</Link></li>
              <li className="footerLi"><Link to="https://kodlama.io/">Kodlama.io</Link></li>
              <li className="footerLi"><Link to="https://www.enocta.com/">Enocta</Link></li>
            </ul>
          </div>

          <div className="singleGrid" data-aos="fade-up" data-aos-duration="1800">
            <span className="footerTitle">{t("Booking Support")}</span>
            <ul className="footerUl grid">
              <li className="footerLi"><Link to="/contact">{t("Contact Us")}</Link></li>
              <li className="footerLi"><Link to="/cookie-policy">{t("Cookies")}</Link></li>
              <li className="footerLi"><Link to="/privacy-policy">{t("Privacy Policy")}</Link></li>
              <li className="footerLi"><Link to="/terms-of-use">{t("Terms Of Use")}</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="lowerSection grid" data-aos="fade-up" data-aos-duration="1200">
        <p> © {currentYear} {t("All Rights Reserved By")} </p>
        <blockquote>{t("P8Rent")}</blockquote>
      </div>
    </div>
  );
};

export default Footer;