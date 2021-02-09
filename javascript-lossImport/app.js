function MyApp(appParams) {
    this.model = new MyModel(appParams);
    this.view = new MyView(appParams);
    this.controller = new MyController(appParams, this.model, this.view);
    this.view.setController(this.controller);

    this.start = function () {
        this.controller.startAppWithSomeData();
    }

}
