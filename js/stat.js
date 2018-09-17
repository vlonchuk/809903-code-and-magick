'use strict';

(function () {
  var X_START = 100; // Начальные координаты облака
  var Y_START = 10;
  var SHADOW_OFFSET = 10; // Смещение тени облака
  var CLOUD_WIDTH = 420; // Размеры облака
  var CLOUD_HEIGHT = 270;
  var FONT_HEIGHT_OFFSET = 10; // Корректировка высоты текста

  var CLOUD_COLOR = 'white';
  var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)'; //
  var TEXT_COLOR = 'black';
  var TEXT_FONT = '16px PT Mono';
  var CURRENT_USER_NAME = 'Вы';
  var CURRENT_USER_COLOR = 'rgba(255, 0, 0, 1)';
  var OTHER_USER_COLOR = 'rgba(0, 0, 255, ';

  var GRAPH_OFFSET = 50;
  var GRAPH_WIDTH = 40;
  var X_GRAPH_START = X_START + GRAPH_OFFSET;
  var GRAPH_HEIGHT = 150;

  var TITLE_CAPTIONS = ['Ура вы победили!', 'Список результатов:'];
  var MEASURE_LETTER = 'H';

  // Рисование облака
  var renderCloud = function (ctx) {
    ctx.fillStyle = CLOUD_SHADOW_COLOR;
    ctx.fillRect(X_START + SHADOW_OFFSET, Y_START + SHADOW_OFFSET, CLOUD_WIDTH, CLOUD_HEIGHT); // Тень
    ctx.fillStyle = CLOUD_COLOR;
    ctx.fillRect(X_START, Y_START, CLOUD_WIDTH, CLOUD_HEIGHT); // Облако
  };

  // Вывод заголовка в облаке
  var renderTitle = function (ctx) {
    var textHeight = ctx.measureText(MEASURE_LETTER).width + FONT_HEIGHT_OFFSET;
    var yText = Y_START + textHeight;
    ctx.fillStyle = TEXT_COLOR;
    ctx.font = TEXT_FONT;
    TITLE_CAPTIONS.forEach(function (caption) {
      ctx.fillText(caption, X_START + CLOUD_WIDTH / 2 - (ctx.measureText(caption).width / 2), yText);
      yText += textHeight;
    });
    return {yText: yText, textHeight: textHeight};
  };

  // Вывод графиков в облаке
  var renderGraphs = function (ctx, names, times, titleParams) {
    var maxTime = Math.max.apply(null, times); // Определение максимального времени прохождения игры
    var x = X_GRAPH_START; // Координата х первого графика

    // Цикл по количеству игроков
    times.forEach(function (time, i) {
      var curHeight = (GRAPH_HEIGHT * time) / maxTime; // Высота текущего графика, пропорция
      // Текст над графиком
      ctx.fillStyle = TEXT_COLOR;
      ctx.fillText(Math.round(time), x, titleParams.yText + titleParams.textHeight + (GRAPH_HEIGHT - curHeight) - FONT_HEIGHT_OFFSET);

      // График
      if (names[i] === CURRENT_USER_NAME) {
        ctx.fillStyle = CURRENT_USER_COLOR;
      } else {
        ctx.fillStyle = OTHER_USER_COLOR + Math.random() + ')';
      }
      ctx.fillRect(x, titleParams.yText + titleParams.textHeight + (GRAPH_HEIGHT - curHeight), GRAPH_WIDTH, curHeight);

      // Текст под графиком
      ctx.fillStyle = TEXT_COLOR;
      ctx.fillText(names[i], x, titleParams.yText + titleParams.textHeight * 2 + GRAPH_HEIGHT);

      // Координата х следующего графика
      x += GRAPH_OFFSET + GRAPH_WIDTH;
    });
  };

  // Вывод облака
  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx);
    var titleParams = renderTitle(ctx);
    renderGraphs(ctx, names, times, titleParams);
  };
})();
