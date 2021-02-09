function MyView(appParams) {
    this.target = appParams.target;
    var instance = this;

    this.setController = function (controller) {
        instance.controller = controller;
    }

    this.renderText = function (text) {
        var target = document.getElementById(this.target);
        target.innerHTML = '';
        var textNode = document.createTextNode('text from api: ' + text);
        target.appendChild(textNode);

        var button = document.createElement('button');
        button.innerHTML = 'clickme';
        button.onclick = function () {
            instance.controller.onButtonClick('buttonvalue');
        }

        target.appendChild(button);
    }

}