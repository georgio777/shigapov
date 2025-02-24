import { Link } from "react-router";
import { motion } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";

function Header({ headerHeight, setHeight }) {
  const [isVisible, setVisible] = useState(true); // Начально элемент виден
  const [lastScrollY, setLastScrollY] = useState(0); // Отслеживаем положение прокрутки
  const header = useRef();

  const handleScroll = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      // Если прокрутка идет вниз
      setVisible(false); // Скрываем элемент
    } else {
      // Если прокрутка идет вверх
      setVisible(true); // Показываем элемент
    }

    setLastScrollY(window.scrollY); // Обновляем позицию прокрутки
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll); // Добавляем обработчик прокрутки

    return () => {
      window.removeEventListener('scroll', handleScroll); // Убираем обработчик при размонтировании
    };
  }, [handleScroll]); // Зависит от handleScroll

  useEffect(() => {
    setHeight(header.current.offsetHeight);
  }, [setHeight]);

  return (
    <motion.div
      ref={header}
      className="lcontainer"
      style={{
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100%',
        zIndex: 5,
      }}
      animate={{ top: isVisible ? '0' : `-${headerHeight}px` }} // Анимация: скрытие/появление
      transition={{ duration: 0.3 }} // Длительность анимации
    >
      <header>
        <a href="/" className="header__logo">SHIGAPOV</a>
        <nav className="header__navigation">
          <Link to="/">Главная</Link>
          <Link to="/contacts">Контакты</Link>
          {/* Якорная ссылка на раздел "Цены" на главной странице */}
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
