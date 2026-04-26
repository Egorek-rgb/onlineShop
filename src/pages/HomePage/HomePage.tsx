// src/pages/HomePage/HomePage.tsx
import { useState, useEffect, useRef } from "react";
import styles from "./HomePage.module.css";
import apple from "../../assets/apple.svg";
import shopArrow from "../../assets/shopArrow.svg";
import iphone from "../../assets/iphone.png";
import iphone2 from "../../assets/iphone.png";
import iphone3 from "../../assets/iphone.png";
import iphone4 from "../../assets/iphone.png";
import iphone5 from "../../assets/iphone.png";
import arrowRight from "../../assets/navigationListArrowRight.svg";
import leftArrow from "../../assets/leftArrow.svg";
import rightArrow from "../../assets/rightArrow.svg";
import flashHeart from "../../assets/heart.svg";
import flashSalesIye from "../../assets/Iye.svg";
import star from "../../assets/star.png";
import { useCart } from "../../app/context/CartContext";

// Тип для слайда (карусель iPhone)
interface Slide {
  id: number;
  image: string;
  series: string;
  sale: string;
}

// Тип для товара в Flash Sales
interface Product {
  id: number;
  name: string;
  newCost: number;
  lastCost: number;
  discount: number;
  rating: number;
  feedbackCount: number;
}

