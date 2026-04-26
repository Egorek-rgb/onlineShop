import { useState, useEffect, useRef } from "react";
import styles from "./BlackLine.module.css";
import arrowDown from "../../../assets/arrowDown.svg";

// Типы для языков
type Language = {
  code: string;
  name: string;
};

const BlackLine = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    code: "en",
    name: "English",
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: Language[] = [
    { code: "en", name: "English" },
    { code: "ru", name: "Русский" },
    { code: "uz", name: "Oʻzbek" },
    { code: "kz", name: "Қазақша" },
    { code: "zh", name: "中文" },
  ];

  // Отслеживаем изменение размера экрана
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Закрываем дропдаун при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className={styles.blackLine__wrapper}>
      <div className={styles.blackLine}>
        <div className={styles.blackLine__mainText}>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          <span className={styles.blackLine__bold}> ShopNow</span>
        </div>

        <div className={styles.blackLine__language} ref={dropdownRef}>
          <div
            className={styles.blackLine__languageText}
            onClick={toggleDropdown}
          >
            {isMobile
              ? selectedLanguage.code.toUpperCase()
              : selectedLanguage.name}
          </div>
          <div
            className={`${styles.blackLine__arrowDown} ${isOpen ? styles.rotated : ""}`}
            onClick={toggleDropdown}
          >
            <img src={arrowDown} alt="Select language" />
          </div>

          {/* Dropdown меню */}
          {isOpen && (
            <div className={styles.dropdown}>
              {languages.map((language) => (
                <div
                  key={language.code}
                  className={`${styles.dropdownItem} ${
                    selectedLanguage.code === language.code ? styles.active : ""
                  }`}
                  onClick={() => selectLanguage(language)}
                >
                  {language.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlackLine;
