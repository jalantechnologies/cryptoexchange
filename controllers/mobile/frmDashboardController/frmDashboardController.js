define({
  
  _coins: [],
  _selectedDepositToken: null,
  _selectedReceiveToken: null,
  
  /* Private methods to hide/show containers to display deposit and receive token */
  _showGetAllCoinsLoadingContainer: function () {
    this.view.ctnGetAllCoinsError.isVisible = false;
    this.view.ctnGetAllCoinsLoaded.isVisible = false;
    this.view.ctnGetAllCoinsLoading.isVisible = true;
  },
  
  _showGetAllCoinsErrorContainer: function () {
    this.view.ctnGetAllCoinsLoading.isVisible = false;
    this.view.ctnGetAllCoinsLoaded.isVisible = false;
    this.view.ctnGetAllCoinsError.isVisible = true;
  },
  
  _showGetAllCoinsLoadedContainer: function () {
    this.view.ctnGetAllCoinsLoading.isVisible = false;
    this.view.ctnGetAllCoinsError.isVisible = false;
    this.view.ctnGetAllCoinsLoaded.isVisible = true;
  },
  
  _setDepositToken: function (token) {
    this._selectedDepositToken = null;
    this.view.imgDepositToken.src = '';
    this.view.lblDepositTokenName.text = '';
    if (token) {
      this._selectedDepositToken = token;
      this.view.imgDepositToken.src = token.image;
      this.view.lblDepositTokenName.text = token.name;
    }
  },
  
  _setReceiveToken: function (token) {
    this.selectedReceiveToken = null;
    this.view.imgReceiveToken.src = '';
    this.view.lblReceiveTokenName.text = '';
    if (token) {
      this._selectedReceiveToken = token;
      this.view.imgReceiveToken.src = token.image;
      this.view.lblReceiveTokenName.text = token.name;
    }
  },
  
  /* Private methods to hide/show containers to display exchange information */
  _showGetExchangeInfoLoadingContainer: function () {
    this.view.ctnExchangeInfoError.isVisible = false;
    this.view.ctnExchangeInfoLoaded.isVisible = false;
    this.view.ctnExchangeInfoLoading.isVisible = true;
  },
  
  _showGetExchangeInfoErrorContainer: function () {
    this.view.ctnExchangeInfoLoaded.isVisible = false;
    this.view.ctnExchangeInfoLoading.isVisible = false;
    this.view.ctnExchangeInfoError.isVisible = true;
  },
  
  _showGetExchangeInfoLoadedContainer: function () {
    this.view.ctnExchangeInfoLoading.isVisible = false;
    this.view.ctnExchangeInfoError.isVisible = false;
    this.view.ctnExchangeInfoLoaded.isVisible = true;
  },
  
  _launchCoinPicker: function (selectedToken, done) {
    this.view.ctnCoinsPicker.isVisible = true;
    
    var masterData = [];
    for (var i = 0; i < this._coins.length; i += 1) {
      var coin = this._coins[i];
      masterData.push([coin.symbol, coin.name]);
    }
    
    this.view.lstBxAllCoins.masterData = masterData;
    if (selectedToken) {
      this.view.lstBxAllCoins.selectedKey = selectedToken.symbol;
    }
    
    var self = this;
    this.view.lstBxAllCoins.onSelection = function (eventobject) {
      
      var selectedKey = self.view.lstBxAllCoins.selectedKey;
      var token = null;
      for (var i = 0; i < self._coins.length; i += 1) {
        var coin = self._coins[i];
        if (coin.symbol === selectedKey) {
          token = coin;
          break;
        }
      }
      
      done(token);
      self.view.ctnCoinsPicker.isVisible = false;
    };
  },
  
  _setClickHandlers: function () {
    var self = this;
    this.view.imgDepositToken.onTouchEnd = function () {
      self._launchCoinPicker(self._selectedDepositToken, function (selectedToken) {
        self._setDepositToken(selectedToken);
        self.getExchangeInfo();
      });
    };
    
    this.view.imgReceiveToken.onTouchEnd = function () {
      self._launchCoinPicker(self._selectedReceiveToken, function (selectedToken) {
        self._setReceiveToken(selectedToken);
        self.getExchangeInfo();
      });
    };
  },
  
  /* Get exchange info for selected deposit/receive token */
  getExchangeInfo: function () {
    var depositToken = this._selectedDepositToken;
    var receiveToken = this._selectedReceiveToken;
    var self = this;
    if (depositToken && receiveToken) {
      self._showGetExchangeInfoLoadingContainer();
      var pair = depositToken.symbol.toLowerCase() + '_' + receiveToken.symbol.toLowerCase();
      CryptoExchangeServices.getExchangeInfo(pair, function (err, response) {
        if (response && response.exchangeInfo) {
          self.view.lblExchangeInfoLoaded.text = '1 ' + depositToken.symbol + ' = ' + response.exchangeInfo.rate + ' ' + receiveToken.symbol;
          self._showGetExchangeInfoLoadedContainer();
        } else {
          self._showGetExchangeInfoErrorContainer();
        }
      });
    } else {
      self._showGetExchangeInfoErrorContainer();
    }
  },
  
  /* Get all available coins */
  getAllCoins: function() {
    var self = this;
    self._showGetAllCoinsLoadingContainer();
    CryptoExchangeServices.getAllCoins(function (err, response) {
      if (response && response.coins) {
        self._coins = response.coins;
        
        self._setDepositToken(self._coins.length > 0 ? self._coins[0] : null);
        self._setReceiveToken(self._coins.length > 1 ? self._coins[1] : null);
        self._showGetAllCoinsLoadedContainer();
        
        // Get exchange info
        self.getExchangeInfo();
        
        self._setClickHandlers();
      } else {
        self._showGetAllCoinsErrorContainer();
      }
    });
  }
});