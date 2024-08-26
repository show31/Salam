jQuery(document).ready(function($){
    // $('.accordion-title').click(function(){
    //     $(this).toggleClass('active')
    //     $(this).parents('.zakat-accordion').find('.zakat-accordion-field').slideToggle();
    // })

    $(".payable-field").keyup(function(){
        calculateAssets();
    });
    $(".debt-field").keyup(function(){
        calculateDebts();
    });

    $(".payable-field, .debt-field").each(function() {
        $(this).keyup(function(){
            if ( $("#totalDebts").text() == '' ) {
                netAssets = Number($("#totalAssets").text());
            }else{
                netAssets = Number($("#totalAssets").text() - $("#totalDebts").text());
            }
            $(".netAssets").text(netAssets.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}));
            $("#netAssets").text(netAssets);

            function showResults() {

                nisab = Number($('#nisab').text());
                if ( netAssets > nisab) {
                    payableZakat = $("#netAssets").text() * 0.025;
                    $(".payableZakat").text(payableZakat.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}));
                    $("#payableZakat").text(payableZakat);
                }else{
                    $(".payableZakat").text('0.00');
                    $("#payableZakat").text('0.00');
                }
            }
            setTimeout(showResults, 2000);
        })
    })

    function calculateAssets() { 
        var sum = 0;
        $(".payable-field").each(function() {
            if(!isNaN(this.value) && this.value.length!=0) {
                sum += parseFloat(this.value);
            } 
        });
        $(".totalAssets").text(sum.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}));
        $("#totalAssets").text(sum);
    }
    function calculateDebts() {
        var sum2 = 0;
        $(".debt-field").each(function() {
            if(!isNaN(this.value) && this.value.length!=0) {
                sum2 += parseFloat(this.value);
            } 
        });
        $(".totalDebts").text(sum2.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}));
        $("#totalDebts").text(sum2);
    }

    $('.currency-tabs a').click(function(e){
        e.preventDefault();
        newConversionRate = $(this).data('conversion');
        newCurrencySymbol = $(this).data('symbol');

        // do nothing if clicked on active tab
        if($(this).hasClass('current')) return;

        var totalAssets  = Number($('#totalAssets').text());
        var totalDebts   = Number($('#totalDebts').text());
        var netAssets    = Number($('#netAssets').text());
        var nisab        = Number($('#nisab').text());
        var payableZakat = Number($('#payableZakat').text());


        
        // check current rate & new conversion rate
        oldConversionRate = $('.currency-tabs a.current').data('conversion');
        /*console.log('oldConversionRate: '+oldConversionRate);*/
        /*console.log('newConversionRate: '+newConversionRate);*/

        // if current is not GBP First convert USD/EUR to GBP and then apply conversion rate
        if(oldConversionRate==1){ // GBP to others
            /*console.log('conversion from USD');*/
            totalAssets  = newConversionRate * totalAssets;
            totalDebts   = newConversionRate * totalDebts;
            netAssets    = newConversionRate * netAssets;
            nisab        = newConversionRate * nisab;
            payableZakat = newConversionRate * payableZakat;

        }else{
            // now 2 cases.
            if(newConversionRate==1){ // 1. Other to GBP
                /*console.log('Other to USD: ');*/
                totalAssets  =  totalAssets / oldConversionRate;
                totalDebts   =   totalDebts / oldConversionRate;
                netAssets    =    netAssets / oldConversionRate;
                nisab        =        nisab / oldConversionRate;
                payableZakat = payableZakat / oldConversionRate;

            }else{ // 2. Other to Other. First convert to GBP and then GBP to other
                /*console.log('Other to Other: ');*/
                totalAssets  = newConversionRate / oldConversionRate * totalAssets;
                totalDebts   = newConversionRate / oldConversionRate * totalDebts;
                netAssets    = newConversionRate / oldConversionRate * netAssets;
                nisab        = newConversionRate / oldConversionRate * nisab;
                payableZakat = newConversionRate / oldConversionRate * payableZakat;
            }
        }
        // update DOM
        $('.currency-symbol').text(newCurrencySymbol);
        $('.totalAssets').text(totalAssets.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}));
        $('#totalAssets').text(totalAssets);
        $('.totalDebts').text(totalDebts.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}));
        $('#totalDebts').text(totalDebts);
        $('.netAssets').text(netAssets.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}));
        $('#netAssets').text(netAssets);
        $('.nisab').text(nisab.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}));
        $('#nisab').text(nisab);
        $('.payableZakat').text(payableZakat.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}));
        $('#payableZakat').text(payableZakat);

        $('.currency-tab.active').removeClass('active').children().removeClass('current');
        $(this).addClass('current').parent().addClass('active');

    });
});
