# newExposure

1. introduction:

The newExposure is a tool for collecting exposure info in web page.

It can be used by passing request URL or callback function, and can be setted as doing once action or more.



2. usage:

    step 1: include the js file in your web page

    step 2: call the following method when you need to add exposure:

        newExposure.(ele, action, canRepeat)

        eg.

        newExposure.(document.querySelector('#exp'), 'https://xxx.com/1.gif', false);

        or.

        newExposure.(document.querySelector('#exp'), function () {console.log('showing...');}, true);
