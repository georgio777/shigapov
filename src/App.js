import { BrowserRouter, Routes, Route} from 'react-router-dom';
import React, { useRef, useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import Header from './components/Header';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import PostPage from './pages/PostPage';
import Policy from './pages/Policy';
import './App.css';
import Scrollbar from 'smooth-scrollbar';
import { useMotionValue } from 'motion/react';


// экспорт контекста чтобы отлавливать его в animatedheading так как, smooth scrollbar перехватывает логику скроллинга и ломает анимированный заголовок
export const ScrollContext = React.createContext();


function App() {
  const scrollbarRef = useRef(null);
  const scrollY = useMotionValue(0); // Теперь это MotionValue, а не useState
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const scrollbar = Scrollbar.init(scrollbarRef.current, { damping: 0.1 });
    const updateScroll = () => {
      scrollY.set(scrollbar.offset.y); // Обновляем MotionValue
    };

    scrollbar.addListener(updateScroll);

    return () => {
      scrollbar.removeListener(updateScroll);
      scrollbar.destroy();
    };
  }, [scrollY]); // Добавляем scrollY в зависимости

  return (
    <ScrollContext.Provider value={{ scrollY }}>
      <BrowserRouter>
        <Header headerHeight={headerHeight} setHeight={setHeaderHeight} />
        <div ref={scrollbarRef} 
        style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            <Routes>
              <Route path="/" element={<Layout headerHeight={headerHeight} />}>
                {/* Главная страница */}
                <Route index element={<Home headerHeight={headerHeight} />} />
                {/* Страница контактов */}
                <Route path="contacts" element={<Contacts headerHeight={headerHeight} />} />
                <Route path="post/:id" element={<PostPage headerHeight={headerHeight} />} /> 
                <Route path="policy" element={<Policy headerHeight={headerHeight} />} />
              </Route>
            </Routes>
        </div>
      </BrowserRouter>
    </ScrollContext.Provider>
  );
}

export default App;
