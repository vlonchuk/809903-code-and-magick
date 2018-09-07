'use strict';

var FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var WIZARD_COUNT = 4;

// Возврат случайного элемента массива
var getRandElement = function (array) {
  var size = 1.0 / array.length;
  var randIndex = Math.floor(Math.random() / size);
  return array[randIndex];
};

// Генерация массива данных вошебников
var generateData = function (wizardCount) {
  var wizardData = [];
  for (var i = 0; i < wizardCount; i++) {
    var name = getRandElement(FIRST_NAMES) + ' ' + getRandElement(LAST_NAMES);
    var coatColor = getRandElement(COAT_COLORS);
    var eyesColor = getRandElement(EYES_COLORS);
    wizardData[i] = {name: name, coatColor: coatColor, eyesColor: eyesColor};
  }
  return wizardData;
};

// Создание массива DOM элементов
var makeElements = function (wizardCount) {
  var elements = [];
  var template = document.querySelector('#similar-wizard-template');
  var elOrg = template.content.querySelector('div');
  for (var i = 0; i < wizardCount; i++) {
    elements.push(elOrg.cloneNode(true));
  }
  return elements;
};

// Наполнение элементов данными волшебников и добавление их во фрагмент
var fillElements = function (elements, wizards) {
  var fragment = document.createDocumentFragment();
  elements.forEach(function (el, i) {
    var name = el.querySelector('.setup-similar-label');
    name.textContent = wizards[i].name;

    var coat = el.querySelector('.wizard-coat');
    coat.style.fill = wizards[i].coatColor;

    var eyes = el.querySelector('.wizard-eyes');
    eyes.style.fill = wizards[i].eyesColor;

    fragment.appendChild(el);
  });
  return fragment;
};

// Отображение элементов волшебников
var addElement = function (fragment, selector) {
  var setupList = document.querySelector('.setup-similar-list');
  setupList.appendChild(fragment);
}

var showElement = function (selector) {
  var element = document.querySelector(selector);
  if(element) {
    element.classList.remove('hidden');
  }
}

showElement('.setup');
var wizards = generateData(WIZARD_COUNT);
var elements = makeElements(wizards.length);
var fragment = fillElements(elements, wizards);
addElement(fragment, '.setup-similar-list');
showElement('.setup-similar');
