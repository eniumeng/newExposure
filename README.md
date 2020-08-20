# newExposure

1. introduction:

    The newExposure is a tool for collecting exposure info in web page when user scroll the page.

    It can be used by passing a request URL or a callback function, and can be setted as doing once action or more.

2. usage:

    step 1: include the js file in your web page

    with npm:

    ```bash
    npm install --save newExposure
    ```

    then:

    ```javascript
    import newExposure from 'newexposure'
    ```

    or.

    download in your local project manually

    then:

    ```html
    <script src="js/newExposure.js"></script>
    ```

    step 2: call the following method when you need to add exposure:

    ```javascript
    newExposure.pushListeningEle(ele, action, canRepeat)
    ```

    eg.

    ```javascript
    newExposure.pushListeningEle(document.querySelector('#exp'), 'https://xxx.com/1.gif', false);
    ```

    or.

    ```javascript
    newExposure.pushListeningEle(document.querySelector('#exp'), () => {
      console.log('showing...');
    }, true);
    ```
