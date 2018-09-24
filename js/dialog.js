'use strict';

(function () {
  var elSetup = document.querySelector('.setup');
  var dialogHandle = elSetup.querySelector('.upload');

  var onDialogHandleMouseDown = function (evt) {
    evt.preventDefault();

    var startPoint = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startPoint.x - moveEvt.clientX,
        y: startPoint.y - moveEvt.clientY
      };

      startPoint = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      dragged = true;

      elSetup.style.left = (elSetup.offsetLeft - shift.x) + 'px';
      elSetup.style.top = (elSetup.offsetTop - shift.y) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        var onPreventDefaultClick = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', onPreventDefaultClick);
        };
        dialogHandle.addEventListener('click', onPreventDefaultClick);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  if (dialogHandle) {
    dialogHandle.addEventListener('mousedown', onDialogHandleMouseDown);
  }
})();
