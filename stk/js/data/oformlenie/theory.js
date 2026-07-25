/**
 * OFORMLENIE THEORY MODULE
 * Теория по разделу "Оформление"
 */

const OFORMLENIE_THEORY = `
    <!-- Якорная навигация -->
    <nav class="theory-nav" style="margin-bottom: 28px; padding: 14px 20px; background: #f5f7fa; border-radius: 10px; display: flex; flex-wrap: wrap; gap: 6px 18px; border: 1px solid #e2e6ed;">
        <a href="#section-tariffs" style="color: #0066cc; text-decoration: none; font-weight: 500; font-size: 14px;">📶 Тарифы</a>
        <a href="#section-oformlenie" style="color: #0066cc; text-decoration: none; font-weight: 500; font-size: 14px;">📋 Оформление</a>
        <a href="#section-rules" style="color: #0066cc; text-decoration: none; font-weight: 500; font-size: 14px;">🏷️ Маркировка, идентификация, координация</a>
        <a href="#section-mistakes" style="color: #0066cc; text-decoration: none; font-weight: 500; font-size: 14px;">⚠️ Ошибки</a>
        <a href="#section-recommendations" style="color: #0066cc; text-decoration: none; font-weight: 500; font-size: 14px;">📌 Рекомендации</a>
        <a href="#section-montazh" style="color: #0066cc; text-decoration: none; font-weight: 500; font-size: 14px;">🔧 Монтаж и питание</a>
    </nav>
<section class="st-contacts-section">
  <style>
    .st-contacts-section {
      font-family: Arial, Helvetica, sans-serif;
      padding: 40px 20px;
      background-color: #f5f5f5;
      box-sizing: border-box;
    }

    .st-contacts-section *,
    .st-contacts-section *::before,
    .st-contacts-section *::after {
      box-sizing: inherit;
    }

    .st-card {
      max-width: 850px;
      margin: 0 auto;
      background-color: #ffffff;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
      overflow: hidden;
      color: #1a1a1a;
    }

    /* Шапка секции */
    .st-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 30px 0 20px 35px;
      flex-wrap: wrap;
      gap: 20px;
    }

    .st-logo-block {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .st-logo-title {
      font-size: 32px;
      font-weight: 800;
      letter-spacing: -0.5px;
      font-family: 'Arial Narrow', Arial, sans-serif;
      margin: 0;
    }

    .st-hotline-block {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .st-hotline-badge {
      background-color: #b71c1c;
      color: #ffffff;
      font-size: 18px;
      font-weight: bold;
      padding: 8px 35px 8px 20px;
      letter-spacing: 0.5px;
      text-decoration: none;
      display: inline-block;
    }

    .st-hotline-badge:hover {
      background-color: #9f1515;
    }

    .st-slogan {
      font-size: 28px;
      color: #222222;
      margin: 10px 0 0 0;
      padding-right: 35px;
      font-weight: 400;
    }

    /* Сетка городов */
    .st-contacts-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding: 15px 35px 35px 35px;
      gap: 20px;
      align-items: center;
    }

    .st-col-left { text-align: left; }
    .st-col-center { text-align: center; }
    .st-col-right { text-align: right; }

    .st-city-item {
      margin-bottom: 18px;
    }

    .st-city-item:last-child {
      margin-bottom: 0;
    }

    .st-city-name {
      color: #b71c1c;
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 2px;
    }

    .st-city-phone {
      font-size: 21px;
      font-weight: 600;
      color: #1a1a1a;
      text-decoration: none;
    }

    .st-city-phone:hover {
      text-decoration: underline;
    }

    /* Нижний блок услуг */
    .st-services-bar {
      background-color: #b71c1c;
      color: #ffffff;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding: 16px 35px;
    }

    .st-service-left { text-align: left; }
    .st-service-center { text-align: center; }
    .st-service-right { text-align: right; }

    .st-service-title {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 2px;
    }

    .st-service-sub {
      font-size: 14px;
      font-weight: normal;
      opacity: 0.95;
    }

    /* Адаптивность */
    @media (max-width: 680px) {
      .st-header {
        padding: 20px;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      .st-hotline-block {
        align-items: center;
        width: 100%;
      }
      .st-hotline-badge {
        padding: 10px 20px;
        width: 100%;
        text-align: center;
      }
      .st-slogan {
        padding-right: 0;
        font-size: 22px;
      }
      .st-contacts-grid,
      .st-services-bar {
        grid-template-columns: 1fr;
        text-align: center;
      }
      .st-col-left, .st-col-center, .st-col-right,
      .st-service-left, .st-service-center, .st-service-right {
        text-align: center;
      }
      .st-services-bar {
        gap: 15px;
      }
    }
  </style>

  <div class="st-card">
    <!-- Шапка -->
    <div class="st-header">
      <div class="st-logo-block">
        <svg width="85" height="75" viewBox="0 0 100 90" xmlns="http://w3.org" aria-hidden="true">
          <path d="M50,5 C24,5 5,24 5,48 C5,56 7,63 11,69 L89,69 C93,63 95,56 95,48 C95,24 76,5 50,5 Z" fill="#b71c1c"/>
          <path d="M22,68 Q32,35 65,18 Q38,38 28,68 Z" fill="#ffffff"/>
          <path d="M12,73 Q50,70 88,73 Q50,75 12,73 Z" fill="#b71c1c"/>
          <path d="M20,78 Q50,76 80,78 Q50,80 20,78 Z" fill="#b71c1c"/>
          <path d="M30,83 Q50,82 70,83 Q50,84 30,83 Z" fill="#b71c1c"/>
        </svg>
        <h2 class="st-logo-title">«Солнце Телеком»</h2>
      </div>

      <div class="st-hotline-block">
        <a href="tel:88007550055" class="st-hotline-badge">Горячая линия 8-800-75-500-55</a>
        <p class="st-slogan">Развиваемся для вас</p>
      </div>
    </div>

    <!-- Контакты по городам -->
    <div class="st-contacts-grid">
      <div class="st-col-left">
        <div class="st-city-item">
          <div class="st-city-name">Анива:</div>
          <a href="tel:84244141355" class="st-city-phone">8 (42441) 4-13-55</a>
        </div>
        <div class="st-city-item">
          <div class="st-city-name">Холмск:</div>
          <a href="tel:84243340126" class="st-city-phone">8 (42433) 4-01-26</a>
        </div>
        <div class="st-city-item">
          <div class="st-city-name">Поронайск:</div>
          <a href="tel:84243155455" class="st-city-phone">8 (42431) 5-54-55</a>
        </div>
      </div>

      <div class="st-col-center">
        <div class="st-city-item">
          <div class="st-city-name">Смирных:</div>
          <a href="tel:84245241022" class="st-city-phone">8 (42452) 4-10-22</a>
        </div>
        <div class="st-city-item">
          <div class="st-city-name">Тымовск:</div>
          <a href="tel:84244721200" class="st-city-phone">8 (42447) 21-200</a>
        </div>
      </div>

      <div class="st-col-right">
        <div class="st-city-item">
          <div class="st-city-name">Долинск:</div>
          <a href="tel:84244226759" class="st-city-phone">8 (42442) 26-7-59</a>
        </div>
        <div class="st-city-item">
          <div class="st-city-name">Корсаков:</div>
          <a href="tel:84243545357" class="st-city-phone">8 (42435) 4-53-57</a>
        </div>
      </div>
    </div>

    <!-- Услуги -->
    <div class="st-services-bar">
      <div class="st-service-left">
        <div class="st-service-title">Интернет</div>
        <div class="st-service-sub">оптоволокно</div>
      </div>
      <div class="st-service-center">
        <div class="st-service-title">Телевидение</div>
        <div class="st-service-sub">200+ каналов</div>
      </div>
      <div class="st-service-right">
        <div class="st-service-title">Домашняя</div>
        <div class="st-service-sub">телефония</div>
      </div>
    </div>
  </div>
  <h3 style="margin: 16px 0 8px 0; color: #2c3e50; text-align: center;">Телефон закрытия подключений через робота: 515326</h3>
</section>

    <!-- ============================================================ -->
    <!-- СЕКЦИЯ 0: ТАРИФЫ                                             -->
    <!-- ============================================================ -->
    <section id="section-tariffs" style="scroll-margin-top: 16px; margin-bottom: 28px; padding: 16px 20px 20px 20px; background: #fafbfc; border-radius: 8px; border-left: 4px solid #2980b9;"

        <h4 style="margin-top: 0; margin-bottom: 12px; color: #1a2b3c;">📶 Tарифы</h4>

        <!-- ——— Тарифы для многоквартирных домов ——— -->
        <h5 style="margin: 16px 0 8px 0; color: #2c3e50;">🏢 Tарифы для многоквартирных домов</h5>

        <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; align-items: stretch;">
            <div style="flex: 1 1 200px; max-width: 260px; background: white; border: 2px solid #e0e0e0; border-radius: 12px; padding: 20px; display: flex; flex-direction: column;">
                <div style="font-size: 18px; font-weight: 600; margin-bottom: 12px; color: #333; text-align: center;">Болид</div>
                <div style="flex: 1;">
                    <div style="font-size: 13px; color: #666; margin-bottom: 6px;">🌐 Интернет до 100 Мбит/с</div>
                    <div style="font-size: 13px; color: #666; margin-bottom: 16px;">🎁 Подключение бесплатно</div>
                </div>
                <div style="text-align: center; margin-top: auto;">
                    <div style="font-size: 28px; font-weight: 700; color: #333;">1200 <span style="font-size: 14px; color: #666;">руб.</span></div>
                    <button style="display: block; width: 100%; padding: 10px; margin-top: 12px; background: #ff4757; color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer;">ПОДКЛЮЧИТЬ</button>
                </div>
            </div>

            <div style="flex: 1 1 200px; max-width: 260px; background: white; border: 2px solid #e0e0e0; border-radius: 12px; padding: 20px; display: flex; flex-direction: column;">
                <div style="font-size: 18px; font-weight: 600; margin-bottom: 12px; color: #333; text-align: center;">Солнце</div>
                <div style="flex: 1;">
                    <div style="font-size: 13px; color: #666; margin-bottom: 6px;">🌐 Интернет до 200 Мбит/с</div>
                    <div style="font-size: 13px; color: #666; margin-bottom: 16px;">🎁 Подключение бесплатно</div>
                </div>
                <div style="text-align: center; margin-top: auto;">
                    <div style="font-size: 28px; font-weight: 700; color: #333;">1300 <span style="font-size: 14px; color: #666;">руб.</span></div>
                    <button style="display: block; width: 100%; padding: 10px; margin-top: 12px; background: #ff4757; color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer;">ПОДКЛЮЧИТЬ</button>
                </div>
            </div>

            <div style="flex: 1 1 200px; max-width: 260px; background: white; border: 2px solid #e0e0e0; border-radius: 12px; padding: 20px; display: flex; flex-direction: column;">
                <div style="font-size: 18px; font-weight: 600; margin-bottom: 12px; color: #333; text-align: center;">Ураган</div>
                <div style="flex: 1;">
                    <div style="font-size: 13px; color: #666; margin-bottom: 6px;">🌐 Интернет до 100 Мбит/с</div>
                    <div style="font-size: 13px; color: #666; margin-bottom: 6px;">📺 Более 180 цифровых каналов</div>
                    <div style="font-size: 13px; color: #666; margin-bottom: 16px;">🎁 Подключение бесплатно</div>
                </div>
                <div style="text-align: center; margin-top: auto;">
                    <div style="font-size: 28px; font-weight: 700; color: #333;">1400 <span style="font-size: 14px; color: #666;">руб.</span></div>
                    <button style="display: block; width: 100%; padding: 10px; margin-top: 12px; background: #ff4757; color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer;">ПОДКЛЮЧИТЬ</button>
                </div>
            </div>

            <div style="flex: 1 1 200px; max-width: 260px; background: white; border: 2px solid #e0e0e0; border-radius: 12px; padding: 20px; display: flex; flex-direction: column;">
                <div style="font-size: 18px; font-weight: 600; margin-bottom: 12px; color: #333; text-align: center;">Космос</div>
                <div style="flex: 1;">
                    <div style="font-size: 13px; color: #666; margin-bottom: 6px;">🌐 Интернет до 200 Мбит/с</div>
                    <div style="font-size: 13px; color: #666; margin-bottom: 6px;">📺 Более 180 цифровых каналов</div>
                    <div style="font-size: 13px; color: #666; margin-bottom: 16px;">🎁 Подключение бесплатно</div>
                </div>
                <div style="text-align: center; margin-top: auto;">
                    <div style="font-size: 28px; font-weight: 700; color: #333;">1500 <span style="font-size: 14px; color: #666;">руб.</span></div>
                    <button style="display: block; width: 100%; padding: 10px; margin-top: 12px; background: #ff4757; color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer;">ПОДКЛЮЧИТЬ</button>
                </div>
            </div>

            <div style="flex: 1 1 200px; max-width: 260px; background: white; border: 2px solid #e0e0e0; border-radius: 12px; padding: 20px; display: flex; flex-direction: column;">
                <div style="font-size: 18px; font-weight: 600; margin-bottom: 12px; color: #333; text-align: center;">Турбо</div>
                <div style="flex: 1;">
                    <div style="font-size: 13px; color: #666; margin-bottom: 6px;">🌐 Интернет до 500 Мбит/с</div>
                    <div style="font-size: 13px; color: #666; margin-bottom: 16px;">🎁 Подключение бесплатно</div>
                </div>
                <div style="text-align: center; margin-top: auto;">
                    <div style="font-size: 28px; font-weight: 700; color: #333;">2000 <span style="font-size: 14px; color: #666;">руб.</span></div>
                    <button style="display: block; width: 100%; padding: 10px; margin-top: 12px; background: #ff4757; color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer;">ПОДКЛЮЧИТЬ</button>
                </div>
            </div>
        </div>

        <!-- ——— Тарифы для частных домов ——— -->
        <h5 style="margin: 24px 0 8px 0; color: #2c3e50;">🏡 Tарифы для частных домов</h5>

        <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; align-items: stretch;">
            <div style="flex: 1 1 200px; max-width: 260px; background: white; border: 2px solid #e0e0e0; border-radius: 12px; padding: 20px; display: flex; flex-direction: column;">
                <div style="font-size: 18px; font-weight: 600; margin-bottom: 12px; color: #333; text-align: center;">Домашний 50</div>
                <div style="flex: 1;">
                    <div style="font-size: 13px; color: #666; margin-bottom: 6px;">🌐 Интернет до 50 Мбит/с</div>
                    <div style="font-size: 13px; color: #666; margin-bottom: 6px;">📺 Более 180 цифровых каналов</div>
                    <div style="font-size: 13px; color: #666; margin-bottom: 6px;">⚡ Ночное ускорение</div>
                    <div style="font-size: 13px; color: #666; margin-bottom: 16px;">🎁 Подключение бесплатно</div>
                </div>
                <div style="text-align: center; margin-top: auto;">
                    <div style="font-size: 28px; font-weight: 700; color: #333;">1800 <span style="font-size: 14px; color: #666;">руб.</span></div>
                    <button style="display: block; width: 100%; padding: 10px; margin-top: 12px; background: #ff4757; color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer;">ПОДКЛЮЧИТЬ</button>
                </div>
            </div>

            <div style="flex: 1 1 200px; max-width: 260px; background: white; border: 2px solid #e0e0e0; border-radius: 12px; padding: 20px; display: flex; flex-direction: column;">
                <div style="font-size: 18px; font-weight: 600; margin-bottom: 12px; color: #333; text-align: center;">Домашний 100</div>
                <div style="flex: 1;">
                    <div style="font-size: 13px; color: #666; margin-bottom: 6px;">🌐 Интернет до 100 Мбит/с</div>
                    <div style="font-size: 13px; color: #666; margin-bottom: 6px;">📺 Более 180 цифровых каналов</div>
                    <div style="font-size: 13px; color: #666; margin-bottom: 16px;">🎁 Подключение бесплатно</div>
                </div>
                <div style="text-align: center; margin-top: auto;">
                    <div style="font-size: 28px; font-weight: 700; color: #333;">1900 <span style="font-size: 14px; color: #666;">руб.</span></div>
                    <button style="display: block; width: 100%; padding: 10px; margin-top: 12px; background: #ff4757; color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer;">ПОДКЛЮЧИТЬ</button>
                </div>
            </div>

            <div style="flex: 1 1 200px; max-width: 260px; background: white; border: 2px solid #e0e0e0; border-radius: 12px; padding: 20px; display: flex; flex-direction: column;">
                <div style="font-size: 18px; font-weight: 600; margin-bottom: 12px; color: #333; text-align: center;">Домашний 200</div>
                <div style="flex: 1;">
                    <div style="font-size: 13px; color: #666; margin-bottom: 6px;">🌐 Интернет до 200 Мбит/с</div>
                    <div style="font-size: 13px; color: #666; margin-bottom: 6px;">📺 Более 180 цифровых каналов</div>
                    <div style="font-size: 13px; color: #666; margin-bottom: 16px;">🎁 Подключение бесплатно</div>
                </div>
                <div style="text-align: center; margin-top: auto;">
                    <div style="font-size: 28px; font-weight: 700; color: #333;">2000 <span style="font-size: 14px; color: #666;">руб.</span></div>
                    <button style="display: block; width: 100%; padding: 10px; margin-top: 12px; background: #ff4757; color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer;">ПОДКЛЮЧИТЬ</button>
                </div>
            </div>

            <div style="flex: 1 1 200px; max-width: 260px; background: white; border: 2px solid #e0e0e0; border-radius: 12px; padding: 20px; display: flex; flex-direction: column;">
                <div style="font-size: 18px; font-weight: 600; margin-bottom: 12px; color: #333; text-align: center;">Турбо</div>
                <div style="flex: 1;">
                    <div style="font-size: 13px; color: #666; margin-bottom: 6px;">🌐 Интернет до 500 Мбит/с</div>
                    <div style="font-size: 13px; color: #666; margin-bottom: 16px;">🎁 Подключение бесплатно</div>
                </div>
                <div style="text-align: center; margin-top: auto;">
                    <div style="font-size: 28px; font-weight: 700; color: #333;">2500 <span style="font-size: 14px; color: #666;">руб.</span></div>
                    <button style="display: block; width: 100%; padding: 10px; margin-top: 12px; background: #ff4757; color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer;">ПОДКЛЮЧИТЬ</button>
                </div>
            </div>
        </div>
    </section>

    <!-- ============================================================ -->
    <!-- СЕКЦИЯ 1: ОФОРМЛЕНИЕ (стоимость, бесплатно, доп. условия)    -->
    <!-- ============================================================ -->
    <section id="section-oformlenie" style="scroll-margin-top: 16px; margin-bottom: 28px; padding: 16px 20px 20px 20px; background: #fafbfc; border-radius: 8px; border-left: 4px solid #2d7b46;">
        <h4 style="margin-top: 0; margin-bottom: 12px; color: #1a2b3c;">📋 Оформление</h4>

        <h5 style="margin: 16px 0 8px 0; color: #2c3e50;">💰 Стоимость вызова мастера</h5>
        <ul style="margin: 0 0 16px 0; padding-left: 20px;">
            <li><strong>Вызов по жалобе ТВ или Интернет (ЧД)</strong> — 2000 рублей (без учёта материала)</li>
            <li><strong>Вызов по жалобе ТВ (МКД)</strong> — 1000 рублей (без учёта материала)</li>
            <li><strong>Вызов по жалобе интернета (МКД)</strong> — 1000 рублей (без учёта материала).</li>
        </ul>

        <h5 style="margin: 16px 0 8px 0; color: #2c3e50;">🔧 Бесплатные услуги</h5>
        <ul style="margin: 0 0 16px 0; padding-left: 20px;">
            <li>Подключение в МКД с активацией: ТВ (до 2 телевизоров) и Инет для абонента — <strong>бесплатно</strong></li>
            <li>Подключение в МКД без активации: ТВ (до 2 телевизоров) и Инет для абонента — <strong>бесплатно, но нужно внести ??? сумму на счет, которая замораживается до активации</strong></li>
            <li>Подключение ЧД с активацией(Инет и ТВ): ТВ (1 телевизор) и Инет для абонента — <strong>бесплатно</strong></li>
            <li>Подключение ЧД (ТВ): ТВ (1 телевизор) — <strong>бесплатно, но нужно оплатить за год вперед(6000 руб.). Далее 500 руб. в месяц.</strong></li>
            <li>Подключение ЧД без активации(Инет и ТВ): ТВ (1 телевизор) и Инет для абонента(ONT на оставлять) — <strong>бесплатно, нужно внести ??? сумму на счет, которая замораживается до активации</strong></li>
            <li>Если проблема не на стороне абонента — вызов <strong>бесплатный</strong></li>
        </ul>

        <h5 style="margin: 16px 0 8px 0; color: #2c3e50;">📋 Платные услуги.</h5>
        <h5 style="margin: 16px 0 8px 0; color: #2c3e50;">Подключение ТВ (МКД).</h5>
        <ul style="margin: 0 0 16px 0; padding-left: 20px;">
            <li>3-ий тв.: + 1000 рублей + материал + доп. 1 час. За следующий также.</li>
            <li>Укладка кабеля: ??? рублей + материал + доп. 1 час.(Телевизоры не вешаем.)</li>
        </ul>

        <h5 style="margin: 16px 0 8px 0; color: #2c3e50;">IPTV.</h5>
        <ul style="margin: 0 0 16px 0; padding-left: 20px;">
            <li>В аренду — только 1 приставка</li>
            <li>25 р/мес — 1-й год</li>
            <li>100 р/мес — со 2-го года</li>
            <li>Вторая и последующая — на выкуп 7300 р</li>
            <li>Если сломали — приставка на выкуп</li>
            <li>Абон. — 300 р/мес → подписка 147 р</li>
            <li>IP-канала для взрослых +250 р</li>
            <li>Можно смотреть YouTube</li>
            <li>Если 2 приставки — к аб. +40 руб за каждую приставку</li>
        </ul>

        <h5 style="margin: 16px 0 8px 0; color: #2c3e50;">Подключение Инет.</h5>
        <ul style="margin: 0 0 16px 0; padding-left: 20px;">
            <li>Кабель в МКД длиннее 3 метров оплачивается абонентом дополнительно при подключении</li>
            <li>Аренда GPON-приставки — <strong>1 рубль</strong> в месяц</li>
            <li>Замена GPON-приставки — <strong>5500 рублей</strong>. При замене GPON-приставки плата за вызов мастера <strong>не берётся</strong></li>
            <li>Ремонт оптического кабеля в частном доме:<br>
                — 3500 ₽ — если есть возможность восстановить кабель сваркой.<br>
                — 5000 ₽ — перезавод с ШОРА с первого столба
            </li>
            <li>Доп. телевизор GPON при подключении — +1500 рублей + материал</li>
        </ul>
    </section>

    <!-- ============================================================ -->
    <!-- СЕКЦИЯ 2: ПРАВИЛА МАРКИРОВКИ, ИДЕНТИФИКАЦИИ И КООРДИНАЦИИ   -->
    <!-- ============================================================ -->
    <section id="section-rules" style="scroll-margin-top: 16px; margin-bottom: 28px; padding: 16px 20px 20px 20px; background: #fafbfc; border-radius: 8px; border-left: 4px solid #c0392b;">
        <h4 style="margin-top: 0; margin-bottom: 12px; color: #1a2b3c;">🏷️ Правила маркировки кабелей, идентификации абонентов и координации работ</h4>

        <!-- ——— Маркировка ——— -->
        <h5 style="margin: 16px 0 8px 0; color: #2c3e50;">🏷️ Маркировка кабеля (обязательное требование)</h5>
        <ul style="margin: 0 0 16px 0; padding-left: 20px;">
            <li><strong>Кабель обязательно должен быть подписан.</strong> Это критически важно, так как при отключении по цифрам (номерам квартир) легко ошибиться.</li>
            <li><strong>Формат подписи:</strong>
                <ul style="margin: 6px 0 0 0; padding-left: 20px;">
                    <li>Указывается <strong>номер квартиры</strong> и <strong>этаж</strong> (например: <code style="background: #eef2f7; padding: 1px 6px; border-radius: 4px;">2/3 (2/3э)</code> — квартира 2, этаж 3).</li>
                    <li>Если в квартире несколько абонентов, добавляется дробная часть: <code style="background: #eef2f7; padding: 1px 6px; border-radius: 4px;">2/1</code>, <code style="background: #eef2f7; padding: 1px 6px; border-radius: 4px;">2/2</code> и т.д.</li>
                </ul>
            </li>
            <li><strong>Почему это важно:</strong> Без подписи, когда вы открываете ящик, невозможно понять, какой кабель к кому ведет. Особенно актуально при нестандартных подключениях (съемщики, раздельное проживание).</li>
        </ul>

        <h5 style="margin: 16px 0 8px 0; color: #2c3e50;">📐 Технические требования к подписи</h5>
        <ul style="margin: 0 0 16px 0; padding-left: 20px;">
            <li><strong>Читаемость:</strong> цифры должны быть четкими (толщина ~2 мм, высота ~1 см).</li>
            <li><strong>Расположение на телевизионном кабеле:</strong>
                <ul style="margin: 6px 0 0 0; padding-left: 20px;">
                    <li><em>Верхние отводы:</em> первая цифра — выше середины, вторая — по центру.</li>
                    <li><em>Нижние отводы (ближе к коннектору):</em> первая цифра — на расстоянии 0,5 см от коннектора, вторая — по центру.</li>
                </ul>
            </li>
            <li><strong>Важно:</strong> Если изолируете кабель, то изолируйте <strong>от коннектора до изгиба</strong>. Если изолировать только посередине, изоляция со временем рассохнется и отойдет, и подпись станет бесполезной.</li>
        </ul>

        <!-- ——— Идентификация ——— -->
        <h5 style="margin: 16px 0 8px 0; color: #2c3e50;">🔍 Идентификация абонента на месте</h5>
        <ul style="margin: 0 0 16px 0; padding-left: 20px;">
            <li><strong>Проверяйте нумерацию.</strong> При заходе в подъезд сверяйте номера квартир (например, если заявка на 55-ю, а в подъезде нумерация с 50-й по 70-ю — пересчитайте этажи).</li>
            <li>Если нумерация не совпадает (например, поднялись на 5-й этаж, а номер не тот) — спуститесь, пересчитайте заново, проверьте у соседей.</li>
            <li><strong>Сверяйте с биллингом.</strong> Номер подъезда, этаж и квартира в отчете (биллинге) должны строго совпадать с фактическими.</li>
        </ul>

        <h5 style="margin: 16px 0 8px 0; color: #2c3e50;">🏠 Работа с «нестандартными» квартирами</h5>
        <ul style="margin: 0 0 16px 0; padding-left: 20px;">
            <li>Если в квартире живут несколько абонентов (например, собственник и съемщики) — каждый кабель подписывается отдельно.</li>
            <li>Данные о таких подключениях <strong>обязательно вносятся в биллинг</strong> и договор.</li>
            <li><strong>Пример ошибки:</strong> мастер видит кабель, подписанный как «вторая квартира, второй этаж», и может перепутать, если подпись не соответствует реальному адресу.</li>
        </ul>

        <!-- ——— Координация ——— -->
        <h5 style="margin: 16px 0 8px 0; color: #2c3e50;">🤝 Координация работ и оповещение</h5>
        <ul style="margin: 0; padding-left: 20px;">
            <li><strong>Плановые работы:</strong> За сутки предупредите абонента (например: «Советская 31, 1-й подъезд, кв. 1–20 — отключение ТВ»).</li>
            <li><strong>Аварийные работы:</strong> Оповестите техотдел и мониторинг, чтобы на жалобу не отправили другого мастера.</li>
            <li><strong>Важно:</strong> Если вы работаете в подъезде, а кто-то другой (монтажники, сварщики) делает свои работы — <strong>обязательно предупредите мониторинг</strong>. Иначе при обрыве линии или отключении будет путаница, кто за что отвечает.</li>
        </ul>
    </section>

    <!-- ============================================================ -->
    <!-- РАЗДЕЛ 3: Частые ошибки -->
    <!-- ============================================================ -->
    <section id="section-mistakes" style="scroll-margin-top: 16px; margin-bottom: 28px; padding: 16px 20px 20px 20px; background: #fafbfc; border-radius: 8px; border-left: 4px solid #d35400;">
        <h4 style="margin-top: 0; margin-bottom: 12px; color: #1a2b3c;">⚠️ Частые ошибки и проблемы</h4>
        <ul style="margin: 0; padding-left: 20px;">
            <li><strong>Отключение не того абонента.</strong> Если под одной квартирой числится несколько должников, можно случайно отключить «живого» абонента. Это ведет к негативу и лишней работе.</li>
            <li><strong>Несовпадение с биллингом.</strong> Если в отчете адрес один, а на деле другой — мастер тратит время на поиски.</li>
            <li><strong>Смена жильцов.</strong> Бывший абонент (Бобров) не расторг договор, новый (Кочкин) подключается — в будущем это создает путаницу при отключениях.</li>
        </ul>
    </section>

    <!-- ============================================================ -->
    <!-- РАЗДЕЛ 4: Итоговые рекомендации -->
    <!-- ============================================================ -->
    <section id="section-recommendations" style="scroll-margin-top: 16px; margin-bottom: 28px; padding: 16px 20px 20px 20px; background: #f0f7ee; border-radius: 8px; border-left: 4px solid #27ae60;">
        <h4 style="margin-top: 0; margin-bottom: 12px; color: #1a2b3c;">📌 Итоговые рекомендации</h4>
        <ul style="margin: 0; padding-left: 20px;">
            <li><strong>Кабель = подпись.</strong> Это снимает 90% ошибок.</li>
            <li>Сверяйте адрес с нумерацией на подъезде и в биллинге.</li>
            <li>Всегда предупреждайте техотдел и мониторинг о своих работах.</li>
            <li>Если ситуация нестандартная — <strong>звоните старшему</strong> и уточняйте.</li>
            <li>При любой жалобе абонента («не показывает») — проверяйте историю подключений, чтобы не отключить чужого абонента.</li>
        </ul>
    </section>

    <!-- ============================================================ -->
    <!-- РАЗДЕЛ 5: МОНТАЖ И ПИТАНИЕ (добавлен в конец) -->
    <!-- ============================================================ -->
    <section id="section-montazh" style="scroll-margin-top: 16px; margin-bottom: 28px; padding: 16px 20px 20px 20px; background: #fafbfc; border-radius: 8px; border-left: 4px solid #8e44ad;">
        <h4 style="margin-top: 0; margin-bottom: 12px; color: #1a2b3c;">🔧 Монтаж и питание</h4>

        <!-- ——— 1. Главное правило прокладки кабеля ——— -->
        <h5 style="margin: 16px 0 8px 0; color: #2c3e50;">📌 Главное правило прокладки кабеля: ОТ ЭТАЖА К ЯЩИКУ</h5>
        <p style="margin: 4px 0 8px 0;"><strong>Категорически запрещено</strong> тянуть коаксиальный кабель от распределительного ящика вниз, к абоненту. Это грубая ошибка, ведущая к обрывам и провисаниям.</p>
        <p style="margin: 4px 0 8px 0;"><strong>Как правильно:</strong> Монтаж всегда ведется <strong>С ЭТАЖА ДО ЯЩИКА</strong>. Вы заходите на этаж, закрепляете бухту в ящике и протягиваете кабель вниз, к квартире. Это позволяет избежать запутывания, обеспечивает контроль натяжения и предотвращает случайное выдергивание кабеля из ящика при работах в щитовой.</p>
        <p style="margin: 4px 0 16px 0;"><strong>Почему это важно:</strong> При монтаже «от ящика» кабель часто оставляют с малым запасом, он висит под нагрузкой и со временем выпадает из коннектора (особенно на первых этажах, где трубы обрезаны, а не заведены в отверстия). В случае, если кабель протянут «от ящика», при случайном дергании (электрики, другие работы) он выскальзывает, и абонент теряет сигнал.</p>

        <!-- ——— 2. Организация пучка ——— -->
        <h5 style="margin: 16px 0 8px 0; color: #2c3e50;">📌 Организация пучка (жгута) кабелей в щитовой</h5>
        <p style="margin: 4px 0 8px 0;"><strong>Принцип «ОДНОГО ПУЧКА»</strong>. Все кабели от абонентов должны быть собраны в единую аккуратную косу.</p>
        <p style="margin: 4px 0 8px 0;"><strong>Чего делать нельзя:</strong></p>
        <ul style="margin: 0 0 8px 0; padding-left: 20px;">
            <li>Вплетать свои кабели в чужие стойки или трубы.</li>
            <li>Вести кабели разрозненно: один слева, другой справа, третий сзади.</li>
        </ul>
        <p style="margin: 4px 0 8px 0;"><strong>Почему:</strong> Если потребуется ремонт щитовой или замена линии, техническому персоналу придется перерезать стяжки. При «разбросанном» монтаже ваши кабели окажутся спутанными с чужими, их сложно идентифицировать, и при срезке стяжек велик риск повредить вашу линию.</p>
        <p style="margin: 4px 0 16px 0;"><strong>Как правильно:</strong> Все абонентские кабели собираются в один общий пучок, который идет по направлению основного стояка. Домофонные и интернет-кабели (ТВК, ТСПВ) монтируются аналогично — единым жгутом.</p>

        <!-- ——— 3. Зачистка коннекторов ——— -->
        <h5 style="margin: 16px 0 8px 0; color: #2c3e50;">📌 Зачистка коннекторов и крепление жилы</h5>
        <ul style="margin: 0 0 16px 0; padding-left: 20px;">
            <li>Крепите кабель в ящике плотно, с небольшим запасом, но без провисаний, которые создают «рычаг» на коннектор.</li>
        </ul>

        <!-- ——— 4. Крепление площадок ——— -->
        <h5 style="margin: 16px 0 8px 0; color: #2c3e50;">📌 Крепление площадок (клипс/скоб) в подъезде</h5>
        <p style="margin: 4px 0 8px 0;"><strong>Количество:</strong> На стандартном этаже (высота 2,7–2,8 м) должно быть установлено <strong>ровно 5 площадок</strong> (клипс), а не 4, 7 или 8.</p>
        <p style="margin: 4px 0 8px 0;"><strong>Критический участок:</strong> Промежуток от пола до первой площадки (примерно 1 метр 20 см). Именно этот участок чаще всего задевают сумками, велосипедами и ногами. Поэтому <strong>этот промежуток должен быть закреплен чаще</strong> — примерно каждые 40 см.</p>
        <p style="margin: 4px 0 8px 0;"><strong>Как правильно затягивать площадки:</strong> Чтобы клипса не разворачивалась и не «гуляла» от случайных зацепок:</p>
        <ul style="margin: 0 0 8px 0; padding-left: 20px;">
            <li>Верхнюю площадку при монтаже нужно подтянуть <strong>вниз</strong>.</li>
            <li>Нижнюю площадку нужно подтянуть <strong>вверх</strong>.</li>
        </ul>
        <p style="margin: 4px 0 16px 0;">Это создает замковое натяжение, и даже при ударе клипса не сдвинется с места. <strong>Недопустимо:</strong> Срезать углы и вести кабель напрямик, минуя положенные клипсы, или цеплять одну клипсу на несколько пролетов.</p>

        <!-- ——— 5. Проход за трубами ——— -->
        <h5 style="margin: 16px 0 8px 0; color: #2c3e50;">📌 Проход за трубами и в тепловых узлах</h5>
        <p style="margin: 4px 0 8px 0;"><strong>Никогда не вплетайте силовой кабель в свою трассу</strong> — это абсурд и нарушение безопасности.</p>
        <p style="margin: 4px 0 8px 0;"><strong>Правило обхода труб:</strong> Если вы идете за трубой — <strong>ведите весь пучок за трубой</strong>. Если проходите перед трубой — <strong>весь пучок ведите перед трубой</strong>. Хаотичный монтаж (кто-то за трубой, кто-то перед, кто-то срезал угол) создает «бордель», который сложно обслуживать.</p>
        <p style="margin: 4px 0 16px 0;"><strong>Важно:</strong> При выходе из теплового узла строго соблюдайте направление, указанное в проекте. Направление ставится не просто так, а для удобства обслуживания. Хитрить и «срезать углы» запрещено — такие адреса вычисляются, и мастер отправляется на перемонтаж.</p>

        <!-- ——— 6. Работа с бухтой ——— -->
        <h5 style="margin: 16px 0 8px 0; color: #2c3e50;">📌 Работа с бухтой: не вытаскивайте кабель «винтом»</h5>
        <p style="margin: 4px 0 8px 0;">Если вы вытаскиваете коаксиальный кабель из бухты винтообразными движениями, он ложится <strong>волной</strong>. Волнообразный кабель:</p>
        <ul style="margin: 0 0 8px 0; padding-left: 20px;">
            <li>Трудно ровно закрепить на площадках;</li>
            <li>Создает лишнее внутреннее напряжение;</li>
            <li>Со временем меняет форму и хуже передает сигнал.</li>
        </ul>
        <p style="margin: 4px 0 16px 0;"><strong>Как правильно:</strong> Сначала распустите колесо (бухту), выровняйте кабель, затем аккуратно, без перекрутов, вытаскивайте его в порядке очереди.</p>

        <!-- ——— 7. Работа с повторными жалобами ——— -->
        <h5 style="margin: 16px 0 8px 0; color: #2c3e50;">📌 Работа с повторными жалобами (Оформление диагностики)</h5>
        <p style="margin: 4px 0 8px 0;">Если вы выехали на жалобу и обнаружили проблему (например, перебитый кабель или неисправность оборудования):</p>
        <ul style="margin: 0 0 8px 0; padding-left: 20px;">
            <li><strong>Обязательно укажите в комментариях причину</strong>, почему проблема не устранена сразу.</li>
            <li>Если абонент отказывается от замены оборудования или прокладки нового кабеля — <strong>пропишите это текстом</strong>: <em>«Абонент от замены отказался»</em>. Не оставляйте поле пустым или с одной лишь фразой «замер скорости».</li>
            <li>Указывайте <strong>полные данные</strong>: этаж, номер квартиры, место обрыва (если нашли), результаты всех замеров (включая уровень сигнала, а не только скорость).</li>
        </ul>
        <p style="margin: 4px 0 16px 0;"><strong>Почему это критично:</strong> Если вы не прокомментировали отказ абонента, через месяц на этот же адрес придет повторная жалоба. Следующий мастер уже не будет знать вашей истории, потратит время на повторную диагностику, а проблема так и останется висеть. Ваш комментарий — это защита от лишних выездов и претензий.</p>

        <!-- ——— 8. Диагностика питания и оборудования ——— -->
        <h5 style="margin: 16px 0 8px 0; color: #2c3e50;">📌 Диагностика питания и оборудования</h5>
        <p style="margin: 4px 0 8px 0;">Если "плавает" питание:</p>
        <ul style="margin: 0 0 8px 0; padding-left: 20px;">
            <li><strong>Признаки:</strong> Скачки напряжения, ошибки BER (битовые ошибки), полосы на аналоговом ТВ.</li>
            <li><strong>Действие:</strong> Идём на узел, проверяем оборудование. При перегрузе (сигнал 103–108 дБ) меняем питание или гатюнятор (усилитель).</li>
            <li><strong>Принцип:</strong> Работаем на опережение. Не ждём, пока пожалуются 10 абонентов. Если видим перегруз — меняем.</li>
        </ul>
        <p style="margin: 4px 0 8px 0;">Частая причина сбоев — блок питания роутера:</p>
        <ul style="margin: 0 0 8px 0; padding-left: 20px;">
            <li>Абоненты часто ставят старый блок питания (0.8А) на новый мощный роутер (которому нужно 2.5А).</li>
            <li><strong>Решение:</strong> Проверяйте напряжение блока питания при каждом подозрительном случае. Проблема может уйти простой заменой БП.</li>
        </ul>

        <!-- ——— 9. Разделение интернет-кабеля ——— -->
        <h5 style="margin: 16px 0 8px 0; color: #2c3e50;">📌 Разделение интернет-кабеля (Разъяснение)</h5>
        <ul style="margin: 0 0 8px 0; padding-left: 20px;">
            <li><strong>Делить интернет-кабель (8 жил) на 2 точки (по 4 жилы) нельзя</strong> — будет работать только одно устройство.</li>
            <li><strong>Правильно:</strong> Кабель идёт в роутер, а уже от роутера раздаём по портам.</li>
        </ul>

        <!-- ——— 10. Геометрия размещения ящиков ——— -->
        <h5 style="margin: 16px 0 8px 0; color: #2c3e50;">📌 Геометрия размещения ящиков</h5>
        <ul style="margin: 0 0 16px 0; padding-left: 20px;">
            <li><strong>Ящики считаем по количеству квартир, а не подъездов.</strong></li>
            <li><strong>Пример:</strong> 6-этажный дом, 2 подъезда, в каждом по 2 ящика = итого 4 ящика. Если больше 20 кв. на этаж — ставим 2 ящика.</li>
            <li><strong>Место установки:</strong> Не на 2-м этаже (если это не подвальная разводка) и не на крыше. Обычно на 4-м этаже (при каскадной схеме) или согласно проекту.</li>
        </ul>

        <!-- ——— Резюме для мастера ——— -->
        <div style="background: #eaf2f8; padding: 16px 20px; border-radius: 8px; margin-top: 16px; border: 2px solid #2980b9;">
            <h5 style="margin: 0 0 8px 0; color: #1a2b3c;">📋 Резюме для мастера</h5>
            <ol style="margin: 0; padding-left: 20px;">
                <li>Тянем <strong>с этажа в ящик</strong>, а не наоборот.</li>
                <li>В щитовой — <strong>один общий пучок</strong>, не вплетаемся в стойки.</li>
                <li>На этаже — <strong>5 площадок</strong>, нижний метр крепим чаще, клипсы натягиваем «в замок».</li>
                <li><strong>Не срезаем углы</strong>, идем строго по трассе (за трубой — так за трубой, перед — так перед).</li>
                <li>Кабель из бухты <strong>распускаем, а не выкручиваем</strong>.</li>
                <li>При жалобе — <strong>пишем развернутый комментарий</strong>, особенно если абонент отказался от ремонта.</li>
            </ol>
        </div>
    </section>

    <!-- ============================================================ -->
    <!-- Кнопка "Наверх" -->
    <!-- ============================================================ -->
    <div style="margin-top: 16px; text-align: right; padding: 8px 0;">
        <a href="#header" class="back-to-top" aria-label="Вернуться в начало">
            <span class="arrow">⬆</span></a>
    </div>
`;

if (typeof window !== 'undefined') {
    window.OFORMLENIE_THEORY = OFORMLENIE_THEORY;
}

console.log('✅ OFormlenie теория загружена');