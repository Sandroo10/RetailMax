import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import SiteImage1 from "../../assets/business.jpeg";
import SiteImage2 from "../../assets/Shopping.jpeg";
import SiteImage3 from "../../assets/cashier.jpeg";

const AnimatedGallery = () => {
  const { t } = useTranslation();

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
          alt={t("gallery.image1Alt")}
          className="w-96 h-96 object-cover rounded-lg shadow-md"
        />
        <p className="text-lg text-gray-700 max-w-md dark:text-white">
          {t("gallery.image1Text")}
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
          alt={t("gallery.image2Alt")}
          className="w-96 h-96 object-cover object-top rounded-lg shadow-md"
        />
        <p className="text-lg text-gray-700 max-w-md dark:text-white">
          {t("gallery.image2Text")}
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
          alt={t("gallery.image3Alt")}
          className="w-96 h-96 object-cover rounded-lg shadow-md"
        />
        <p className="text-lg text-gray-700 max-w-md dark:text-white">
          {t("gallery.image3Text")}
        </p>
      </motion.div>
    </div>
  );
};

export default AnimatedGallery;
