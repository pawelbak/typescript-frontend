function httpGet(url, callback, errorCallback) {
    httpGetWithParams(url, {}, callback, errorCallback);
}

function httpGetWithParams(url, urlParams, callback, errorCallback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function () {
        if (xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        } else {
            if (typeof errorCallback === "undefined" || errorCallback === null) {
                alert('Error response from server on URL: ' + url);
            } else {
                errorCallback();
            }
        }
    }
    xmlHttp.open("GET", url + convertObjectToGETParamsString(urlParams), true); // true for asynchronous 
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(null);
}

function convertObjectToGETParamsString(params) {
    var paramsString = "?";
    for (var param in params) {
        paramsString += param + '=' + encodeURIComponent(params[param]);
    }
    return paramsString.length === 1 ? '' : paramsString;
}