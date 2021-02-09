function MyController(appParams, model, view) {
    this.model = model;
    this.view = view;
    this.appParams = appParams;
    var instance = this;

    this.getTarget = function () {
        return this.target;
    }

    this.startAppWithSomeData = function () {
        this.model.fetchLossImportData(instance.appParams.userId, function callback(response) {
            instance.view.renderText(response);
        })
    };

    this.onButtonClick = function (param) {
        this.view.renderText(param);
    };
}