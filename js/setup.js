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

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
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

var setVisibility = function (selectorOrElement, visible) {
  var element;
  if (!(selectorOrElement instanceof Object)) {
    element = document.querySelector(selectorOrElement);
  } else {
    element = selectorOrElement;
  }

  if (element) {
    if (visible) {
      element.classList.remove('hidden');
    } else {
      element.classList.add('hidden');
    }
  }
};

var elSetup;

var showSetup = function () {
  setVisibility(elSetup, true);
  document.addEventListener('keydown', onSetupKeyDown);
};

var hideSetup = function () {
  setVisibility(elSetup, false);
  document.removeEventListener('keydown', onSetupKeyDown);
};

var onSetupKeyDown = function (evt) {
  if (evt.keyCode === 27) {
    var elSetupUserName = elSetup.querySelector('.setup-user-name');
    if (!(elSetupUserName && document.activeElement === elSetupUserName)) {
      hideSetup();
    }
  }
};

var setFireballColor = function (elFireball) {
  var color = getRandElement(FIREBALL_COLORS);
  elFireball.style.background = color;
  var elfireballColor = elFireball.querySelector('input');
  elfireballColor.value = color;
};

var changeFillColor = function (el, _array) {
  el.style.fill = getRandElement(_array);
};


var initEventsHandlers = function () {
  elSetup = document.querySelector('.setup');
  var elSetupOpen = document.querySelector('.setup-open');
  var elSetupClose = elSetup.querySelector('.setup-close');
  var elCoat = elSetup.querySelector('.wizard-coat');
  var elEyes = elSetup.querySelector('.wizard-eyes');
  var elFireball = elSetup.querySelector('.setup-fireball-wrap');

  elFireball.addEventListener('click', function () {
    setFireballColor(elFireball);
  });
  elEyes.addEventListener('click', function (evt) {
    changeFillColor(evt.target, EYES_COLORS);
  });
  elCoat.addEventListener('click', function (evt) {
    changeFillColor(evt.target, COAT_COLORS);
  });
  elSetupClose.addEventListener('click', function () {
    hideSetup();
  });
  elSetupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      hideSetup();
    }
  });
  elSetupOpen.addEventListener('click', function () {
    showSetup();
  });
  elSetupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      showSetup();
    }
  });
};

var generateWizards = function () {
  var fragment = fillElements(generateData(WIZARD_COUNT));
  addElement(fragment, '.setup-similar-list');
  setVisibility('.setup-similar', true);
};

generateWizards();
initEventsHandlers();
