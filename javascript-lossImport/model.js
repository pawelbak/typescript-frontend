function MyModel(appParams) {
    this.apiUrl = appParams.apiUrl;

    this.fetchLossImportData = function (userId, callback) {
        var params = {
            userId: userId
        };
        httpGetWithParams(this.apiUrl + '/lossImport/lossImportData', params, callback);
    }

}