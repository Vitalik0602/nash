// script.js
// === Настройки проекта ===
const WHATSAPP_NUMBER = '79151199589'; // Убедитесь, что номер корректный

const SERVICES = {
  photozones: {
    title: 'Оформление фотозон и Press Wall',
    lead: 'Создаём и оформляем уникальные фотозоны, декорации и пресс-воллы для мероприятий любого масштаба.',
    description: [
      'Фотозона — это не просто фон для фотографий, а ключевой элемент атмосферы и мощный инструмент для SMM-продвижения вашего события. Мы разрабатываем уникальный дизайн, который отражает концепцию мероприятия, привлекает внимание гостей и мотивирует их делиться фотографиями в социальных сетях.',
      'Мы предлагаем полный цикл услуг: от разработки креативной идеи и 3D-визуализации до производства, доставки, монтажа и последующего демонтажа конструкций. Вам не придется ни о чем беспокоиться.'
    ],
    bullets: [
      'Разработка уникального дизайна и 3D-визуализация',
      'Изготовление тематических фотозон и декораций',
      'Аренда и брендирование Press Wall конструкций',
      'Доставка, профессиональный монтаж и демонтаж',
      'Подбор и интеграция светового оборудования'
    ],
    images: [
      'img/photozone1.jpg', 'img/photozone2.jpg', 'img/photozone3.jpg', 'img/photozone4.jpg',
      'img/photozone5.jpg', 'img/photozone6.jpg', 'img/photozone7.jpg', 'img/photozone8.jpg',
      'img/photozone9.jpg', 'img/photozone10.jpg', 'img/photozone11.jpg', 'img/photozone12.jpg', 'img/photozone13.jpg'
    ]
  },
  signage: {
    title: 'Изготовление и ремонт вывесок',
    lead: 'Производим, ремонтируем и модернизируем световые вывески и рекламные конструкции любой сложности.',
    description: [
      'Вывеска — это лицо вашего бизнеса. Она должна быть не только яркой и заметной, но и надежной. Мы изготавливаем все виды наружной и интерьерной рекламы: от объемных букв и световых коробов до сложных неоновых инсталляций, используя только качественные и долговечные материалы.',
      'Также мы предоставляем профессиональные услуги по ремонту и обслуживанию существующих вывесок. Проводим диагностику, меняем светодиоды, блоки питания и проводку, возвращая вашей рекламе первоначальный вид и функциональность.'
    ],
    bullets: [
      'Изготовление: световые короба, объемные буквы, неон',
      'Профессиональный ремонт: замена диодов, блоков питания',
      'Модернизация устаревших конструкций',
      'Диагностика и сервисное обслуживание',
      'Использование качественных материалов: акрил, ПВХ, металл'
    ],
    images: [
      'img/signage1.jpg', 'img/signage2.jpg', 'img/signage3.jpg', 'img/signage4.jpg',
      'img/signage5.jpg', 'img/signage6.jpg', 'img/signage7.jpg', 'img/signage8.jpg',
      'img/signage9.jpg', 'img/signage10.jpg', 'img/signage11.jpg', 'img/signage12.jpg',
      'img/signage13.jpg', 'img/signage14.jpg', 'img/signage15.jpg'
    ]
  },
  site: {
    title: 'Создание сайтов',
    lead: 'Разрабатываем современные и адаптивные сайты под ключ: от дизайна и верстки до наполнения и технической поддержки.',
    description: [
      'В современном мире сайт — это ключевой инструмент для взаимодействия с аудиторией и развития бизнеса. Мы создаем не просто красивые страницы, а полноценные маркетинговые инструменты, которые решают конкретные задачи: продают, информируют, привлекают клиентов.',
      'Мы проектируем удобную структуру (UX/UI), создаем адаптивный дизайн для всех устройств, настраиваем формы, аналитику и проводим базовую SEO-оптимизацию. Обеспечиваем полный цикл работ, включая регистрацию домена, хостинг и дальнейшую поддержку.'
    ],
    bullets: [
      'Типы: лендинг, корпоративный сайт, каталог',
      'Адаптивный дизайн и чистая верстка',
      'Интеграция с CRM, формами, картами и аналитикой',
      'Базовая SEO-оптимизация и настройка мета-тегов',
      'Техническая поддержка, хостинг и развитие проекта'
    ],
    images: [ 'img/site1.png', 'img/site2.png' ]
  }
};

// === Базовые утилиты ===
const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const getParam = (key) => new URLSearchParams(window.location.search).get(key);

// === Логика отправки формы в WhatsApp ===
function toWhatsAppText(payload) {
    const lines = [`*Новая заявка с сайта*`];
    if (payload.service) lines.push(`*Услуга:* ${payload.service}`);
    if (payload.name) lines.push(`*Имя:* ${payload.name}`);
    if (payload.phone) lines.push(`*Телефон:* ${payload.phone}`);
    
    // Добавление контекстных полей
    if (payload.photozone_width && payload.photozone_height) {
        lines.push(`*Размеры фотозоны:* ${payload.photozone_width}м x ${payload.photozone_height}м`);
    }
    if (payload.signage_type && payload.signage_size) {
        lines.push(`*Тип вывески:* ${payload.signage_type}, *размеры:* ${payload.signage_size}`);
    }
    if (payload.site_type) {
        lines.push(`*Тип сайта:* ${payload.site_type}`);
    }

    if (payload.message) lines.push(`*Комментарий:* ${payload.message}`);
    
    return lines.join('\n');
}