const HomePage = () => {
  // Хук корзины для добавления товаров
  const { addToCart } = useCart();

  // Состояние активного слайда (0-4)
  const [activeSlide, setActiveSlide] = useState<number>(0);

  // Состояние для прокрутки слайдера товаров
  const [scrollIndex, setScrollIndex] = useState<number>(0);

  // Ссылка на DOM элемент слайдера для программной прокрутки
  const sliderRef = useRef<HTMLDivElement>(null);

  // Состояние для всплывающего уведомления
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
  }>({
    show: false,
    message: "",
  });

  // Состояние таймера для Flash Sales
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Массив слайдов для карусели iPhone
  const slides: Slide[] = [
    {
      id: 0,
      image: iphone,
      series: "iPhone 14 Series",
      sale: "Up to 10% off Voucher",
    },
    {
      id: 1,
      image: iphone2,
      series: "iPhone 15 Series",
      sale: "Up to 15% off Voucher",
    },
    {
      id: 2,
      image: iphone3,
      series: "iPhone 13 Series",
      sale: "Up to 8% off Voucher",
    },
    {
      id: 3,
      image: iphone4,
      series: "iPhone 12 Series",
      sale: "Up to 5% off Voucher",
    },
    {
      id: 4,
      image: iphone5,
      series: "iPhone 11 Series",
      sale: "Up to 3% off Voucher",
    },
  ];

  // Массив товаров для секции Flash Sales
  const products: Product[] = [
    {
      id: 0,
      name: "HAVIT HV-G92 Gamepad",
      newCost: 120,
      lastCost: 160,
      discount: 40,
      rating: 5,
      feedbackCount: 88,
    },
    {
      id: 1,
      name: "AK-900 Wired Keyboard",
      newCost: 960,
      lastCost: 1160,
      discount: 35,
      rating: 4,
      feedbackCount: 75,
    },
    {
      id: 2,
      name: "IPS LCD Gaming Monitor",
      newCost: 370,
      lastCost: 400,
      discount: 30,
      rating: 5,
      feedbackCount: 99,
    },
    {
      id: 3,
      name: "S-Series Comfort Chair",
      newCost: 380,
      lastCost: 400,
      discount: 25,
      rating: 4,
      feedbackCount: 65,
    },
    {
      id: 4,
      name: "HAVIT HV-G92 Gamepad",
      newCost: 120,
      lastCost: 160,
      discount: 40,
      rating: 5,
      feedbackCount: 88,
    },
    {
      id: 5,
      name: "AK-900 Wired Keyboard",
      newCost: 960,
      lastCost: 1160,
      discount: 35,
      rating: 4,
      feedbackCount: 75,
    },
    {
      id: 6,
      name: "IPS LCD Gaming Monitor",
      newCost: 370,
      lastCost: 400,
      discount: 30,
      rating: 5,
      feedbackCount: 99,
    },
    {
      id: 7,
      name: "S-Series Comfort Chair",
      newCost: 380,
      lastCost: 400,
      discount: 25,
      rating: 4,
      feedbackCount: 65,
    },
  ];

  // Таймер обратного отсчета для Flash Sales
  useEffect(() => {
    // Устанавливаем конечную дату (3 дня от текущего момента)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);
    endDate.setHours(23, 59, 59, 59); // До конца дня

    const updateTimer = () => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference <= 0) {
        // Таймер закончился
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // Расчет дней, часов, минут, секунд
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    // Запускаем таймер сразу
    updateTimer();

    // Обновляем каждую секунду
    const timer = setInterval(updateTimer, 1000);

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(timer);
  }, []);

  // Обработчик клика по точкам навигации слайдера
  const handleDotClick = (index: number) => {
    setActiveSlide(index);
  };

  // Прокрутка слайдера товаров влево
  const scrollLeft = () => {
    if (scrollIndex > 0) {
      const newIndex = scrollIndex - 1;
      setScrollIndex(newIndex);
      scrollToIndex(newIndex);
    }
  };

  // Прокрутка слайдера товаров вправо
  const scrollRight = () => {
    const maxIndex = products.length - 4; // Максимальный индекс (показываем 4 товара)
    if (scrollIndex < maxIndex) {
      const newIndex = scrollIndex + 1;
      setScrollIndex(newIndex);
      scrollToIndex(newIndex);
    }
  };

  // Функция программной прокрутки к определенному индексу
  const scrollToIndex = (index: number) => {
    if (sliderRef.current) {
      const itemWidth = 284; // Ширина одного товара (270px + 14px gap)
      sliderRef.current.scrollTo({
        left: index * itemWidth,
        behavior: "smooth", // Плавная прокрутка
      });
    }
  };

  // Функция добавления товара в корзину
  const handleAddToCart = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation(); // Останавливаем всплытие события

    // Добавляем товар в корзину через контекст
    addToCart({
      id: product.id,
      name: product.name,
      price: product.newCost,
      image: "", // Можно добавить изображение позже
    });

    // Показываем уведомление об успешном добавлении
    setNotification({
      show: true,
      message: `${product.name} added to cart! 🛒`,
    });

    // Автоматически скрываем уведомление через 2 секунды
    setTimeout(() => {
      setNotification({ show: false, message: "" });
    }, 2000);
  };

  // Форматирование чисел (добавляет ведущий ноль)
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  return (
    <>
      <div className={styles.homePage}>
        {/* Всплывающее уведомление */}
        {notification.show && (
          <div className={styles.notification}>{notification.message}</div>
        )}

        {/* Блок навигации и главного слайдера */}
        <div className={styles.homeNavigationAndSlider}>
          {/* Левая навигация с категориями */}
          <div className={styles.homeNavigation}>
            <nav className={styles.navigation}>
              <ul className={styles.navigation__list}>
                <li className={styles.navigation__listItem}>
                  <div className={styles.navigation__listItemText}>
                    Woman’s Fashion
                  </div>
                  <img src={arrowRight} alt="Arrow" />
                </li>
                <li className={styles.navigation__listItem}>
                  <div className={styles.navigation__listItemText}>
                    Men’s Fashion
                  </div>
                  <img src={arrowRight} alt="Arrow" />
                </li>
                <li className={styles.navigation__listItem}>Electronics</li>
                <li className={styles.navigation__listItem}>
                  Home & Lifestyle
                </li>
                <li className={styles.navigation__listItem}>Medicine</li>
                <li className={styles.navigation__listItem}>
                  Sports & Outdoor
                </li>
                <li className={styles.navigation__listItem}>Baby’s & Toys</li>
                <li className={styles.navigation__listItem}>
                  Groceries & Pets
                </li>
                <li className={styles.navigation__listItem}>Health & Beauty</li>
              </ul>
            </nav>
          </div>

          {/* Правый слайдер с iPhone */}
          <div className={styles.slider}>
            <div className={styles.slider__topSection}>
              {/* Текстовый контент */}
              <div className={styles.mainContent}>
                <div className={styles.mainContent__series}>
                  <img src={apple} alt="Apple" className={styles.appleImg} />
                  <div className={styles.nameOfIphone}>
                    {slides[activeSlide].series}
                  </div>
                </div>
                <div className={styles.sale}>{slides[activeSlide].sale}</div>
                <div className={styles.shop}>
                  <div className={styles.shopText}>Shop Now</div>
                  <img src={shopArrow} alt="Shop arrow" />
                </div>
              </div>

              {/* Изображение iPhone */}
              <div className={styles.sliderWrapper}>
                <div className={styles.sliderItem}>
                  <img src={slides[activeSlide].image} alt="iPhone" />
                </div>
              </div>
            </div>

            {/* Точки навигации слайдера */}
            <div className={styles.slider__bottomSection}>
              <div className={styles.dotts}>
                {slides.map((slide) => (
                  <div
                    key={slide.id}
                    className={`${styles.dott} ${
                      activeSlide === slide.id ? styles.dottActive : ""
                    }`}
                    onClick={() => handleDotClick(slide.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Секция Flash Sales */}
        <div className={styles.flashSales}>
          {/* Заголовок секции */}
          <div className={styles.flashSales__head}>
            <div className={styles.flashSales__today}>
              <div className={styles.flashSales__redRectangle}></div>
              <div className={styles.flashSales__todayRedText}>Today’s</div>
            </div>

            <div className={styles.flashSales__timeWrapper}>
              <div className={styles.flashSales__time}>
                <div className={styles.flashSales__timeText}>Flash Sales</div>

                {/* Таймер */}
                <div className={styles.flashSales__counterOfTime}>
                  <div className={styles.days}>
                    <div className={styles.days__text}>Days</div>
                    <div className={styles.days__number}>
                      {formatNumber(timeLeft.days)}
                    </div>
                  </div>
                  <div className={styles.flashSales__counterOfTimeDotts}>
                    <div className={styles.flashSales__counterOfTimeDott}></div>
                    <div className={styles.flashSales__counterOfTimeDott}></div>
                  </div>
                  <div className={styles.hours}>
                    <div className={styles.hours__text}>Hours</div>
                    <div className={styles.hours__number}>
                      {formatNumber(timeLeft.hours)}
                    </div>
                  </div>
                  <div className={styles.flashSales__counterOfTimeDotts}>
                    <div className={styles.flashSales__counterOfTimeDott}></div>
                    <div className={styles.flashSales__counterOfTimeDott}></div>
                  </div>
                  <div className={styles.minutes}>
                    <div className={styles.minutes__text}>Minutes</div>
                    <div className={styles.minutes__number}>
                      {formatNumber(timeLeft.minutes)}
                    </div>
                  </div>
                  <div className={styles.flashSales__counterOfTimeDotts}>
                    <div className={styles.flashSales__counterOfTimeDott}></div>
                    <div className={styles.flashSales__counterOfTimeDott}></div>
                  </div>
                  <div className={styles.seconds}>
                    <div className={styles.seconds__text}>Seconds</div>
                    <div className={styles.seconds__number}>
                      {formatNumber(timeLeft.seconds)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Стрелки навигации слайдера товаров */}
              <div className={styles.flashSales__sliderArrows}>
                <div
                  className={styles.flashSales__sliderLeftArrow}
                  onClick={scrollLeft}
                  style={{
                    cursor: scrollIndex === 0 ? "not-allowed" : "pointer",
                    opacity: scrollIndex === 0 ? 0.5 : 1,
                  }}
                >
                  <img src={leftArrow} alt="Scroll left" />
                </div>
                <div
                  className={styles.flashSales__sliderRightArrow}
                  onClick={scrollRight}
                  style={{
                    cursor:
                      scrollIndex >= products.length - 4
                        ? "not-allowed"
                        : "pointer",
                    opacity: scrollIndex >= products.length - 4 ? 0.5 : 1,
                  }}
                >
                  <img src={rightArrow} alt="Scroll right" />
                </div>
              </div>
            </div>
          </div>

          {/* Слайдер с товарами */}
          <div className={styles.flashSales__sliderWrapper}>
            <div className={styles.flashSales__slider} ref={sliderRef}>
              {products.map((product) => (
                <div key={product.id} className={styles.flashSales__sliderItem}>
                  {/* Карточка товара */}
                  <div className={styles.flashSales__itemWrapper}>
                    {/* Фон с изображением товара */}
                    <div className={styles.flashSales__SliderItemBackground}>
                      {/* Бейдж скидки */}
                      <div className={styles.flashSales__sale}>
                        -{product.discount}%
                      </div>

                      {/* Иконки действий (сердечко и глаз) */}
                      <div className={styles.flashSales__icons}>
                        <div className={styles.flashSales__icon}>
                          <img
                            src={flashHeart}
                            alt="Wishlist"
                            className={styles.flashSales__iconImg}
                          />
                        </div>
                        <div className={styles.flashSales__icon}>
                          <img
                            src={flashSalesIye}
                            alt="Quick view"
                            className={styles.flashSales__iconImg}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Кнопка добавления в корзину (появляется при наведении) */}
                    <button
                      className={styles.addToCartBtn}
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      Add to Cart 🛒
                    </button>
                  </div>

                  {/* Информация о товаре */}
                  <div className={styles.flashSales__SliderItemDescription}>
                    <div className={styles.flashSales__sliderItemName}>
                      {product.name}
                    </div>
                    <div className={styles.flashSales__sliderItemcost}>
                      <div className={styles.flashSales__sliderItemNewCost}>
                        ${product.newCost}
                      </div>
                      <div className={styles.flashSales__sliderItemLastCost}>
                        ${product.lastCost}
                      </div>
                    </div>
                    <div className={styles.flashSales__sliderItemRaiting}>
                      {/* Звезды рейтинга */}
                      <div className={styles.flashSales__sliderItemStars}>
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={styles.flashSales__sliderItemStar}
                          >
                            <img
                              src={star}
                              className={styles.flashSales__sliderItemStarImg}
                              alt="star"
                            />
                          </div>
                        ))}
                      </div>
                      {/* Количество отзывов */}
                      <div
                        className={styles.flashSales__sliderItemNumOfFeedback}
                      >
                        ({product.feedbackCount})
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
