define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnGetAllCoinsRefresh **/
    AS_Button_cea334741c6b4203a15eca2f5b474c31: function AS_Button_cea334741c6b4203a15eca2f5b474c31(eventobject) {
        var self = this;
        return self.getAllCoins.call(this);
    },
    /** onClick defined for btnExchangeinfoRetry **/
    AS_Button_d072c3172a784412ab8fe7773577e44d: function AS_Button_d072c3172a784412ab8fe7773577e44d(eventobject) {
        var self = this;
        return self.getExchangeInfo.call(this);
    },
    /** init defined for frmDashboard **/
    AS_Form_e6fbdc99d6e94ac99af0bf9427630e67: function AS_Form_e6fbdc99d6e94ac99af0bf9427630e67(eventobject) {
        var self = this;
        return self.getAllCoins.call(this);
    },
    /** preShow defined for frmDashboard **/
    AS_Form_acee1a067c174b8d95b17c8ea5b3c3b9: function AS_Form_acee1a067c174b8d95b17c8ea5b3c3b9(eventobject) {
        var self = this;
    },
    /** onClick defined for btnCoinsPickerClose **/
    AS_Button_c5d616758c084d86b529921257ba2439: function AS_Button_c5d616758c084d86b529921257ba2439(eventobject) {
        var self = this;
        self.view.ctnCoinsPicker.isVisible = false;
    }
});