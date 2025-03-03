import React from "react";
import { motion } from "framer-motion";


function AnimatedHeading({ heading, img, headingClass }) {
  return (
    <div

    className={`${headingClass}__heading`}
    style={{
      display: "flex",
    }}
    >
      <img className={`${headingClass}__img`} src={img} alt="" />
      <motion.h2
          initial={{ opacity: 0, y: '50%' }}
          whileInView={{ opacity: 1, y: '0px'
          }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.5 }}
          className={`${headingClass}__text`}>{heading}
      </motion.h2>
    </div>
  );
}

export default AnimatedHeading;
