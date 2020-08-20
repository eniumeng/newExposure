# newExposure

1. introduction:

    The newExposure is a tool for collecting exposure info in web page when user scroll the page.

    It can be used by passing a request URL or a callback function, and can be setted as doing once action or more.

2. usage:

    step 1: include the js file in your web page

      npm install --save newExposure

      or.

      download in your local project, then:

      <script src="js/newExposure.js"></script>

    step 2: call the following method when you need to add exposure:

      newExposure.pushListeningEle(ele, action, canRepeat)

      eg.

      newExposure.pushListeningEle(document.querySelector('#exp'), 'https://xxx.com/1.gif', false);

      or.

      newExposure.pushListeningEle(document.querySelector('#exp'), function () {console.log('showing...');}, true);