function openWhatsApp(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  const url = `${base}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
}


// === Инициализация лайтбокса для изображений ===
function initLightbox() {
  const overlay = document.createElement('div');
  overlay.id = 'lightbox';
  Object.assign(overlay.style, {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex',
    justifyContent: 'center', alignItems: 'center', opacity: '0', visibility: 'hidden',
    transition: 'opacity 0.25s ease', zIndex: '9999', touchAction: 'none'
  });

  const btnPrev = document.createElement('button');
  const btnNext = document.createElement('button');
  const btnClose = document.createElement('button');

  [btnPrev, btnNext, btnClose].forEach(b => {
    Object.assign(b.style, {
      position: 'absolute', background: 'rgba(255,255,255,0.12)', border: 'none',
      color: '#fff', fontSize: '24px', padding: '12px 16px', borderRadius: '14px',
      cursor: 'pointer', backdropFilter: 'blur(4px)'
    });
    b.setAttribute('type', 'button');
  });

  btnPrev.textContent = '‹'; btnNext.textContent = '›'; btnClose.textContent = '✕';
  btnPrev.style.left = '16px'; btnNext.style.right = '16px';
  btnClose.style.top = '16px'; btnClose.style.right = '16px';

  const img = document.createElement('img');
  Object.assign(img.style, {
    maxWidth: '92%', maxHeight: '92%', borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.6)', userSelect: 'none'
  });

  overlay.append(img, btnPrev, btnNext, btnClose);
  document.body.appendChild(overlay);

  let group = [], index = 0, isOpen = false;

  const extractSrc = (el) => {
    if (!el) return null;
    if (el.tagName && el.tagName.toLowerCase() === 'img') return el.currentSrc || el.src;
    if (el.dataset && el.dataset.full) return el.dataset.full;
    const bg = getComputedStyle(el).backgroundImage;
    return bg.match(/url\(["']?(.*?)["']?\)/)?.[1] || null;
  };

  const open = (clickedEl) => {
    const inPortfolio = !!clickedEl.closest('#portfolio');
    const inSwiper = !!clickedEl.closest('.swiper');
    
    let sources = [];
    if (inPortfolio) {
        sources = qsa('#portfolio .portfolio-item').map(extractSrc);
    } else if (inSwiper) {
        sources = qsa('.swiper-slide img').map(extractSrc);
    }
    
    group = [...new Set(sources.filter(Boolean))];
    const src = extractSrc(clickedEl);
    index = Math.max(0, group.indexOf(src));
    
    showAt(index);
    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';
    document.body.style.overflow = 'hidden';
    isOpen = true;
  };
  
  const showAt = (i) => {
    if (!group.length) return;
    index = (i + group.length) % group.length;
    img.src = group[index];
    // Preload next and previous images
    [ (index + 1) % group.length, (index - 1 + group.length) % group.length ].forEach(idx => {
        if (group[idx]) new Image().src = group[idx];
    });
  };
  
  const close = () => {
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.visibility = 'hidden';
        img.removeAttribute('src');
    }, 250);
    document.body.style.overflow = '';
    isOpen = false;
  };

  const next = () => showAt(index + 1);
  const prev = () => showAt(index - 1);

  btnClose.addEventListener('click', close);
  btnNext.addEventListener('click', next);
  btnPrev.addEventListener('click', prev);
  overlay.addEventListener('click', (e) => e.target === overlay && close());

  document.addEventListener('keydown', (e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  let touchX = null;
  overlay.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  overlay.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    touchX = null;
  });

  document.addEventListener('click', (e) => {
    const target = e.target.closest('#portfolio .portfolio-item, .swiper-slide img');
    if (target) {
        e.preventDefault();
        open(target);
    }
  });
}

// === Анимация текста при скролле ===
function initTextAnimations() {
    const animatedTexts = qsa('.animate-text');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                if (!el.classList.contains('animated')) {
                    const text = el.textContent;
                    el.innerHTML = text.split('').map((char, i) => 
                        `<span class="char" style="--char-index: ${i};">${char === ' ' ? '&nbsp;' : char}</span>`
                    ).join('');
                    el.classList.add('animated');
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    animatedTexts.forEach(text => observer.observe(text));
}

// === Логика профессиональной формы ===
function initProfessionalForm() {
    const form = qs('#contactForm');
    if (!form) return;

    const serviceSelect = qs('#service-select');
    const conditionalContainer = qs('#conditional-fields-container');
    const conditionalFieldsets = qsa('.conditional-fieldset');
    const fileInput = qs('#file-upload');
    const fileUploadText = qs('.file-upload-text');

    serviceSelect.addEventListener('change', () => {
        const selectedService = serviceSelect.value;
        let activeFieldset = null;
        
        conditionalFieldsets.forEach(fieldset => {
            if (fieldset.dataset.service === selectedService) {
                fieldset.classList.add('active');
                activeFieldset = fieldset;
            } else {
                fieldset.classList.remove('active');
            }
        });
        
        if (activeFieldset) {
            conditionalContainer.style.maxHeight = activeFieldset.scrollHeight + 'px';
        } else {
            conditionalContainer.style.maxHeight = '0px';
        }
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            fileUploadText.textContent = `Выбрано файлов: ${fileInput.files.length}`;
        } else {
            fileUploadText.textContent = 'Прикрепить файл (макет, фото)';
        }
    });
}


// === Глобальные интерактивности ===
document.addEventListener('DOMContentLoaded', () => {
  // Проверка номера WhatsApp
  if (!/^\d{8,15}$/.test(String(WHATSAPP_NUMBER))) {
    console.warn('[Sky Wall] Проверьте WHATSAPP_NUMBER в script.js.');
  }

  // Мобильное меню
  const burger = qs('.burger');
  const nav = qs('.nav');
  const body = document.body;
  if (burger && nav) {
    const toggleMenu = () => {
      burger.classList.toggle('active');
      nav.classList.toggle('active');
      body.classList.toggle('menu-open');
    };
    burger.addEventListener('click', toggleMenu);
    qsa('.nav a').forEach(link => link.addEventListener('click', () => {
      if (body.classList.contains('menu-open')) toggleMenu();
    }));
  }

  // Плавный скролл
  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const targetSel = a.getAttribute('href');
      const target = qs(targetSel);
      if (target) {
        e.preventDefault();
        const yOffset = -100;
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
  
  // Обработка отправки форм
  qsa('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      const formData = new FormData(form);
      const payload = {};
      
      // Собираем все данные из формы
      for (const [key, value] of formData.entries()) {
          if (value instanceof File) {
              // В WhatsApp нельзя отправить файлы напрямую через ссылку,
              // поэтому просто информируем о наличии файла.
              if (value.name) payload.attachment = `Прикреплен файл: ${value.name}`;
          } else {
               if (value) payload[key] = value.toString().trim();
          }
      }
      // Добавляем название услуги из селектора, если это главная форма
      if(form.id === 'contactForm') {
         payload.service = form.querySelector('#service-select option:checked').text;
      }
      
      // На странице услуги название берем из атрибута
      if(form.id === 'serviceForm') {
         payload.service = form.getAttribute('data-service');
      }

      if (!payload.name || !payload.phone) {
        alert('Пожалуйста, заполните имя и телефон.');
        return;
      }

      openWhatsApp(toWhatsAppText(payload));
      form.reset();
      // Сбрасываем UI формы
      if (qs('#conditional-fields-container')) qs('#conditional-fields-container').style.maxHeight = '0px';
      if (qs('.file-upload-text')) qs('.file-upload-text').textContent = 'Прикрепить файл (макет, фото)';


      submitBtn.textContent = 'Отправлено!';
      submitBtn.style.backgroundColor = '#28a745';
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = '';
      }, 3000);
    });
  });

  // Маска для телефона
  qsa('input[type="tel"]').forEach(input => {
    input.addEventListener('input', (e) => {
      let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      e.target.value = !x[2] ? (x[1] ? `+${x[1]}`: '') : `+${x[1]} (${x[2]}) ${x[3]}` + (x[4] ? `-${x[4]}` : '') + (x[5] ? `-${x[5]}` : '');
    });
  });

  // Инициализация страницы услуги
  if (qs('#serviceTitle')) {
    initServicePage();
  }

  // Инициализация профессиональной формы
  initProfessionalForm();
  
  // Инициализация анимации текста
  initTextAnimations();

  // Инициализация лайтбокса
  initLightbox();
});

// === Логика страницы услуги ===
function initServicePage() {
  const key = getParam('service') || 'photozones';
  const svc = SERVICES[key] || SERVICES.photozones;

  qs('#serviceTitle').textContent = svc.title;
  qs('#serviceLead').textContent = svc.lead;
  qs('#pageTitle').textContent = `${svc.title} — SKY WALL`;
  qs('#serviceDescription').innerHTML = (svc.description || []).map(p => `<p>${p}</p>`).join('');
  qs('#serviceBullets').innerHTML = (svc.bullets || []).map(b => `<li>${b}</li>`).join('');
  qs('#serviceForm').setAttribute('data-service', svc.title);

  const gallery = qs('#gallery');
  let images = Array.isArray(svc.images) && svc.images.length > 0 ? svc.images : ['img/placeholder.jpg'];
  
  gallery.innerHTML = images.map(img => `
    <div class="swiper-slide">
      <img src="${img}" alt="Изображение услуги" loading="lazy">
    </div>
  `).join('');

  new Swiper('.swiper', {
      loop: true,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      effect: 'fade',
      fadeEffect: { crossFade: true },
      grabCursor: true,
  });
}