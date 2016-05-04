/*
* @Author: niumeng
* @Date:   2016-05-03 10:55:44
* @Last Modified by:   niumeng
* @Last Modified time: 2016-05-04 15:40:03
*/

;(function (win, doc) {
    var newExposure = {
        _listeningEles: [],

        _init: function () {
            this._bindEvent();
        },

        _bindEvent: function () {
            this._scrollListener(win, {'scrollEnd': this._checkExposeure.bind(this)});

            win.addEventListener('resize', this._checkExposeure.bind(this), false);
        },

        _checkExposeure: function () {
            var i = 0;
            var len = this._listeningEles.length;
            var action = null;

            for (i = 0; i < len; i++) {
                if (!this._listeningEles[i].canRepeat && this._listeningEles[i].doneOnce) {
                    continue;
                }

                if (this._eleInView(this._listeningEles[i].ele)) {
                    action = this._listeningEles[i].action;

                    action && action();

                    this._listeningEles[i].doneOnce = true;
                }
            }
        },

        _eleInView: function (ele) {
            if (!ele) {
                return false;
            }

            var viewHeight = win.screen.height;

            var rect = ele.getBoundingClientRect();
            var threshold = 100;

            if (((rect.top > 0) && (viewHeight - rect.top > threshold)) || ((rect.bottom > threshold) && (rect.bottom < viewHeight))) {
                // console.log(ele);

                return true;
            }
        },

        pushListeningEle: function (ele, action, canRepeat) {
            var listeningEle = {};

            listeningEle.ele = ele;
            listeningEle.action = this._actionFactory(action);
            listeningEle.canRepeat = canRepeat ? true : false;
            listeningEle.doneOnce = false;

            // console.log(listeningEle);

            this._listeningEles.push(listeningEle);
        },

        _actionFactory: function (action) {
            var actionType = typeof action;

            if (actionType == 'function') {
                return action;
            } else if (actionType == 'string') {
                return function () {
                    var url = (action.indexOf('?') > -1 ? action + '&timestamp=' + (new Date()).valueOf() : action + '?timestamp=' + (new Date()).valueOf());

                    var oImg = new Image();
                    oImg.src = url;
                };
            } else {
                return null;
            }
        },

        _scrollListener: function (target, option) {
            //校验参数
            if (!target || typeof option != 'object') {
                throw new Error('scrollListener needs a object parameter.');
            }

            //滚动开始、滚动中、滚动结束、判断滚动结束及两次不同滚动的时间依据
            var alowList = ['scrollStart', 'scrolling', 'scrollEnd', 'threshold'];

            var _opt = {};

            for (var i = 0; i < 3; i++) {
                _opt[alowList[i]] = option[alowList[i]] || null;
            }

            _opt['threshold'] = option['threshold'] || 500;



            target.addEventListener('scroll', callback, false);

            var lastScrollingTime = new Date(1970, 0, 1, 0, 0, 0);
            var timer = 0;

            function callback () {
                clearTimeout(timer);

                var currentTime = new Date();

                if (currentTime - lastScrollingTime > _opt.threshold) {
                    _opt.scrollStart && _opt.scrollStart();
                }

                lastScrollingTime = currentTime;

                _opt.scrolling && _opt.scrolling();

                timer = setTimeout(function () {
                    _opt.scrollEnd && _opt.scrollEnd();
                }, _opt.threshold)
            }
        }
    };

    newExposure._init();

    Object.defineProperties(win, {
        newExposure: {
            value: newExposure
        }
    });
})(window, document);
