import { HeaderContext } from "../components/Layout";
import { useContext } from "react";

const Policy = () => {
    // Задаем отступ у слайдера исходя из высоты хэдэра
    const headerHeight = useContext(HeaderContext);
  return (
    <div className="lcontainer" style={{ paddingTop: `${headerHeight}px` }}>
      <h1>Политика конфиденциальности</h1>
      <p>Здесь будет политика конфиденциальности</p>
    </div>
  );
};

export default Policy;