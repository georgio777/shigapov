import { HeaderContext } from "../components/Layout";
import { useContext } from "react";

const Contacts = () => {
    // Задаем отступ у слайдера исходя из высоты хэдэра
    const headerHeight = useContext(HeaderContext);
    return (
      <div className="lcontainer" style={{ paddingTop: `${headerHeight}px` }}>
        <h1>Контакты</h1>
        <p>Здесь вы найдете контактную информацию.</p>
      </div>
    );
  };
  
  export default Contacts;
  