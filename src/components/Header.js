import { Link } from "react-router-dom";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useRef, useContext } from "react";
import { ScrollContext } from '../App';

function Header({ headerHeight, setHeight }) {
  const headerRef = useRef();
  const { scrollY } = useContext(ScrollContext);
  const lastScrollY = useRef(0);
  const headerY = useMotionValue(0);

  // Устанавливаем высоту хедера
  useEffect(() => {
    if (headerRef.current) {
      setHeight(headerRef.current.offsetHeight);
    }
  }, [setHeight]);

  // Следим за скроллом и анимируем хедер
  useEffect(() => {
    return scrollY.onChange((latest) => {
      const delta = latest - lastScrollY.current;
      const currentY = headerY.get();
      
      // Вычисляем новую позицию хедера
      let newY = currentY - delta;
      // Ограничиваем движение хедера
      newY = Math.min(0, Math.max(-headerHeight, newY));
      
      headerY.set(newY);
      lastScrollY.current = latest;
    });
  }, [scrollY, headerHeight, headerY]);

  // Трансформируем значение headerY в opacity для плавного появления/исчезновения
  const opacity = useTransform(
    headerY,
    [-headerHeight, -headerHeight/2, 0],
    [0, 0.5, 1]
  );

  return (
    <motion.div
      ref={headerRef}
      className="lcontainer"
      style={{
        background: '#fff0',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 5,
        y: headerY,
        opacity
      }}
      initial={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      whileHover={{
        background: '#fff',
        transition: { duration: 0.5 },
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