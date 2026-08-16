import type { Question } from "./types"

/**
 * IT quiz bank (HTML / CSS / JS / React), fully localized (en/ru/uz).
 * `correct` = indices into `answers`, identical across locales.
 * NOTE: extended by the team — keep the shape identical for every entry.
 */
export const QUESTIONS: Question[] = [
  {
    id: "html-1",
    category: "html",
    difficulty: "easy",
    type: "single",
    time: 20,
    correct: [0],
    translations: {
      en: {
        question: "What does HTML stand for?",
        answers: [
          "HyperText Markup Language",
          "HighText Machine Language",
          "HyperText Markdown Language",
          "Home Tool Markup Language",
        ],
        explanation: "HTML stands for HyperText Markup Language, the standard markup language for web pages.",
      },
      ru: {
        question: "Как расшифровывается HTML?",
        answers: [
          "HyperText Markup Language",
          "HighText Machine Language",
          "HyperText Markdown Language",
          "Home Tool Markup Language",
        ],
        explanation: "HTML расшифровывается как HyperText Markup Language — стандартный язык разметки веб-страниц.",
      },
      uz: {
        question: "HTML nimani anglatadi?",
        answers: [
          "HyperText Markup Language",
          "HighText Machine Language",
          "HyperText Markdown Language",
          "Home Tool Markup Language",
        ],
        explanation: "HTML — HyperText Markup Language, ya'ni veb-sahifalar uchun standart belgilash tili.",
      },
    },
  },
  {
    id: "html-2",
    category: "html",
    difficulty: "easy",
    type: "single",
    time: 15,
    correct: [1],
    translations: {
      en: {
        question: "Which tag creates the largest heading?",
        answers: ["<head>", "<h1>", "<h6>", "<title>"],
        explanation: "<h1> is the top-level, largest heading; heading sizes decrease from <h1> down to <h6>.",
      },
      ru: {
        question: "Какой тег создаёт самый крупный заголовок?",
        answers: ["<head>", "<h1>", "<h6>", "<title>"],
        explanation: "<h1> — заголовок верхнего уровня, самый крупный; далее размер уменьшается до <h6>.",
      },
      uz: {
        question: "Qaysi teg eng katta sarlavha yaratadi?",
        answers: ["<head>", "<h1>", "<h6>", "<title>"],
        explanation: "<h1> eng yuqori darajali, eng katta sarlavha; o'lcham <h6> gacha kichrayadi.",
      },
    },
  },
  {
    id: "html-3",
    category: "html",
    difficulty: "easy",
    type: "single",
    time: 15,
    correct: [0],
    translations: {
      en: {
        question: "Which attribute specifies alternative text for an image?",
        answers: ["alt", "src", "title", "longdesc"],
        explanation: "The alt attribute gives alternative text shown when an image fails to load and read by screen readers.",
      },
      ru: {
        question: "Какой атрибут задаёт альтернативный текст для изображения?",
        answers: ["alt", "src", "title", "longdesc"],
        explanation: "Атрибут alt задаёт альтернативный текст, который виден при сбое загрузки и читается скринридерами.",
      },
      uz: {
        question: "Qaysi atribut rasm uchun muqobil matnni belgilaydi?",
        answers: ["alt", "src", "title", "longdesc"],
        explanation: "alt atributi rasm yuklanmaganda ko'rinadigan va skrinriderlar o'qiydigan muqobil matnni beradi.",
      },
    },
  },
  {
    id: "html-4",
    category: "html",
    difficulty: "easy",
    type: "single",
    time: 15,
    correct: [1],
    translations: {
      en: {
        question: "Which tag is used to create a hyperlink?",
        answers: ["<link>", "<a>", "<href>", "<nav>"],
        explanation: "The <a> (anchor) tag with an href attribute creates a hyperlink to another page or resource.",
      },
      ru: {
        question: "Какой тег используется для создания гиперссылки?",
        answers: ["<link>", "<a>", "<href>", "<nav>"],
        explanation: "Тег <a> (якорь) с атрибутом href создаёт гиперссылку на другую страницу или ресурс.",
      },
      uz: {
        question: "Havola (gipermurojaat) yaratish uchun qaysi teg ishlatiladi?",
        answers: ["<link>", "<a>", "<href>", "<nav>"],
        explanation: "<a> (anchor) tegi href atributi bilan boshqa sahifa yoki resursga havola yaratadi.",
      },
    },
  },
  {
    id: "html-5",
    category: "html",
    difficulty: "medium",
    type: "single",
    time: 20,
    correct: [1],
    translations: {
      en: {
        question: "Which element represents the main content of a document and is unique per page?",
        answers: ["<section>", "<main>", "<article>", "<div>"],
        explanation: "<main> holds the document's primary content and should appear only once per page.",
      },
      ru: {
        question: "Какой элемент представляет основное содержимое документа и уникален на странице?",
        answers: ["<section>", "<main>", "<article>", "<div>"],
        explanation: "<main> содержит основное содержимое документа и должен быть только один на странице.",
      },
      uz: {
        question: "Qaysi element hujjatning asosiy mazmunini ifodalaydi va sahifada yagona bo'ladi?",
        answers: ["<section>", "<main>", "<article>", "<div>"],
        explanation: "<main> hujjatning asosiy mazmunini saqlaydi va sahifada faqat bitta bo'lishi kerak.",
      },
    },
  },
  {
    id: "html-6",
    category: "html",
    difficulty: "medium",
    type: "multi",
    time: 20,
    correct: [0, 2],
    translations: {
      en: {
        question: "Which of the following are semantic HTML5 elements?",
        answers: ["<article>", "<div>", "<figure>", "<span>"],
        explanation: "<article> and <figure> carry semantic meaning, while <div> and <span> are generic containers.",
      },
      ru: {
        question: "Какие из перечисленных являются семантическими элементами HTML5?",
        answers: ["<article>", "<div>", "<figure>", "<span>"],
        explanation: "<article> и <figure> несут семантический смысл, а <div> и <span> — универсальные контейнеры.",
      },
      uz: {
        question: "Quyidagilardan qaysilari HTML5 semantik elementlari hisoblanadi?",
        answers: ["<article>", "<div>", "<figure>", "<span>"],
        explanation: "<article> va <figure> semantik ma'noga ega, <div> va <span> esa oddiy konteynerlar.",
      },
    },
  },
  {
    id: "html-7",
    category: "html",
    difficulty: "medium",
    type: "single",
    time: 20,
    correct: [1],
    translations: {
      en: {
        question: "Which input type shows a date picker in supporting browsers?",
        answers: ["type=\"text\"", "type=\"date\"", "type=\"datetime\"", "type=\"calendar\""],
        explanation: "An <input type=\"date\"> renders a native date picker in browsers that support it.",
      },
      ru: {
        question: "Какой тип input показывает выбор даты в поддерживающих браузерах?",
        answers: ["type=\"text\"", "type=\"date\"", "type=\"datetime\"", "type=\"calendar\""],
        explanation: "Поле <input type=\"date\"> показывает встроенный выбор даты в поддерживающих браузерах.",
      },
      uz: {
        question: "Qaysi input turi qo'llab-quvvatlaydigan brauzerlarda sana tanlagichni ko'rsatadi?",
        answers: ["type=\"text\"", "type=\"date\"", "type=\"datetime\"", "type=\"calendar\""],
        explanation: "<input type=\"date\"> qo'llab-quvvatlaydigan brauzerlarda tabiiy sana tanlagichni ko'rsatadi.",
      },
    },
  },
  {
    id: "html-8",
    category: "html",
    difficulty: "medium",
    type: "multi",
    time: 20,
    correct: [0, 2],
    translations: {
      en: {
        question: "Which attributes are used to associate a <label> with a form control?",
        answers: ["for", "name", "id", "value"],
        explanation: "A <label>'s for attribute must match the form control's id to link the two together.",
      },
      ru: {
        question: "Какие атрибуты используются, чтобы связать <label> с элементом формы?",
        answers: ["for", "name", "id", "value"],
        explanation: "Атрибут for у <label> должен совпадать с id элемента формы, чтобы связать их.",
      },
      uz: {
        question: "<label>ni forma boshqaruv elementi bilan bog'lash uchun qaysi atributlar ishlatiladi?",
        answers: ["for", "name", "id", "value"],
        explanation: "<label>ning for atributi forma elementining id qiymatiga mos kelib, ularni bog'laydi.",
      },
    },
  },
  {
    id: "html-9",
    category: "html",
    difficulty: "hard",
    type: "single",
    time: 25,
    correct: [1],
    translations: {
      en: {
        question: "Which ARIA attribute indicates whether an element is currently expanded or collapsed?",
        answers: ["aria-hidden", "aria-expanded", "aria-label", "aria-role"],
        explanation: "aria-expanded tells assistive tech whether a collapsible element is currently open or closed.",
      },
      ru: {
        question: "Какой атрибут ARIA указывает, развёрнут или свёрнут элемент в данный момент?",
        answers: ["aria-hidden", "aria-expanded", "aria-label", "aria-role"],
        explanation: "aria-expanded сообщает вспомогательным технологиям, раскрыт сворачиваемый элемент или свёрнут.",
      },
      uz: {
        question: "Qaysi ARIA atributi element hozir yoyilgan yoki yig'ilganini bildiradi?",
        answers: ["aria-hidden", "aria-expanded", "aria-label", "aria-role"],
        explanation: "aria-expanded yordamchi texnologiyalarga yig'iladigan element ochiq yoki yopiqligini bildiradi.",
      },
    },
  },
  {
    id: "html-10",
    category: "html",
    difficulty: "hard",
    type: "multi",
    time: 25,
    correct: [0, 1, 3],
    translations: {
      en: {
        question: "Which practices improve web accessibility (a11y)?",
        answers: [
          "Using semantic elements",
          "Adding alt text to images",
          "Relying only on color to convey meaning",
          "Providing labels for form fields",
        ],
        explanation: "Semantic elements, alt text, and form labels aid accessibility; color alone shouldn't convey meaning.",
      },
      ru: {
        question: "Какие практики улучшают доступность веб-страниц (a11y)?",
        answers: [
          "Использование семантических элементов",
          "Добавление alt-текста к изображениям",
          "Передача смысла только с помощью цвета",
          "Наличие подписей у полей форм",
        ],
        explanation: "Семантика, alt-текст и подписи полей помогают доступности; один лишь цвет не должен нести смысл.",
      },
      uz: {
        question: "Qaysi amaliyotlar veb-sahifa qulayligini (a11y) yaxshilaydi?",
        answers: [
          "Semantik elementlardan foydalanish",
          "Rasmlarga alt matn qo'shish",
          "Ma'noni faqat rang orqali yetkazish",
          "Forma maydonlariga yorliqlar berish",
        ],
        explanation: "Semantik elementlar, alt matn va yorliqlar qulaylikka yordam beradi; faqat rang ma'no tashimasligi kerak.",
      },
    },
  },
  {
    id: "css-1",
    category: "css",
    difficulty: "easy",
    type: "single",
    time: 15,
    correct: [2],
    translations: {
      en: {
        question: "Which CSS property changes text color?",
        answers: ["font-style", "text-color", "color", "background"],
        explanation: "The color property sets the foreground color of an element, which is its text color.",
      },
      ru: {
        question: "Какое свойство CSS меняет цвет текста?",
        answers: ["font-style", "text-color", "color", "background"],
        explanation: "Свойство color задаёт цвет переднего плана элемента — то есть цвет его текста.",
      },
      uz: {
        question: "Qaysi CSS xususiyati matn rangini o'zgartiradi?",
        answers: ["font-style", "text-color", "color", "background"],
        explanation: "color xususiyati elementning old fon rangini, ya'ni matn rangini belgilaydi.",
      },
    },
  },
  {
    id: "css-2",
    category: "css",
    difficulty: "medium",
    type: "single",
    time: 20,
    correct: [1],
    translations: {
      en: {
        question: "How do you select an element with id \"app\" in CSS?",
        answers: [".app", "#app", "*app", "app"],
        explanation: "In CSS the # prefix selects by id, so #app targets the element whose id is \"app\".",
      },
      ru: {
        question: "Как выбрать элемент с id \"app\" в CSS?",
        answers: [".app", "#app", "*app", "app"],
        explanation: "В CSS префикс # выбирает по id, поэтому #app указывает на элемент с id \"app\".",
      },
      uz: {
        question: "CSS'da id \"app\" bo'lgan elementni qanday tanlaysiz?",
        answers: [".app", "#app", "*app", "app"],
        explanation: "CSS'da # prefiksi id bo'yicha tanlaydi, shu sababli #app id'si \"app\" bo'lgan elementni tanlaydi.",
      },
    },
  },
  {
    id: "css-3",
    category: "css",
    difficulty: "easy",
    type: "single",
    time: 15,
    correct: [1],
    translations: {
      en: {
        question: "Which property sets the space inside an element, between content and border?",
        answers: ["margin", "padding", "border", "gap"],
        explanation: "padding is the inner space between an element's content and its border.",
      },
      ru: {
        question: "Какое свойство задаёт пространство внутри элемента, между содержимым и границей?",
        answers: ["margin", "padding", "border", "gap"],
        explanation: "padding — это внутреннее пространство между содержимым элемента и его границей.",
      },
      uz: {
        question: "Qaysi xususiyat element ichidagi, mazmun va chegara orasidagi bo'shliqni belgilaydi?",
        answers: ["margin", "padding", "border", "gap"],
        explanation: "padding — element mazmuni va uning chegarasi orasidagi ichki bo'shliq.",
      },
    },
  },
  {
    id: "css-4",
    category: "css",
    difficulty: "easy",
    type: "single",
    time: 15,
    correct: [1],
    translations: {
      en: {
        question: "Which value of the display property makes an element a flex container?",
        answers: ["block", "flex", "grid", "inline"],
        explanation: "display: flex turns an element into a flex container that lays out its children with flexbox.",
      },
      ru: {
        question: "Какое значение свойства display делает элемент flex-контейнером?",
        answers: ["block", "flex", "grid", "inline"],
        explanation: "display: flex превращает элемент во flex-контейнер, раскладывающий детей по flexbox.",
      },
      uz: {
        question: "display xususiyatining qaysi qiymati elementni flex-konteynerga aylantiradi?",
        answers: ["block", "flex", "grid", "inline"],
        explanation: "display: flex elementni flex-konteynerga aylantirib, bolalarini flexbox bilan joylaydi.",
      },
    },
  },
  {
    id: "css-5",
    category: "css",
    difficulty: "easy",
    type: "single",
    time: 15,
    correct: [2],
    translations: {
      en: {
        question: "Which unit is relative to the root element's font size?",
        answers: ["px", "em", "rem", "pt"],
        explanation: "rem is relative to the root (<html>) element's font size, unlike em which uses the parent's.",
      },
      ru: {
        question: "Какая единица измерения зависит от размера шрифта корневого элемента?",
        answers: ["px", "em", "rem", "pt"],
        explanation: "rem зависит от размера шрифта корневого элемента <html>, в отличие от em, берущего родителя.",
      },
      uz: {
        question: "Qaysi o'lchov birligi ildiz elementning shrift o'lchamiga bog'liq bo'ladi?",
        answers: ["px", "em", "rem", "pt"],
        explanation: "rem ildiz (<html>) elementining shrift o'lchamiga bog'liq, em esa ota elementnikiga.",
      },
    },
  },
  {
    id: "css-6",
    category: "css",
    difficulty: "medium",
    type: "single",
    time: 20,
    correct: [1],
    translations: {
      en: {
        question: "In flexbox, which property aligns items along the main axis?",
        answers: ["align-items", "justify-content", "align-content", "flex-wrap"],
        explanation: "justify-content aligns and distributes flex items along the container's main axis.",
      },
      ru: {
        question: "Во flexbox какое свойство выравнивает элементы вдоль главной оси?",
        answers: ["align-items", "justify-content", "align-content", "flex-wrap"],
        explanation: "justify-content выравнивает и распределяет flex-элементы вдоль главной оси контейнера.",
      },
      uz: {
        question: "Flexbox'da qaysi xususiyat elementlarni asosiy o'q bo'ylab tekislaydi?",
        answers: ["align-items", "justify-content", "align-content", "flex-wrap"],
        explanation: "justify-content flex elementlarni konteynerning asosiy o'qi bo'ylab tekislaydi va taqsimlaydi.",
      },
    },
  },
  {
    id: "css-7",
    category: "css",
    difficulty: "medium",
    type: "multi",
    time: 20,
    correct: [0, 1, 3],
    translations: {
      en: {
        question: "Which of these are valid values of the CSS position property?",
        answers: ["static", "relative", "center", "absolute"],
        explanation: "static, relative, and absolute are valid position values; there is no \"center\" value.",
      },
      ru: {
        question: "Какие из этих значений свойства position допустимы в CSS?",
        answers: ["static", "relative", "center", "absolute"],
        explanation: "static, relative и absolute — допустимые значения position; значения \"center\" не существует.",
      },
      uz: {
        question: "Bulardan qaysilari CSS position xususiyatining to'g'ri qiymatlari?",
        answers: ["static", "relative", "center", "absolute"],
        explanation: "static, relative va absolute — position ning to'g'ri qiymatlari; \"center\" qiymati yo'q.",
      },
    },
  },
  {
    id: "css-8",
    category: "css",
    difficulty: "medium",
    type: "multi",
    time: 20,
    correct: [0, 1, 2],
    translations: {
      en: {
        question: "Which properties are part of the CSS box model?",
        answers: ["margin", "padding", "border", "color"],
        explanation: "The box model is made of content, padding, border, and margin; color is not part of it.",
      },
      ru: {
        question: "Какие свойства входят в блочную модель CSS (box model)?",
        answers: ["margin", "padding", "border", "color"],
        explanation: "Блочная модель состоит из содержимого, padding, border и margin; color в неё не входит.",
      },
      uz: {
        question: "Qaysi xususiyatlar CSS box model tarkibiga kiradi?",
        answers: ["margin", "padding", "border", "color"],
        explanation: "Box model mazmun, padding, border va margindan iborat; color unga kirmaydi.",
      },
    },
  },
  {
    id: "css-9",
    category: "css",
    difficulty: "hard",
    type: "single",
    time: 25,
    correct: [2],
    translations: {
      en: {
        question: "What is the specificity of the selector #nav .item a (as ids-classes-elements)?",
        answers: ["0-1-1", "1-0-1", "1-1-1", "0-2-1"],
        explanation: "#nav is one id, .item one class, and a one element, giving specificity 1-1-1.",
      },
      ru: {
        question: "Какова специфичность селектора #nav .item a (в виде id-классы-элементы)?",
        answers: ["0-1-1", "1-0-1", "1-1-1", "0-2-1"],
        explanation: "#nav — один id, .item — один класс, a — один элемент, поэтому специфичность 1-1-1.",
      },
      uz: {
        question: "#nav .item a selektorining spetsifikligi qanday (id-klass-element ko'rinishida)?",
        answers: ["0-1-1", "1-0-1", "1-1-1", "0-2-1"],
        explanation: "#nav — bitta id, .item — bitta klass, a — bitta element, demak spetsifiklik 1-1-1.",
      },
    },
  },
  {
    id: "css-10",
    category: "css",
    difficulty: "hard",
    type: "single",
    time: 25,
    correct: [1],
    translations: {
      en: {
        question: "In CSS Grid, what does grid-template-columns: repeat(3, 1fr) create?",
        answers: [
          "Three rows of equal height",
          "Three columns of equal width",
          "A fixed 3x3 grid",
          "Three columns sized to their content",
        ],
        explanation: "repeat(3, 1fr) makes three columns that each take an equal fraction (1fr) of the free space.",
      },
      ru: {
        question: "Что создаёт grid-template-columns: repeat(3, 1fr) в CSS Grid?",
        answers: [
          "Три строки одинаковой высоты",
          "Три колонки одинаковой ширины",
          "Фиксированную сетку 3x3",
          "Три колонки по размеру содержимого",
        ],
        explanation: "repeat(3, 1fr) создаёт три колонки, каждая занимает равную долю (1fr) свободного места.",
      },
      uz: {
        question: "CSS Grid'da grid-template-columns: repeat(3, 1fr) nima yaratadi?",
        answers: [
          "Balandligi teng uchta qator",
          "Kengligi teng uchta ustun",
          "Qat'iy 3x3 to'r",
          "Mazmuni o'lchamidagi uchta ustun",
        ],
        explanation: "repeat(3, 1fr) uchta ustun yaratadi, har biri bo'sh joyning teng ulushini (1fr) egallaydi.",
      },
    },
  },
  {
    id: "js-1",
    category: "js",
    difficulty: "medium",
    type: "single",
    time: 20,
    correct: [2],
    translations: {
      en: {
        question: "What is the result of typeof null?",
        answers: ["\"null\"", "\"undefined\"", "\"object\"", "\"number\""],
        explanation: "typeof null returns \"object\" — a long-standing JavaScript bug kept for backward compatibility.",
      },
      ru: {
        question: "Что вернёт typeof null?",
        answers: ["\"null\"", "\"undefined\"", "\"object\"", "\"number\""],
        explanation: "typeof null возвращает \"object\" — давняя ошибка JavaScript, оставленная для совместимости.",
      },
      uz: {
        question: "typeof null nima qaytaradi?",
        answers: ["\"null\"", "\"undefined\"", "\"object\"", "\"number\""],
        explanation: "typeof null \"object\" qaytaradi — bu JavaScript'dagi eski xato, moslik uchun saqlangan.",
      },
    },
  },
  {
    id: "js-2",
    category: "js",
    difficulty: "easy",
    type: "single",
    time: 15,
    correct: [0],
    translations: {
      en: {
        question: "Which keyword declares a block-scoped constant?",
        answers: ["const", "var", "let", "define"],
        explanation: "const declares a block-scoped binding that cannot be reassigned after initialization.",
      },
      ru: {
        question: "Какое ключевое слово объявляет блочную константу?",
        answers: ["const", "var", "let", "define"],
        explanation: "const объявляет привязку с блочной областью видимости, которую нельзя переприсвоить.",
      },
      uz: {
        question: "Qaysi kalit so'z blok doiradagi konstantani e'lon qiladi?",
        answers: ["const", "var", "let", "define"],
        explanation: "const blok doiradagi, ishga tushirilgach qayta tayinlab bo'lmaydigan bog'lanishni e'lon qiladi.",
      },
    },
  },
  {
    id: "js-3",
    category: "js",
    difficulty: "easy",
    type: "single",
    time: 15,
    correct: [1],
    translations: {
      en: {
        question: "Which operator checks equality without type coercion?",
        answers: ["==", "===", "=", "!="],
        explanation: "=== is strict equality: it compares both value and type without any type coercion.",
      },
      ru: {
        question: "Какой оператор проверяет равенство без приведения типов?",
        answers: ["==", "===", "=", "!="],
        explanation: "=== — строгое равенство: сравнивает и значение, и тип без приведения типов.",
      },
      uz: {
        question: "Qaysi operator turlarni o'zgartirmasdan tenglikni tekshiradi?",
        answers: ["==", "===", "=", "!="],
        explanation: "=== — qat'iy tenglik: qiymat va turni turlarni o'zgartirmasdan solishtiradi.",
      },
    },
  },
  {
    id: "js-4",
    category: "js",
    difficulty: "easy",
    type: "single",
    time: 15,
    correct: [0],
    translations: {
      en: {
        question: "Which method adds one or more elements to the end of an array?",
        answers: ["push", "pop", "shift", "unshift"],
        explanation: "push() appends one or more elements to the end of an array and returns its new length.",
      },
      ru: {
        question: "Какой метод добавляет один или несколько элементов в конец массива?",
        answers: ["push", "pop", "shift", "unshift"],
        explanation: "push() добавляет один или несколько элементов в конец массива и возвращает новую длину.",
      },
      uz: {
        question: "Qaysi metod massiv oxiriga bir yoki bir nechta element qo'shadi?",
        answers: ["push", "pop", "shift", "unshift"],
        explanation: "push() massiv oxiriga bir yoki bir nechta element qo'shadi va yangi uzunlikni qaytaradi.",
      },
    },
  },
  {
    id: "js-5",
    category: "js",
    difficulty: "easy",
    type: "single",
    time: 15,
    correct: [2],
    translations: {
      en: {
        question: "What value does a declared but uninitialized variable hold?",
        answers: ["null", "0", "undefined", "NaN"],
        explanation: "A declared but uninitialized variable holds undefined by default until a value is assigned.",
      },
      ru: {
        question: "Какое значение хранит объявленная, но не инициализированная переменная?",
        answers: ["null", "0", "undefined", "NaN"],
        explanation: "Объявленная, но не инициализированная переменная по умолчанию хранит undefined.",
      },
      uz: {
        question: "E'lon qilingan, ammo ishga tushirilmagan o'zgaruvchi qanday qiymatga ega bo'ladi?",
        answers: ["null", "0", "undefined", "NaN"],
        explanation: "E'lon qilingan, ammo ishga tushirilmagan o'zgaruvchi standart holatda undefined bo'ladi.",
      },
    },
  },
  {
    id: "js-6",
    category: "js",
    difficulty: "medium",
    type: "single",
    time: 20,
    correct: [1],
    translations: {
      en: {
        question: "Which array method returns a new array with the result of calling a function on every element?",
        answers: ["forEach", "map", "filter", "reduce"],
        explanation: "map() returns a new array built from the value returned by the callback for each element.",
      },
      ru: {
        question: "Какой метод массива возвращает новый массив из результатов вызова функции для каждого элемента?",
        answers: ["forEach", "map", "filter", "reduce"],
        explanation: "map() возвращает новый массив из значений, возвращённых колбэком для каждого элемента.",
      },
      uz: {
        question: "Qaysi massiv metodi har bir element uchun funksiyani chaqirib, natijalardan yangi massiv qaytaradi?",
        answers: ["forEach", "map", "filter", "reduce"],
        explanation: "map() har bir element uchun kolbek qaytargan qiymatdan yangi massiv tuzadi.",
      },
    },
  },
  {
    id: "js-7",
    category: "js",
    difficulty: "medium",
    type: "multi",
    time: 20,
    correct: [0, 1, 3],
    translations: {
      en: {
        question: "Which of these values are falsy in JavaScript?",
        answers: ["0", "\"\"", "\"0\"", "null"],
        explanation: "0, an empty string, and null are falsy; the non-empty string \"0\" is actually truthy.",
      },
      ru: {
        question: "Какие из этих значений являются ложными (falsy) в JavaScript?",
        answers: ["0", "\"\"", "\"0\"", "null"],
        explanation: "0, пустая строка и null — ложные; непустая строка \"0\" на самом деле истинна.",
      },
      uz: {
        question: "Bu qiymatlardan qaysilari JavaScript'da falsy (yolg'on) hisoblanadi?",
        answers: ["0", "\"\"", "\"0\"", "null"],
        explanation: "0, bo'sh satr va null — falsy; bo'sh bo'lmagan \"0\" satri esa aslida truthy.",
      },
    },
  },
  {
    id: "js-8",
    category: "js",
    difficulty: "medium",
    type: "multi",
    time: 20,
    correct: [0, 3],
    translations: {
      en: {
        question: "Which statements about a closure are true?",
        answers: [
          "It remembers variables from its outer scope",
          "It only works with arrow functions",
          "It requires the class keyword",
          "It can access those variables after the outer function has returned",
        ],
        explanation: "A closure remembers its outer-scope variables and can still access them after that function returns.",
      },
      ru: {
        question: "Какие утверждения о замыкании (closure) верны?",
        answers: [
          "Оно запоминает переменные из внешней области видимости",
          "Оно работает только со стрелочными функциями",
          "Оно требует ключевого слова class",
          "Оно может обращаться к этим переменным после завершения внешней функции",
        ],
        explanation: "Замыкание запоминает переменные внешней области и обращается к ним после завершения внешней функции.",
      },
      uz: {
        question: "Closure (yopilma) haqidagi qaysi fikrlar to'g'ri?",
        answers: [
          "U tashqi doiradagi o'zgaruvchilarni eslab qoladi",
          "U faqat strelka (arrow) funksiyalar bilan ishlaydi",
          "U class kalit so'zini talab qiladi",
          "U tashqi funksiya tugagach ham o'sha o'zgaruvchilarga murojaat qila oladi",
        ],
        explanation: "Closure tashqi doiradagi o'zgaruvchilarni eslaydi va tashqi funksiya tugagach ham ularga kiradi.",
      },
    },
  },
  {
    id: "js-9",
    category: "js",
    difficulty: "hard",
    type: "single",
    time: 25,
    correct: [0],
    translations: {
      en: {
        question: "What does an async function always return?",
        answers: ["A Promise", "The resolved value directly", "undefined", "A callback"],
        explanation: "An async function always wraps its return value in a Promise, even if you return a plain value.",
      },
      ru: {
        question: "Что всегда возвращает async-функция?",
        answers: ["Promise", "Разрешённое значение напрямую", "undefined", "Колбэк"],
        explanation: "async-функция всегда оборачивает возвращаемое значение в Promise, даже если вернуть обычное.",
      },
      uz: {
        question: "async funksiya doim nimani qaytaradi?",
        answers: ["Promise", "Hal qilingan qiymatni to'g'ridan-to'g'ri", "undefined", "Callback"],
        explanation: "async funksiya qaytariladigan qiymatni doim Promise'ga o'raydi, oddiy qiymat qaytarsangiz ham.",
      },
    },
  },
  {
    id: "js-10",
    category: "js",
    difficulty: "hard",
    type: "single",
    time: 25,
    correct: [1],
    translations: {
      en: {
        question: "Because of hoisting, what does console.log(x); var x = 5; print?",
        answers: ["5", "undefined", "ReferenceError", "null"],
        explanation: "var x is hoisted, so x exists but is undefined when console.log runs before the assignment.",
      },
      ru: {
        question: "Из-за поднятия (hoisting) что выведет console.log(x); var x = 5;?",
        answers: ["5", "undefined", "ReferenceError", "null"],
        explanation: "var x поднимается: переменная уже есть, но равна undefined в момент console.log до присваивания.",
      },
      uz: {
        question: "Hoisting sababli console.log(x); var x = 5; nimani chop etadi?",
        answers: ["5", "undefined", "ReferenceError", "null"],
        explanation: "var x hoisting tufayli mavjud, lekin tayinlashdan oldingi console.log paytida undefined bo'ladi.",
      },
    },
  },
  {
    id: "react-1",
    category: "react",
    difficulty: "easy",
    type: "single",
    time: 20,
    correct: [3],
    translations: {
      en: {
        question: "What does the useState hook return?",
        answers: [
          "A single value",
          "A function only",
          "An object with state",
          "A pair: [state, setState]",
        ],
        explanation: "useState returns an array pair: the current state value and a function to update it.",
      },
      ru: {
        question: "Что возвращает хук useState?",
        answers: [
          "Одно значение",
          "Только функцию",
          "Объект с состоянием",
          "Пару: [состояние, setState]",
        ],
        explanation: "useState возвращает пару-массив: текущее значение состояния и функцию для его обновления.",
      },
      uz: {
        question: "useState hook nimani qaytaradi?",
        answers: [
          "Bitta qiymat",
          "Faqat funksiya",
          "Holatli obyekt",
          "Juftlik: [holat, setState]",
        ],
        explanation: "useState massiv-juftlik qaytaradi: joriy holat qiymati va uni yangilaydigan funksiya.",
      },
    },
  },
  {
    id: "react-2",
    category: "react",
    difficulty: "medium",
    type: "single",
    time: 20,
    correct: [1],
    translations: {
      en: {
        question: "Which hook runs side effects after render?",
        answers: ["useMemo", "useEffect", "useRef", "useCallback"],
        explanation: "useEffect runs side effects after render, such as data fetching, subscriptions, or DOM updates.",
      },
      ru: {
        question: "Какой хук выполняет побочные эффекты после рендера?",
        answers: ["useMemo", "useEffect", "useRef", "useCallback"],
        explanation: "useEffect выполняет побочные эффекты после рендера — запросы данных, подписки, изменения DOM.",
      },
      uz: {
        question: "Qaysi hook renderdan keyin nojo'ya effektlarni bajaradi?",
        answers: ["useMemo", "useEffect", "useRef", "useCallback"],
        explanation: "useEffect renderdan keyin nojo'ya effektlarni bajaradi: ma'lumot olish, obuna yoki DOM o'zgarishi.",
      },
    },
  },
  {
    id: "react-3",
    category: "react",
    difficulty: "easy",
    type: "single",
    time: 15,
    correct: [1],
    translations: {
      en: {
        question: "In React, how is data passed from a parent to a child component?",
        answers: ["state", "props", "context", "refs"],
        explanation: "Data flows from parent to child through props, which are read-only inside the child.",
      },
      ru: {
        question: "Как в React данные передаются от родительского компонента к дочернему?",
        answers: ["state", "props", "context", "refs"],
        explanation: "Данные передаются от родителя к ребёнку через props, доступные в ребёнке только для чтения.",
      },
      uz: {
        question: "React'da ma'lumot ota komponentdan bola komponentga qanday uzatiladi?",
        answers: ["state", "props", "context", "refs"],
        explanation: "Ma'lumot otadan bolaga props orqali uzatiladi; ular bola ichida faqat o'qish uchun.",
      },
    },
  },
  {
    id: "react-4",
    category: "react",
    difficulty: "easy",
    type: "single",
    time: 15,
    correct: [1],
    translations: {
      en: {
        question: "What should you provide for each item when rendering a list?",
        answers: ["A ref", "A unique key prop", "An id attribute", "A useEffect"],
        explanation: "Each list item needs a unique key prop so React can track which items change, add, or remove.",
      },
      ru: {
        question: "Что нужно указывать для каждого элемента при рендеринге списка?",
        answers: ["Ref", "Уникальный проп key", "Атрибут id", "useEffect"],
        explanation: "Каждому элементу списка нужен уникальный проп key, чтобы React отслеживал изменения элементов.",
      },
      uz: {
        question: "Ro'yxatni render qilishda har bir element uchun nima berish kerak?",
        answers: ["Ref", "Noyob key proppi", "id atributi", "useEffect"],
        explanation: "Har bir ro'yxat elementiga noyob key prop kerak, shunda React o'zgarishlarni kuzatib boradi.",
      },
    },
  },
  {
    id: "react-5",
    category: "react",
    difficulty: "easy",
    type: "single",
    time: 15,
    correct: [0],
    translations: {
      en: {
        question: "What is JSX?",
        answers: [
          "A syntax extension that looks like HTML inside JavaScript",
          "A CSS preprocessor",
          "A database query language",
          "A build tool",
        ],
        explanation: "JSX is a syntax extension that lets you write HTML-like markup directly inside JavaScript.",
      },
      ru: {
        question: "Что такое JSX?",
        answers: [
          "Синтаксическое расширение, похожее на HTML внутри JavaScript",
          "CSS-препроцессор",
          "Язык запросов к базе данных",
          "Инструмент сборки",
        ],
        explanation: "JSX — синтаксическое расширение, позволяющее писать HTML-подобную разметку прямо в JavaScript.",
      },
      uz: {
        question: "JSX nima?",
        answers: [
          "JavaScript ichida HTMLga o'xshaydigan sintaksis kengaytmasi",
          "CSS preprotsessori",
          "Ma'lumotlar bazasi so'rov tili",
          "Yig'ish (build) vositasi",
        ],
        explanation: "JSX — JavaScript ichida to'g'ridan-to'g'ri HTMLga o'xshash belgilash yozish imkonini beradi.",
      },
    },
  },
  {
    id: "react-6",
    category: "react",
    difficulty: "medium",
    type: "single",
    time: 20,
    correct: [1],
    translations: {
      en: {
        question: "Which hook memoizes a computed value between renders?",
        answers: ["useEffect", "useMemo", "useRef", "useState"],
        explanation: "useMemo caches a computed value and recomputes it only when its dependencies change.",
      },
      ru: {
        question: "Какой хук мемоизирует вычисленное значение между рендерами?",
        answers: ["useEffect", "useMemo", "useRef", "useState"],
        explanation: "useMemo кэширует вычисленное значение и пересчитывает его только при изменении зависимостей.",
      },
      uz: {
        question: "Qaysi hook renderlar orasida hisoblangan qiymatni memoizatsiya qiladi?",
        answers: ["useEffect", "useMemo", "useRef", "useState"],
        explanation: "useMemo hisoblangan qiymatni keshlaydi va faqat bog'liqliklari o'zgarganda qayta hisoblaydi.",
      },
    },
  },
  {
    id: "react-7",
    category: "react",
    difficulty: "medium",
    type: "single",
    time: 20,
    correct: [1],
    translations: {
      en: {
        question: "Which hook returns a mutable ref object that persists across renders without causing a re-render?",
        answers: ["useState", "useRef", "useCallback", "useContext"],
        explanation: "useRef returns a mutable ref object that persists across renders and never triggers a re-render.",
      },
      ru: {
        question: "Какой хук возвращает изменяемый ref-объект, сохраняющийся между рендерами и не вызывающий повторный рендер?",
        answers: ["useState", "useRef", "useCallback", "useContext"],
        explanation: "useRef возвращает изменяемый ref-объект, сохраняющийся между рендерами и не вызывающий рендер.",
      },
      uz: {
        question: "Qaysi hook renderlar orasida saqlanadigan va qayta renderni chaqirmaydigan o'zgaruvchan ref obyektini qaytaradi?",
        answers: ["useState", "useRef", "useCallback", "useContext"],
        explanation: "useRef renderlar orasida saqlanadigan va qayta renderni chaqirmaydigan o'zgaruvchan ref qaytaradi.",
      },
    },
  },
  {
    id: "react-8",
    category: "react",
    difficulty: "medium",
    type: "multi",
    time: 20,
    correct: [0, 1, 3],
    translations: {
      en: {
        question: "Which statements about props and state are correct?",
        answers: [
          "Props are read-only inside a component",
          "State is managed within the component",
          "A child can modify its props directly",
          "Changing state triggers a re-render",
        ],
        explanation: "Props are read-only, state lives inside the component, and changing state triggers a re-render.",
      },
      ru: {
        question: "Какие утверждения о props и state верны?",
        answers: [
          "Props доступны только для чтения внутри компонента",
          "State управляется внутри самого компонента",
          "Дочерний компонент может напрямую изменять свои props",
          "Изменение state вызывает повторный рендер",
        ],
        explanation: "Props только для чтения, state живёт внутри компонента, а его изменение вызывает рендер.",
      },
      uz: {
        question: "Props va state haqidagi qaysi fikrlar to'g'ri?",
        answers: [
          "Props komponent ichida faqat o'qish uchun",
          "State komponentning o'zida boshqariladi",
          "Bola komponent o'z props'ini to'g'ridan-to'g'ri o'zgartira oladi",
          "State o'zgarishi qayta renderni ishga tushiradi",
        ],
        explanation: "Props faqat o'qish uchun, state komponent ichida bo'ladi, uni o'zgartirish qayta render qiladi.",
      },
    },
  },
  {
    id: "react-9",
    category: "react",
    difficulty: "hard",
    type: "multi",
    time: 25,
    correct: [0, 1],
    translations: {
      en: {
        question: "Which are valid reasons to use useCallback?",
        answers: [
          "To memoize a function reference between renders",
          "To avoid passing new function props to memoized children",
          "To store a reference to a DOM node",
          "To run code after every render",
        ],
        explanation: "useCallback memoizes a function reference so memoized children don't get a new prop each render.",
      },
      ru: {
        question: "Какие причины использовать useCallback являются корректными?",
        answers: [
          "Чтобы мемоизировать ссылку на функцию между рендерами",
          "Чтобы не передавать новые функции-пропсы в мемоизированные дочерние компоненты",
          "Чтобы хранить ссылку на DOM-узел",
          "Чтобы выполнять код после каждого рендера",
        ],
        explanation: "useCallback мемоизирует ссылку на функцию, чтобы мемоизированные дети не получали новый проп.",
      },
      uz: {
        question: "useCallback ishlatish uchun qaysi sabablar to'g'ri?",
        answers: [
          "Renderlar orasida funksiya havolasini memoizatsiya qilish uchun",
          "Memoizatsiya qilingan bola komponentlarga yangi funksiya-proplar uzatmaslik uchun",
          "DOM tuguniga havolani saqlash uchun",
          "Har renderdan keyin kod bajarish uchun",
        ],
        explanation: "useCallback funksiya havolasini memoizatsiya qiladi, shunda memo bolalar yangi prop olmaydi.",
      },
    },
  },
  {
    id: "react-10",
    category: "react",
    difficulty: "hard",
    type: "single",
    time: 25,
    correct: [1],
    translations: {
      en: {
        question: "In useEffect, what does returning a function do?",
        answers: [
          "Nothing",
          "Defines a cleanup function run before the next effect or on unmount",
          "Sets the component state",
          "Memoizes the effect",
        ],
        explanation: "A function returned from useEffect is the cleanup, run before the next effect or on unmount.",
      },
      ru: {
        question: "Что делает возврат функции из useEffect?",
        answers: [
          "Ничего",
          "Задаёт функцию очистки, выполняемую перед следующим эффектом или при размонтировании",
          "Устанавливает состояние компонента",
          "Мемоизирует эффект",
        ],
        explanation: "Возвращённая из useEffect функция — это очистка перед следующим эффектом или при размонтировании.",
      },
      uz: {
        question: "useEffect'da funksiya qaytarish nima qiladi?",
        answers: [
          "Hech nima",
          "Keyingi effektdan oldin yoki komponent olib tashlanganda ishlaydigan tozalash funksiyasini belgilaydi",
          "Komponent holatini o'rnatadi",
          "Effektni memoizatsiya qiladi",
        ],
        explanation: "useEffect'dan qaytarilgan funksiya — tozalash, keyingi effektdan oldin yoki olib tashlashda ishlaydi.",
      },
    },
  },
]
