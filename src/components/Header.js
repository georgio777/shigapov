import { Link } from "react-router";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";


function Header({ headerHeight, setHeight }) {
  const headerRef = useRef();

  // Устанавливаем высоту хэдера
  useEffect(() => {
    if (headerRef.current) {
      setHeight(headerRef.current.offsetHeight);
    }
  }, [setHeight]);

  return (
    <motion.div
      ref={headerRef}
      className="lcontainer"
      // animate={{ y: 0 }} // Используем y вместо top
      // transition={{ duration: 0.3, ease: 'easeInOut' }} // Плавность
      style={{
        position: 'absolute', // Фиксируем относительно контейнера
        left: 0,
        top: 0, // Начальная позиция
        width: '100%',
        zIndex: 5,
      }}
    >
      <header>
        <a href="/" className="header__logo">SHIGAPOV</a>
        <nav className="header__navigation">
          <Link to="/">Главная</Link>
          <Link to="/contacts">Контакты</Link>
          <a href="/#prices">Цены</a>
        </nav>
        <a className="header__phone" href="tel:+89118428490">8 911 842 84 90</a>
        <div className="hamburger__wrapper">
          <span className="topline"></span>
          <span className="bottomline"></span>
        </div>
      </header>
    </motion.div>
  );
}

export default Header;