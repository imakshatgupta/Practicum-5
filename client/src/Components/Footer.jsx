import logo from "../assets/logo.png";
import instagram from "../assets/instagram.svg";
import facebook from "../assets/facebook.svg";
import twitter from "../assets/twitter.svg";
import linkedin from "../assets/linkedin.svg"; 
import { Link } from "react-router-dom"; 

const customStyles = {
  boxWidth: "xl:max-w-[1280px] w-full",
  heading2:
    "font-poppins font-semibold xs:text-[48px] text-[40px] text-black xs:leading-[76.8px] leading-[66.8px] w-full",
  paragraph: "text-gray-500",
  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",
  paddingX: "sm:px-16 px-6",
  paddingY: "pb-6",
  padding: "sm:px-16 px-6 sm:py-12 py-4",
  marginX: "sm:mx-16 mx-6",
  marginY: "sm:my-16 my-6",
};

export const layout = {
  section: `flex md:flex-row flex-col ${customStyles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${customStyles.paddingY}`,
  sectionImgReverse: `flex-1 flex ${customStyles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${customStyles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,
  sectionInfo: `flex-1 ${customStyles.flexStart} flex-col`,
};

const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        name: "Content",
        link: "",
      },
      {
        name: "How it Works",
        link: "",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Help Center",
        link: "",
      },
      {
        name: "Partners",
        link: "",
      },
    ],
  },
  {
    title: "Partner",
    links: [
      {
        name: "Our Partner",
        link: "https://www.hoobank.com/our-partner/",
      },
      {
        name: "Admin Panel",
        link: "http://localhost:5173/admin",
      },
    ],
  },
];

const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];

const Footer = () => (
  <section
    className={`${customStyles.flexCenter} ${customStyles.paddingY} flex-col bg-gray-100`}
  >
    <div className={`${customStyles.flexStart} md:flex-row flex-col w-full`}>
      <div className="flex-[1] flex flex-col justify-start mr-10">
        <img src={logo} alt="Logo" className="w-[200px] object-contain" />
        <p className={`${customStyles.paragraph} mt-4 text-black`}>
          A new way to make the payments easy, reliable and secure.
        </p>
        <div className="flex mt-6">
          {socialMedia.map((social) => (
            <a key={social.id} href={social.link} target="_blank" rel="noreferrer" className="mr-6">
              <img
                src={social.icon}
                alt={social.id}
                className="w-6 h-6 object-contain hover:opacity-75"
              />
            </a>
          ))}
        </div>
      </div>

      <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
        {footerLinks.map((footerlink) => (
          <div
            key={footerlink.title}
            className="flex flex-col ss:my-0 my-4 min-w-[150px]"
          >
            <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-gray-800">
              {footerlink.title}
            </h4>
            <ul className="list-none flex flex-col mt-4">
              {footerlink.links.map((link, index) => (
                <li key={link.name} className="mb-4">
                  <Link
                    to={link.link}
                    className="font-poppins font-normal text-[16px] leading-[24px] text-gray-600 hover:text-black transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Footer;
