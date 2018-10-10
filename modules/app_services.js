CryptoExchangeServices = {};

CryptoExchangeServices.getAllCoins = function (done) {
  var serviceName = "Shapeshift";
  var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
  var operationName =  "getcoins";
  var data = {};
  var headers = {};
  integrationObj.invokeOperation(operationName, headers, data, function (res) {
    done(null, res);
  }, function (res) {
    done(res);
  });
};

CryptoExchangeServices.getExchangeInfo = function (pair, done) {
  var serviceName = "Shapeshift";
  var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
  var operationName =  "marketinfo";
  var data = {
    pair: pair
  };
  var headers = {};
  integrationObj.invokeOperation(operationName, headers, data, function (res) {
    done(null, res);
  }, function (res) {
    done(res);
  });
};