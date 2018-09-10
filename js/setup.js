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

// Создание DOM элемента
var makeElement = function (elOrg, wizard) {
  var el = elOrg.cloneNode(true);
  var name = el.querySelector('.setup-similar-label');
  name.textContent = wizard.name;

  var coat = el.querySelector('.wizard-coat');
  coat.style.fill = wizard.coatColor;

  var eyes = el.querySelector('.wizard-eyes');
  eyes.style.fill = wizard.eyesColor;
  return el;
};

// Наполнение элементов данными волшебников и добавление их во фрагмент
var fillElements = function (wizards) {
  var template = document.querySelector('#similar-wizard-template');
  var elOrg = template.content.querySelector('div');
  var fragment = document.createDocumentFragment();

  wizards.forEach(function (wizard) {
    fragment.appendChild(makeElement(elOrg, wizard));
  });

  return fragment;
};

// Отображение элементов волшебников
var addElement = function (fragment, selector) {
  var setupList = document.querySelector(selector);
  setupList.appendChild(fragment);
};

var showElement = function (selector) {
  var element = document.querySelector(selector);
  if (element) {
    element.classList.remove('hidden');
  }
};

showElement('.setup');
var fragment = fillElements(generateData(WIZARD_COUNT));
addElement(fragment, '.setup-similar-list');
showElement('.setup-similar');
