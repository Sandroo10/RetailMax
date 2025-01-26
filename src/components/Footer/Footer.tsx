import Facebook from "../../assets/facebook.png";
import Instagram from "../../assets/instagram.png";

const Footer = () => {
  return (
    <footer className="bg-[rgb(72,166,167)] text-white text-center py-4 mt-8 dark:bg-orange-700">
      <p>&copy; 2025 RetailMax . All Rights Reserved.</p>
      <p>Follow us on </p>
      <div className="flex justify-center items-center space-x-4">
        <a
          href="https://facebook.com"
          className="text-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Facebook} className="h-5" alt="Facebook" />
        </a>
        <a
          href="https://instagram.com"
          className="text-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Instagram} className="h-5" alt="Instagram" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
