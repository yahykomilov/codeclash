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
      },
      ru: {
        question: "Как расшифровывается HTML?",
        answers: [
          "HyperText Markup Language",
          "HighText Machine Language",
          "HyperText Markdown Language",
          "Home Tool Markup Language",
        ],
      },
      uz: {
        question: "HTML nimani anglatadi?",
        answers: [
          "HyperText Markup Language",
          "HighText Machine Language",
          "HyperText Markdown Language",
          "Home Tool Markup Language",
        ],
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
      },
      ru: {
        question: "Какой тег создаёт самый крупный заголовок?",
        answers: ["<head>", "<h1>", "<h6>", "<title>"],
      },
      uz: {
        question: "Qaysi teg eng katta sarlavha yaratadi?",
        answers: ["<head>", "<h1>", "<h6>", "<title>"],
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
      },
      ru: {
        question: "Какой атрибут задаёт альтернативный текст для изображения?",
        answers: ["alt", "src", "title", "longdesc"],
      },
      uz: {
        question: "Qaysi atribut rasm uchun muqobil matnni belgilaydi?",
        answers: ["alt", "src", "title", "longdesc"],
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
      },
      ru: {
        question: "Какой тег используется для создания гиперссылки?",
        answers: ["<link>", "<a>", "<href>", "<nav>"],
      },
      uz: {
        question: "Havola (gipermurojaat) yaratish uchun qaysi teg ishlatiladi?",
        answers: ["<link>", "<a>", "<href>", "<nav>"],
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
      },
      ru: {
        question: "Какой элемент представляет основное содержимое документа и уникален на странице?",
        answers: ["<section>", "<main>", "<article>", "<div>"],
      },
      uz: {
        question: "Qaysi element hujjatning asosiy mazmunini ifodalaydi va sahifada yagona bo'ladi?",
        answers: ["<section>", "<main>", "<article>", "<div>"],
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
      },
      ru: {
        question: "Какие из перечисленных являются семантическими элементами HTML5?",
        answers: ["<article>", "<div>", "<figure>", "<span>"],
      },
      uz: {
        question: "Quyidagilardan qaysilari HTML5 semantik elementlari hisoblanadi?",
        answers: ["<article>", "<div>", "<figure>", "<span>"],
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
      },
      ru: {
        question: "Какой тип input показывает выбор даты в поддерживающих браузерах?",
        answers: ["type=\"text\"", "type=\"date\"", "type=\"datetime\"", "type=\"calendar\""],
      },
      uz: {
        question: "Qaysi input turi qo'llab-quvvatlaydigan brauzerlarda sana tanlagichni ko'rsatadi?",
        answers: ["type=\"text\"", "type=\"date\"", "type=\"datetime\"", "type=\"calendar\""],
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
      },
      ru: {
        question: "Какие атрибуты используются, чтобы связать <label> с элементом формы?",
        answers: ["for", "name", "id", "value"],
      },
      uz: {
        question: "<label>ni forma boshqaruv elementi bilan bog'lash uchun qaysi atributlar ishlatiladi?",
        answers: ["for", "name", "id", "value"],
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
      },
      ru: {
        question: "Какой атрибут ARIA указывает, развёрнут или свёрнут элемент в данный момент?",
        answers: ["aria-hidden", "aria-expanded", "aria-label", "aria-role"],
      },
      uz: {
        question: "Qaysi ARIA atributi element hozir yoyilgan yoki yig'ilganini bildiradi?",
        answers: ["aria-hidden", "aria-expanded", "aria-label", "aria-role"],
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
      },
      ru: {
        question: "Какие практики улучшают доступность веб-страниц (a11y)?",
        answers: [
          "Использование семантических элементов",
          "Добавление alt-текста к изображениям",
          "Передача смысла только с помощью цвета",
          "Наличие подписей у полей форм",
        ],
      },
      uz: {
        question: "Qaysi amaliyotlar veb-sahifa qulayligini (a11y) yaxshilaydi?",
        answers: [
          "Semantik elementlardan foydalanish",
          "Rasmlarga alt matn qo'shish",
          "Ma'noni faqat rang orqali yetkazish",
          "Forma maydonlariga yorliqlar berish",
        ],
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
      },
      ru: {
        question: "Какое свойство CSS меняет цвет текста?",
        answers: ["font-style", "text-color", "color", "background"],
      },
      uz: {
        question: "Qaysi CSS xususiyati matn rangini o'zgartiradi?",
        answers: ["font-style", "text-color", "color", "background"],
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
      },
      ru: {
        question: "Как выбрать элемент с id \"app\" в CSS?",
        answers: [".app", "#app", "*app", "app"],
      },
      uz: {
        question: "CSS'da id \"app\" bo'lgan elementni qanday tanlaysiz?",
        answers: [".app", "#app", "*app", "app"],
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
      },
      ru: {
        question: "Какое свойство задаёт пространство внутри элемента, между содержимым и границей?",
        answers: ["margin", "padding", "border", "gap"],
      },
      uz: {
        question: "Qaysi xususiyat element ichidagi, mazmun va chegara orasidagi bo'shliqni belgilaydi?",
        answers: ["margin", "padding", "border", "gap"],
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
      },
      ru: {
        question: "Какое значение свойства display делает элемент flex-контейнером?",
        answers: ["block", "flex", "grid", "inline"],
      },
      uz: {
        question: "display xususiyatining qaysi qiymati elementni flex-konteynerga aylantiradi?",
        answers: ["block", "flex", "grid", "inline"],
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
      },
      ru: {
        question: "Какая единица измерения зависит от размера шрифта корневого элемента?",
        answers: ["px", "em", "rem", "pt"],
      },
      uz: {
        question: "Qaysi o'lchov birligi ildiz elementning shrift o'lchamiga bog'liq bo'ladi?",
        answers: ["px", "em", "rem", "pt"],
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
      },
      ru: {
        question: "Во flexbox какое свойство выравнивает элементы вдоль главной оси?",
        answers: ["align-items", "justify-content", "align-content", "flex-wrap"],
      },
      uz: {
        question: "Flexbox'da qaysi xususiyat elementlarni asosiy o'q bo'ylab tekislaydi?",
        answers: ["align-items", "justify-content", "align-content", "flex-wrap"],
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
      },
      ru: {
        question: "Какие из этих значений свойства position допустимы в CSS?",
        answers: ["static", "relative", "center", "absolute"],
      },
      uz: {
        question: "Bulardan qaysilari CSS position xususiyatining to'g'ri qiymatlari?",
        answers: ["static", "relative", "center", "absolute"],
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
      },
      ru: {
        question: "Какие свойства входят в блочную модель CSS (box model)?",
        answers: ["margin", "padding", "border", "color"],
      },
      uz: {
        question: "Qaysi xususiyatlar CSS box model tarkibiga kiradi?",
        answers: ["margin", "padding", "border", "color"],
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
      },
      ru: {
        question: "Какова специфичность селектора #nav .item a (в виде id-классы-элементы)?",
        answers: ["0-1-1", "1-0-1", "1-1-1", "0-2-1"],
      },
      uz: {
        question: "#nav .item a selektorining spetsifikligi qanday (id-klass-element ko'rinishida)?",
        answers: ["0-1-1", "1-0-1", "1-1-1", "0-2-1"],
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
      },
      ru: {
        question: "Что создаёт grid-template-columns: repeat(3, 1fr) в CSS Grid?",
        answers: [
          "Три строки одинаковой высоты",
          "Три колонки одинаковой ширины",
          "Фиксированную сетку 3x3",
          "Три колонки по размеру содержимого",
        ],
      },
      uz: {
        question: "CSS Grid'da grid-template-columns: repeat(3, 1fr) nima yaratadi?",
        answers: [
          "Balandligi teng uchta qator",
          "Kengligi teng uchta ustun",
          "Qat'iy 3x3 to'r",
          "Mazmuni o'lchamidagi uchta ustun",
        ],
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
      },
      ru: {
        question: "Что вернёт typeof null?",
        answers: ["\"null\"", "\"undefined\"", "\"object\"", "\"number\""],
      },
      uz: {
        question: "typeof null nima qaytaradi?",
        answers: ["\"null\"", "\"undefined\"", "\"object\"", "\"number\""],
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
      },
      ru: {
        question: "Какое ключевое слово объявляет блочную константу?",
        answers: ["const", "var", "let", "define"],
      },
      uz: {
        question: "Qaysi kalit so'z blok doiradagi konstantani e'lon qiladi?",
        answers: ["const", "var", "let", "define"],
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
      },
      ru: {
        question: "Какой оператор проверяет равенство без приведения типов?",
        answers: ["==", "===", "=", "!="],
      },
      uz: {
        question: "Qaysi operator turlarni o'zgartirmasdan tenglikni tekshiradi?",
        answers: ["==", "===", "=", "!="],
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
      },
      ru: {
        question: "Какой метод добавляет один или несколько элементов в конец массива?",
        answers: ["push", "pop", "shift", "unshift"],
      },
      uz: {
        question: "Qaysi metod massiv oxiriga bir yoki bir nechta element qo'shadi?",
        answers: ["push", "pop", "shift", "unshift"],
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
      },
      ru: {
        question: "Какое значение хранит объявленная, но не инициализированная переменная?",
        answers: ["null", "0", "undefined", "NaN"],
      },
      uz: {
        question: "E'lon qilingan, ammo ishga tushirilmagan o'zgaruvchi qanday qiymatga ega bo'ladi?",
        answers: ["null", "0", "undefined", "NaN"],
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
      },
      ru: {
        question: "Какой метод массива возвращает новый массив из результатов вызова функции для каждого элемента?",
        answers: ["forEach", "map", "filter", "reduce"],
      },
      uz: {
        question: "Qaysi massiv metodi har bir element uchun funksiyani chaqirib, natijalardan yangi massiv qaytaradi?",
        answers: ["forEach", "map", "filter", "reduce"],
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
      },
      ru: {
        question: "Какие из этих значений являются ложными (falsy) в JavaScript?",
        answers: ["0", "\"\"", "\"0\"", "null"],
      },
      uz: {
        question: "Bu qiymatlardan qaysilari JavaScript'da falsy (yolg'on) hisoblanadi?",
        answers: ["0", "\"\"", "\"0\"", "null"],
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
      },
      ru: {
        question: "Какие утверждения о замыкании (closure) верны?",
        answers: [
          "Оно запоминает переменные из внешней области видимости",
          "Оно работает только со стрелочными функциями",
          "Оно требует ключевого слова class",
          "Оно может обращаться к этим переменным после завершения внешней функции",
        ],
      },
      uz: {
        question: "Closure (yopilma) haqidagi qaysi fikrlar to'g'ri?",
        answers: [
          "U tashqi doiradagi o'zgaruvchilarni eslab qoladi",
          "U faqat strelka (arrow) funksiyalar bilan ishlaydi",
          "U class kalit so'zini talab qiladi",
          "U tashqi funksiya tugagach ham o'sha o'zgaruvchilarga murojaat qila oladi",
        ],
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
      },
      ru: {
        question: "Что всегда возвращает async-функция?",
        answers: ["Promise", "Разрешённое значение напрямую", "undefined", "Колбэк"],
      },
      uz: {
        question: "async funksiya doim nimani qaytaradi?",
        answers: ["Promise", "Hal qilingan qiymatni to'g'ridan-to'g'ri", "undefined", "Callback"],
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
      },
      ru: {
        question: "Из-за поднятия (hoisting) что выведет console.log(x); var x = 5;?",
        answers: ["5", "undefined", "ReferenceError", "null"],
      },
      uz: {
        question: "Hoisting sababli console.log(x); var x = 5; nimani chop etadi?",
        answers: ["5", "undefined", "ReferenceError", "null"],
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
      },
      ru: {
        question: "Что возвращает хук useState?",
        answers: [
          "Одно значение",
          "Только функцию",
          "Объект с состоянием",
          "Пару: [состояние, setState]",
        ],
      },
      uz: {
        question: "useState hook nimani qaytaradi?",
        answers: [
          "Bitta qiymat",
          "Faqat funksiya",
          "Holatli obyekt",
          "Juftlik: [holat, setState]",
        ],
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
      },
      ru: {
        question: "Какой хук выполняет побочные эффекты после рендера?",
        answers: ["useMemo", "useEffect", "useRef", "useCallback"],
      },
      uz: {
        question: "Qaysi hook renderdan keyin nojo'ya effektlarni bajaradi?",
        answers: ["useMemo", "useEffect", "useRef", "useCallback"],
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
      },
      ru: {
        question: "Как в React данные передаются от родительского компонента к дочернему?",
        answers: ["state", "props", "context", "refs"],
      },
      uz: {
        question: "React'da ma'lumot ota komponentdan bola komponentga qanday uzatiladi?",
        answers: ["state", "props", "context", "refs"],
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
      },
      ru: {
        question: "Что нужно указывать для каждого элемента при рендеринге списка?",
        answers: ["Ref", "Уникальный проп key", "Атрибут id", "useEffect"],
      },
      uz: {
        question: "Ro'yxatni render qilishda har bir element uchun nima berish kerak?",
        answers: ["Ref", "Noyob key proppi", "id atributi", "useEffect"],
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
      },
      ru: {
        question: "Что такое JSX?",
        answers: [
          "Синтаксическое расширение, похожее на HTML внутри JavaScript",
          "CSS-препроцессор",
          "Язык запросов к базе данных",
          "Инструмент сборки",
        ],
      },
      uz: {
        question: "JSX nima?",
        answers: [
          "JavaScript ichida HTMLga o'xshaydigan sintaksis kengaytmasi",
          "CSS preprotsessori",
          "Ma'lumotlar bazasi so'rov tili",
          "Yig'ish (build) vositasi",
        ],
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
      },
      ru: {
        question: "Какой хук мемоизирует вычисленное значение между рендерами?",
        answers: ["useEffect", "useMemo", "useRef", "useState"],
      },
      uz: {
        question: "Qaysi hook renderlar orasida hisoblangan qiymatni memoizatsiya qiladi?",
        answers: ["useEffect", "useMemo", "useRef", "useState"],
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
      },
      ru: {
        question: "Какой хук возвращает изменяемый ref-объект, сохраняющийся между рендерами и не вызывающий повторный рендер?",
        answers: ["useState", "useRef", "useCallback", "useContext"],
      },
      uz: {
        question: "Qaysi hook renderlar orasida saqlanadigan va qayta renderni chaqirmaydigan o'zgaruvchan ref obyektini qaytaradi?",
        answers: ["useState", "useRef", "useCallback", "useContext"],
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
      },
      ru: {
        question: "Какие утверждения о props и state верны?",
        answers: [
          "Props доступны только для чтения внутри компонента",
          "State управляется внутри самого компонента",
          "Дочерний компонент может напрямую изменять свои props",
          "Изменение state вызывает повторный рендер",
        ],
      },
      uz: {
        question: "Props va state haqidagi qaysi fikrlar to'g'ri?",
        answers: [
          "Props komponent ichida faqat o'qish uchun",
          "State komponentning o'zida boshqariladi",
          "Bola komponent o'z props'ini to'g'ridan-to'g'ri o'zgartira oladi",
          "State o'zgarishi qayta renderni ishga tushiradi",
        ],
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
      },
      ru: {
        question: "Какие причины использовать useCallback являются корректными?",
        answers: [
          "Чтобы мемоизировать ссылку на функцию между рендерами",
          "Чтобы не передавать новые функции-пропсы в мемоизированные дочерние компоненты",
          "Чтобы хранить ссылку на DOM-узел",
          "Чтобы выполнять код после каждого рендера",
        ],
      },
      uz: {
        question: "useCallback ishlatish uchun qaysi sabablar to'g'ri?",
        answers: [
          "Renderlar orasida funksiya havolasini memoizatsiya qilish uchun",
          "Memoizatsiya qilingan bola komponentlarga yangi funksiya-proplar uzatmaslik uchun",
          "DOM tuguniga havolani saqlash uchun",
          "Har renderdan keyin kod bajarish uchun",
        ],
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
      },
      ru: {
        question: "Что делает возврат функции из useEffect?",
        answers: [
          "Ничего",
          "Задаёт функцию очистки, выполняемую перед следующим эффектом или при размонтировании",
          "Устанавливает состояние компонента",
          "Мемоизирует эффект",
        ],
      },
      uz: {
        question: "useEffect'da funksiya qaytarish nima qiladi?",
        answers: [
          "Hech nima",
          "Keyingi effektdan oldin yoki komponent olib tashlanganda ishlaydigan tozalash funksiyasini belgilaydi",
          "Komponent holatini o'rnatadi",
          "Effektni memoizatsiya qiladi",
        ],
      },
    },
  },
]
