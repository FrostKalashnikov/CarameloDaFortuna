"use strict";

var slot_screen = document.getElementById("slot-screen");
var reel = document.getElementsByClassName("reel");
var reels = document.getElementsByClassName("reels");
var stop_btn = document.getElementsByClassName("stop-btn");
var start_btn = document.getElementById("start-btn");
var sec = 500;
var stopReelFlag = [];
var reelCounts = [];
var slotFrameHeight;
var slotReelsHeight;
var slotReelItemHeight;
var slotReelStartHeight;
var slot = {
  init: function init() {
    stopReelFlag = [false, false, false];
    reelCounts = [0, 0, 0];
  },
  start: function start() {
    slot.init();

    for (var index = 0; index < 3; index++) {
      slot.animation(index);
    }
  },
  stop: function stop(i) {
    stopReelFlag[i] = true; // Check if all reels are stopped

    if (stopReelFlag.every(function (flag) {
      return flag === true;
    })) {
      start_btn.removeAttribute("disabled");
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = stop_btn[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var btn = _step.value;
          btn.setAttribute("disabled", true);
        } // Check if all three reels have the same image

      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (this.checkWin()) {
        alert("Congratulations! You won!");
      }
    }
  },
  // Function to check if all three reels display the same image
  checkWin: function checkWin() {
    var reelImages = [];

    for (var i = 0; i < reels.length; i++) {
      // Get the currently visible image in each reel
      var reelItems = reels[i].getElementsByTagName("li");
      var visibleImage = reelItems[reelCounts[i] % reelItems.length].getElementsByTagName("img")[0].src;
      reelImages.push(visibleImage);
    } // Check if all images in reelImages array are the same


    return reelImages.every(function (img, _, arr) {
      return img === arr[0];
    });
  },
  resetLocationInfo: function resetLocationInfo() {
    slotFrameHeight = slot_screen.offsetHeight;
    slotReelsHeight = reels[0].offsetHeight;
    slotReelItemHeight = reel[0].offsetHeight;
    slotReelStartHeight = -slotReelsHeight + slotFrameHeight - slotFrameHeight / 2 + slotReelItemHeight * 3 / 2;

    for (var i = 0; i < reels.length; i++) {
      reels[i].style.top = slotReelStartHeight + "px";
    }
  },
  animation: function animation(index) {
    if (reelCounts[index] >= 10) {
      reelCounts[index] = 0;
    }

    reels[index].style.transition = "top ".concat(sec, "ms linear");
    reels[index].style.top = "".concat(slotReelStartHeight + reelCounts[index] * slotReelItemHeight, "px");
    setTimeout(function () {
      if (!stopReelFlag[index]) {
        reelCounts[index]++;
        slot.animation(index);
      }
    }, sec);
  }
};

window.onload = function () {
  slot.init();
  slot.resetLocationInfo();
  start_btn.addEventListener("click", function (e) {
    e.target.setAttribute("disabled", true);
    slot.start();
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = stop_btn[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var btn = _step2.value;
        btn.removeAttribute("disabled");
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  });

  for (var i = 0; i < stop_btn.length; i++) {
    stop_btn[i].addEventListener("click", function (e) {
      slot.stop(parseInt(e.target.getAttribute("data-val")));
    });
  }
};