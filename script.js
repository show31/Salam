$(document).ready(function() {

    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const currentTheme = localStorage.getItem("theme");

    function setTheme(theme) {
        $("body").removeClass("light-theme dark-theme").addClass(theme);
        localStorage.setItem("theme", theme);
    }

    function toggleTheme() {
        if (prefersDarkScheme.matches) {
            if ($("body").hasClass("light-theme")) {
                setTheme("dark-theme");
            } else {
                setTheme("light-theme");
            }
        } else {
            if ($("body").hasClass("dark-theme")) {
                setTheme("light-theme");
            } else {
                setTheme("dark-theme");
            }
        }
    }

    if (currentTheme === "dark") {
        setTheme("dark-theme");
        } else if (currentTheme === "light") {
        setTheme("light-theme");
    }

    if (prefersDarkScheme.matches) {
        setTheme("dark-theme");
    }

    $("#toggle-mode").on("click", function() {
        toggleTheme();
    });
    
    $('.addwives').click(function () {
        if ($(this).prev().val() < 4) {
            $(this).prev().val(+$(this).prev().val() + 1);
        }
    });
    $('.add').click(function () {
        $(this).prev().val(+$(this).prev().val() + 1);
    });
    $('.sub').click(function () {
        if ($(this).next().val() > 1) {
            if ($(this).next().val() > 1) $(this).next().val(+$(this).next().val() - 1);
        }
    });
    $("#reset").click(function() {
        $('.field-box').removeAttr('style');
    }).click(); //on page load uncheck any ticked checkboxes

    var check;
    $("#sendMail").on("change", function(){
        check = $(this).prop("checked");
        if(check) {
            $('.email-group').addClass('active');
        } else {
            $('.email-group').removeClass('active');
        }
    });
    
    // Function to update the WhatsApp link based on screen width
    function updateWhatsAppLink() {
        if ($(window).width() >= 767) {
            // Desktop or larger screens
            $('.whatssapp-icon a').attr('href', 'https://web.whatsapp.com/send?text=Online%20Islamic%20Inheritance%20Calculator%20-%20https://islamic-inheritance.mohammadharoon.com/en/');
        } else {
            // Mobile or smaller screens
            $('.whatssapp-icon a').attr('href', 'whatsapp://send?text=Check%20out%20this%20link:%20https://islamic-inheritance.mohammadharoon.com/en/');
        }
    }

    // Initial call to set the link based on the initial screen width
    updateWhatsAppLink();

    // Update the link when the window is resized
    $(window).resize(updateWhatsAppLink);
    
    
    var genderField = $('#genderField');
    var fatherAlive = $('#fatherAlive');
    var grandfatherAlive = $('#grandfatherAlive');
    var motherAlive = $('#motherAlive');
    var maternalGrandmother = $('#maternalGrandmother');
    var paternalGrandmother = $('#paternalGrandmother');
    var hasWife = $('#hasWife');
    var totalwives = $('#totalwives');
    var hasHusband = $('#hasHusband');
    var deceasedHaveSon = $('#deceasedHaveSon');
    var totalsons = $('#totalsons');
    var paternalGrandsons = $('#paternalGrandsons');
    var totalGrandsons = $('#totalGrandsons');
    var deceasedHaveDaughter = $('#deceasedHaveDaughter');
    var totaldaughters = $('#totaldaughters');
    var paternalGranddaughter = $('#paternalGranddaughter');
    var totalgranddaughters = $('#totalgranddaughters');
    var fullbrother = $('#fullbrother');
    var totalfullbrother = $('#totalfullbrother');
    var fullsister = $('#fullsister');
    var totalfullsister = $('#totalfullsister');
    var paternalHalfBrothers = $('#paternalHalfBrothers');
    var totalpaternalHalfBrothers = $('#totalpaternalHalfBrothers');
    var paternalHalfsisters = $('#paternalHalfsisters');
    var totalpaternalHalfsisters = $('#totalpaternalHalfsisters');
    var siblingsfromMother = $('#siblingsfromMother');
    var totalsiblingsfromMother = $('#totalsiblingsfromMother');
    var sonsfromFullBrother = $('#sonsfromFullBrother');
    var totalsonsfromFullBrother = $('#totalsonsfromFullBrother');
    var sonsfromHalfBrother = $('#sonsfromHalfBrother');
    var totalsonsfromHalfBrother = $('#totalsonsfromHalfBrother');
    var fatherFullBrother = $('#fatherFullBrother');
    var totalfatherFullBrother = $('#totalfatherFullBrother');
    var fatherHalfBrother = $('#fatherHalfBrother');
    var totalfatherHalfBrother = $('#totalfatherHalfBrother');
    var fatherFullBrotherHaveSon = $('#fatherFullBrotherHaveSon');
    var totalfatherFullBrotherHaveSon = $('#totalfatherFullBrotherHaveSon');
    var fatherHalfBrotherHaveSon = $('#fatherHalfBrotherHaveSon');
    var totalfatherHalfBrotherHaveSon = $('#totalfatherHalfBrotherHaveSon');



    // Select the gender of the deceased.
    genderField.find('input[type="radio"]').change(function() {
        if(genderField.find("input[name='gender']:checked").val() == 'male'){
            hasWife.show();
            hasHusband.hide();
            hasHusband.find('input[type="radio"]:checked').prop('checked',false);
            totalwives.find('input').val(1);
        }else{
            hasWife.hide();
            hasHusband.show();
            hasWife.find('input[type="radio"]:checked').prop('checked',false);
            // hasWife.find('input[type="radio"]').val(0);
            totalwives.find('input').val(0);
        }
        var testhasHusband = hasHusband.find("input:checked").val();
        var testhasWife = hasWife.find("input:checked").val();
        console.log('husband', testhasHusband);
        console.log('wife', testhasWife);
    });

    // Does the deceased have a Husband?
    hasHusband.find('input[type="radio"]').change(function() {
        fatherAlive.show();
    });

    // Does the deceased have a wife?
    hasWife.find('input[type="radio"]').change(function() {
        fatherAlive.show();
        if(Number(hasWife.find("input:checked").val()) == 1){
            totalwives.find('input').val(1);
            totalwives.show();
        }else{
            totalwives.find('input').val(0);
            totalwives.hide();
        }
    });


    // Is the deceased's father alive?
    fatherAlive.find('input[type="radio"]').change(function() {
        if(Number(fatherAlive.find("input[type='radio']:checked").val()) == 1){
            $('.hasFather').addClass('hide');
            motherAlive.show();
            // grandfatherAlive.hide();
            // $(this).parent('.field-box').nextAll('.field-box').hide();
            // $(this).parent('.field-box').nextAll('.field-box').find('input').prop('checked', false);
        }else{
            $('.hasFather').removeClass('hide');
            motherAlive.hide();
            grandfatherAlive.show();
        }
    });

    // Is the deceased's grandfather alive?
    grandfatherAlive.find('input[type="radio"]').change(function() {
        motherAlive.show();
        if(Number(grandfatherAlive.find("input[type='radio']:checked").val()) == 1){
            $('.hasGrandFather').addClass('hide');
            motherAlive.show();

        }else{
            $('.hasGrandFather').removeClass('hide');
        }
    });

    // Is the deceased's mother alive?
    motherAlive.find('input[type="radio"]').change(function() {
        if(Number(motherAlive.find("input[type='radio']:checked").val()) == 1){
            maternalGrandmother.hide();
            paternalGrandmother.hide();
            deceasedHaveDaughter.show();
        }else{
            maternalGrandmother.show();
        }
    });

    // Is the deceased's maternal grandmother alive?
    maternalGrandmother.find('input[type="radio"]').change(function() {
        if(Number(fatherAlive.find("input[type='radio']:checked").val()) == 1){
            deceasedHaveDaughter.show();    
        }else{
            paternalGrandmother.show();
        }
    });

    // Is the deceased's paternal grandmother alive?
    paternalGrandmother.find('input[type="radio"]').change(function() {
        deceasedHaveDaughter.show();
    });

    // Does the deceased have any daughter?
    deceasedHaveDaughter.find('input[type="radio"]').change(function() {
        deceasedHaveSon.show();
        if(Number(deceasedHaveDaughter.find("input:checked").val()) == 1){
            totaldaughters.find('input').val(1);
            totaldaughters.show();
        }else{
            totaldaughters.find('input').val(0);
            totaldaughters.hide();
        }
    });

    // Does the deceased have any son?
    deceasedHaveSon.find('input[type="radio"]').change(function() {
        if(Number(deceasedHaveSon.find("input:checked").val()) == 1){
            $('.hasSons').addClass('hide');
            totalsons.find('input').val(1);
            totalsons.show();
            // paternalGranddaughter.hide();
            // paternalGrandsons.hide();
            // deceasedHaveDaughter.show();
        }else{
            $('.hasSons').removeClass('hide');
            totalsons.find('input').val(0);
            totalsons.hide();
            paternalGranddaughter.show();
            // paternalGrandsons.show();
            // deceasedHaveDaughter.hide();
        }
    });

    // Does the deceased have paternal granddaughters?
    paternalGranddaughter.find('input[type="radio"]').change(function() {
        paternalGrandsons.show();
        if(Number(paternalGranddaughter.find("input:checked").val()) == 1){
            totalgranddaughters.find('input').val(1);
            totalgranddaughters.show();

            // fullbrother.show();
            //$('#siblingsfromMother').hide();
            // fullbrother.hide();
        }else{
            totalgranddaughters.find('input').val(0);
            totalgranddaughters.hide();
            // fullbrother.hide();
            //$('#siblingsfromMother').show();
            // fullbrother.show();
        }
    });

    // Does the deceased have paternal grandsons?
    paternalGrandsons.find('input[type="radio"]').change(function() {
        if(Number(paternalGrandsons.find("input:checked").val()) == 1){
            $('.hasPaternalGrandsons').addClass('hide');
            totalGrandsons.find('input').val(1);
            totalGrandsons.show();
            // siblingsfromMother.hide();
            // fullbrother.hide();
        }else{
            if(Number(fatherAlive.find("input[type='radio']:checked").val()) == 1){
                // fullsister.hide();
                siblingsfromMother.hide();
            }else{
                // fullsister.show();
                siblingsfromMother.show();
            }
            $('.hasPaternalGrandsons').removeClass('hide');
            totalGrandsons.find('input').val(0);
            totalGrandsons.hide();
        }
    });

    // Does the deceased have siblings from the mother?
    siblingsfromMother.find('input[type="radio"]').change(function() {
        // sonsfromFullBrother.show();
        fullsister.show();
        if(Number(siblingsfromMother.find("input:checked").val()) == 1){
            totalsiblingsfromMother.find('input').val(1);
            totalsiblingsfromMother.show();
        }else{
            totalsiblingsfromMother.find('input').val(0);
            totalsiblingsfromMother.hide();
        }
    });

    // Does the deceased have full sisters?
    fullsister.find('input[type="radio"]').change(function() {
        fullbrother.show();
        if(Number(fullsister.find("input:checked").val()) == 1){
            totalfullsister.find('input').val(1);
            totalfullsister.show();
        }else{
            totalfullsister.find('input').val(0);
            totalfullsister.hide();
        }
    });

    // Does the deceased have full brothers?
    fullbrother.find('input[type="radio"]').change(function() {
        // fullsister.find('input[type="radio"]:checked').prop('checked',false);
        if(Number(fullbrother.find("input:checked").val()) == 1){
            $('.hasBrothers').addClass('hide');
            totalfullbrother.find('input').val(1);
            totalfullbrother.show();
        }else{
            $('.hasBrothers').removeClass('hide');
            totalfullbrother.find('input').val(0);
            totalfullbrother.hide();
            paternalHalfsisters.show();

            if ( (Number(deceasedHaveDaughter.find("input:checked").val()) == 1 || Number(paternalGranddaughter.find("input:checked").val()) == 1) && Number(fullsister.find("input:checked").val()) == 1){
                paternalHalfsisters.hide();
            }else{
                paternalHalfsisters.show();
            }
        }
    });

    // Does the deceased have paternal half sisters?
    paternalHalfsisters.find('input[type="radio"]').change(function() {
        paternalHalfBrothers.show();
        if(Number(paternalHalfsisters.find("input:checked").val()) == 1){
            totalpaternalHalfsisters.find('input').val(1);
            totalpaternalHalfsisters.show();
        }else{
            totalpaternalHalfsisters.find('input').val(0);
            totalpaternalHalfsisters.hide();
        }
    });

    // Does the deceased have paternal half brothers?
    paternalHalfBrothers.find('input[type="radio"]').change(function() {
        if(Number(paternalHalfBrothers.find("input:checked").val()) == 1){
            $('.haspaternalHalfBrothers').addClass('hide');
            totalpaternalHalfBrothers.find('input').val(1);
            totalpaternalHalfBrothers.show();
        }else{
            $('.haspaternalHalfBrothers').removeClass('hide');
            totalpaternalHalfBrothers.find('input').val(0);
            totalpaternalHalfBrothers.hide();
            // siblingsfromMother.show();
            sonsfromFullBrother.show();
        }
    });

    // Does the deceased have sons from full brother?
    sonsfromFullBrother.find('input[type="radio"]').change(function() {
        if(Number(sonsfromFullBrother.find("input:checked").val()) == 1){
            totalsonsfromFullBrother.find('input').val(1);
            totalsonsfromFullBrother.show();
            sonsfromHalfBrother.hide();
        }else{
            totalsonsfromFullBrother.find('input').val(0);
            totalsonsfromFullBrother.hide();
            sonsfromHalfBrother.show();
        }
    });

    // Does the deceased have sons from half brother?
    sonsfromHalfBrother.find('input[type="radio"]').change(function() {
        if(Number(sonsfromHalfBrother.find("input:checked").val()) == 1){
            totalsonsfromHalfBrother.find('input').val(1);
            totalsonsfromHalfBrother.show();
            fatherFullBrother.hide();
        }else{
            totalsonsfromHalfBrother.find('input').val(0);
            totalsonsfromHalfBrother.hide();
            fatherFullBrother.show();
        }
    });

    // Does the deceased's father have full brothers?
    fatherFullBrother.find('input[type="radio"]').change(function() {
        if(Number(fatherFullBrother.find("input:checked").val()) == 1){
            totalfatherFullBrother.find('input').val(1);
            totalfatherFullBrother.show();
            fatherHalfBrother.hide();
        }else{
            totalfatherFullBrother.find('input').val(0);
            totalfatherFullBrother.hide();
            fatherHalfBrother.show();
        }
    });

    // Does the deceased's father have half brothers?
    fatherHalfBrother.find('input[type="radio"]').change(function() {
        if(Number(fatherHalfBrother.find("input:checked").val()) == 1){
            totalfatherHalfBrother.find('input').val(1);
            totalfatherHalfBrother.show();
            fatherFullBrotherHaveSon.hide();
        }else{
            totalfatherHalfBrother.find('input').val(0);
            totalfatherHalfBrother.hide();
            fatherFullBrotherHaveSon.show();
        }
    });

    // Does the deceased's father's full brother have sons?
    fatherFullBrotherHaveSon.find('input[type="radio"]').change(function() {
        if(Number(fatherFullBrotherHaveSon.find("input:checked").val()) == 1){
            totalfatherFullBrotherHaveSon.find('input').val(1);
            totalfatherFullBrotherHaveSon.show();
            fatherHalfBrotherHaveSon.hide();
        }else{
            totalfatherFullBrotherHaveSon.find('input').val(0);
            totalfatherFullBrotherHaveSon.hide();
            fatherHalfBrotherHaveSon.show();
        }
    });

    // Does the deceased's father's half brothers have sons?
    fatherHalfBrotherHaveSon.find('input[type="radio"]').change(function() {
        if(Number(fatherHalfBrotherHaveSon.find("input:checked").val()) == 1){
            //$('#fatherHalfBrotherHaveSon').hide();
            totalfatherHalfBrotherHaveSon.find('input').val(1);
            totalfatherHalfBrotherHaveSon.show();
        }else{
            //$('#fatherHalfBrotherHaveSon').show();
            totalfatherHalfBrotherHaveSon.find('input').val(0);
            totalfatherHalfBrotherHaveSon.hide();
        }
    });

    // Function to update the total when the page loads
    //updateTotal();

    // Function to update the total when any input field changes
    $('.amount-input').on('input', function () {
        updateTotal();
    });

    // Function to calculate and update the total
    function updateTotal() {
        var totalCash = 0;
        var totalExpense = 0;
        var totalAmount = 0;
        $('.total-cash input').each(function () {
            var totalCashInAmount = parseFloat($(this).val());
            if (!isNaN(totalCashInAmount)) {
                totalCash += totalCashInAmount;
                $('.amountSec').show();
                $('.totalAmount').text(totalCash);
            }
        });
        $('.expense-field input').each(function () {
            var totalExpenseInAmount = parseFloat($(this).val());
            if (!isNaN(totalExpenseInAmount)) {
                totalExpense += totalExpenseInAmount;
                $('.totalExpense').text(totalExpense);
                $('.minus-sign').show();
            }
        });

        totalAmount = totalCash - totalExpense;

        $('#totalamount').val(totalAmount);

        bequeathAmount = Math.round(totalAmount / 3);
        // bequeathAmount = bequeathAmount + 1;
        $('#bequeathAmount').attr('max', bequeathAmount);
        $('.bequeathVal').text(bequeathAmount);
    }

    //inputValue = 0;
    //maxValue = 0;
    //getTotalAmount = 0;
    //getTotalExpense = 0;

    $('#bequeathAmount').on('keyup', function() {
        totalExpense2 = 0;
        var inputValue = parseFloat($(this).val());
        // // Check if the input value is empty or not a number (NaN)
        if (isNaN(inputValue) || $(this).val() === "") {
          inputValue = 0;
        }
        $('.expense-input input').each(function () {
            var getTotalExpense = parseFloat($(this).val());
            if (!isNaN(getTotalExpense)) {
                totalExpense2 += getTotalExpense;
            }
        });
        var getTotalAmount = parseFloat($('.totalAmount').text());
        var finalAmount = getTotalAmount - totalExpense2;
        // console.log('totalExpense2', totalExpense2);
        // console.log('getTotalAmount', getTotalAmount);
        // console.log('finalAmount', finalAmount);
        // maxValue = parseFloat($(this).attr('max'));
        // getTotalExpense = parseFloat($('.totalExpense').text());
        // getTotalAmount = parseFloat($('#totalamount').val());
        // getTotalExpense += inputValue;
        bequeathAmount = Math.round(finalAmount / 3);
        // console.log('bequeathAmount', bequeathAmount);

        //bequeathAmount = getTotalAmount - inputValue;
        // console.log('inputValue', inputValue);
        // console.log('bequeathAmount', bequeathAmount);
        // console.log('getTotalAmount', getTotalAmount);
        $('#bequeathAmount').attr('max', bequeathAmount);
        $('.bequeathVal').text(bequeathAmount);

        if (inputValue > bequeathAmount) {
            $(this).parents('.field-group').addClass('error');
        } else {
            $(this).parents('.field-group').removeClass('error');
            //getTotalAmount = getTotalAmount - inputValue;
            //console.log('getTotalAmount', getTotalAmount);
            //$('#totalamount').val(getTotalAmount);
            //getTotalExpense = getTotalExpense + inputValue;
        }
    });

    /*$('#bequeathAmount').on('blur', function() {
        getTotalExpense = parseFloat($('.totalExpense').text());
        if (inputValue < maxValue) {
            getTotalAmount = getTotalAmount - inputValue;
            console.log('getTotalAmount', getTotalAmount);
            $('#totalamount').val(getTotalAmount);
            getTotalExpense = getTotalExpense + inputValue;
            $('.totalExpense').text(getTotalExpense);
        }
    });*/
    $('.show-fields a').click(function(){
        $('.hidden-fields').slideToggle();
        return false
    });

    $('.currency-tab a').click(function(){
        var currencyText= $(this).text();
        $(this).parents('.currency-dropdown').find('.currency-dropdown__title').text(currencyText);
        $('.currency-dropdown__list').slideUp();
    });
    
    $('.currency-dropdown__title').click(function(){
        $(this).addClass('dropdown-open').next('.currency-dropdown__list').slideToggle();
    });
    $('#husband').blur(function(){
        if(parseInt($(this).val()) > 0){
            $("#wives").val('')
        }
    });
    $('#wives').blur(function(){
        if(parseInt($(this).val()) > 0){
            $("#husband").val('')
        }
    });
});
