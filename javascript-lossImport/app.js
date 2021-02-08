
function MyView(appParams) {
    this.target = appParams.target;
    var instance = this;

    this.setController = function (controller) {
        instance.controller = controller;
    }

    this.renderText = function (textObject) {
        var target = document.getElementById(this.target);
        target.innerHTML = '';
        var textNode = document.createTextNode('text from api: ' + textObject.text);
        target.appendChild(textNode);

        var button = document.createElement('button');
        button.innerHTML = 'clickme';
        button.onclick = function () {
            instance.controller.onButtonClick({ text: 'button value' });
        }

        target.appendChild(button);
    }

}

function MyController(appParams, model, view) {
    this.model = model;
    this.view = view;
    var instance = this;

    this.getTarget = function () {
        return this.target;
    }

    this.startAppWithSomeData = function () {
        this.model.loadData({}, function (response) {
            instance.view.renderText(response);
        })
    };

    this.onButtonClick = function (param) {
        this.view.renderText(param);
    };
}

function MyModel(appParams) {
    this.apiUrl = appParams.apiUrl;

    this.loadData = function (params, callback) {
        console.log('fake calling ' + this.apiUrl);
        var data = {
            text: 'something'
        }
        callback(data);
    }

}

function MyApp(appParams) {
    this.model = new MyModel(appParams);
    this.view = new MyView(appParams);
    this.controller = new MyController(appParams, this.model, this.view);
    this.view.setController(this.controller);

    this.start = function () {
        this.controller.startAppWithSomeData();
    }

}
