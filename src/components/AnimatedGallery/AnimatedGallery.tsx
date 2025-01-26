import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SiteImage1 from "../../assets/business.jpeg";
import SiteImage3 from "../../assets/cashier.jpeg";
import SiteImage2 from "../../assets/Shopping.jpeg";

const AnimatedGallery = () => {
  const [ref1, inView1] = useInView({ threshold: 0.2 });
  const [ref2, inView2] = useInView({ threshold: 0.2 });
  const [ref3, inView3] = useInView({ threshold: 0.2 });

  const slideLeft = {
    hidden: { opacity: 0, x: -150 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const slideRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  return (
    <div className="space-y-16 mt-16">
      <motion.div
        ref={ref1}
        initial="hidden"
        animate={inView1 ? "visible" : "hidden"}
        variants={slideLeft}
        className="flex flex-col md:flex-row items-center justify-center gap-6 px-10"
      >
        <img
          src={SiteImage1}
          alt="Image 1"
          className="w-96 h-96 object-cover rounded-lg shadow-md"
        />
        <p className="text-lg text-gray-700 max-w-md dark:text-white">
          Making good business deals and partnerships is the foundation of
          success. We focus on building relationships that last, ensuring mutual
          growth and progress for all parties involved.
        </p>
      </motion.div>

      <motion.div
        ref={ref2}
        initial="hidden"
        animate={inView2 ? "visible" : "hidden"}
        variants={slideRight}
        className="flex flex-col md:flex-row-reverse items-center justify-center gap-6 px-10"
      >
        <img
          src={SiteImage2}
          alt="Image 2"
          className="w-96 h-96 object-cover object-top rounded-lg shadow-md"
        />
        <p className="text-lg text-gray-700 max-w-md dark:text-white">
          Shopping at our store is an experience like no other. From our wide
          range of products to unbeatable deals, you'll find everything you need
          and more, all in one place.
        </p>
      </motion.div>

      <motion.div
        ref={ref3}
        initial="hidden"
        animate={inView3 ? "visible" : "hidden"}
        variants={slideLeft}
        className="flex flex-col md:flex-row items-center justify-center gap-6 px-10"
      >
        <img
          src={SiteImage3}
          alt="Image 3"
          className="w-96 h-96 object-cover rounded-lg shadow-md"
        />
        <p className="text-lg text-gray-700 max-w-md dark:text-white">
          Our service is friendly, attentive, and always ready to help. We’re
          here to ensure your experience is smooth, enjoyable, and everything
          you need it to be.
        </p>
      </motion.div>
    </div>
  );
};

export default AnimatedGallery;
