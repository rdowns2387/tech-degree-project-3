// run the script once document is ready
$( document ).ready(function() {


  //----------ON PAGE LOAD------------


  // set focus to the name input field on load
  $('#name').focus();

  //hide Other Job Role field on load
  $('#other-title').hide();


  //Exceeds Expectations: hide the color field in t-shirt info on load
  $('#colors-js-puns').hide();

  //hide PayPal and Bitcoin text on load and set the default payment method to credit card
  function $payWithCreditCard(){
    $('#credit-card').show().nextAll().hide();
  }
  $('option[value="credit card"]').attr('selected', true);
  $payWithCreditCard();

  //target the Register button and add the class 'disabled' on load
  let $button = $('button[type="submit"]');
  $button.addClass('disabled');
  $button.attr('disabled',true);

  //Set up Validators that must be checked before the form is submittable

  let nameValidated = false;
  let emailValidated = false;
  let activityValidated = false;
  let ccValidated = false;
  let zipcodeValidated = false;
  let cvvValidated = false;


  //----------BASIC INFO------------


  // if the user title selection is 'other' show the Other Job Role text input field; if it changes to anything else, hide the text input
  $('select[name="user_title"]').change(function(){
      let userTitle = $(this).val();

      if (userTitle === 'other'){
        $('#other-title').show();
      } else {
        $('#other-title').hide();
      }
  });


  //----------T-SHIRT INFO------------


  // store value of user_design select element; only show options based the value of userDesign

  $('select[name="user_design"]').change(function(){
    let userDesign = $(this).val();
    console.log(userDesign);
    if (userDesign === 'heart js'){
      $('#colors-js-puns').show();
      $('option[value="cornflowerblue"]').hide();
      $('option[value="darkslategrey"]').hide();
      $('option[value="gold"]').hide();
      $('option[value="tomato"]').attr('selected',true);
      $('option[value="tomato"]').show();
      $('option[value="steelblue"]').show();
      $('option[value="dimgrey"]').show();
    } else if (userDesign ==='js puns'){
      $('#colors-js-puns').show();
      $('option[value="cornflowerblue"]').attr('selected',true);
      $('option[value="cornflowerblue"]').show();
      $('option[value="darkslategrey"]').show();
      $('option[value="gold"]').show();
      $('option[value="tomato"]').hide();
      $('option[value="steelblue"]').hide();
      $('option[value="dimgrey"]').hide();
    } else {
      $('#colors-js-puns').hide();
    }
  });


  //----------ACTIVITIES INFO------------


  // https://stackoverflow.com/questions/11159221/check-if-checkbox-is-not-checked-on-click-jquery

  // Target all activity checkboxes (used later)
  let allActivities = $('fieldset.activities').children().children('[type=checkbox]');

  // Target the Main Conference activity
  let mainConference = $('input[name=all')

  // select all even-numbered activites EXCEPT Main Conference
  let evenActivities = $('fieldset.activities').children().children('[type=checkbox]:even').not('[name=all]');

  // select all odd-numbered activites
  let oddActivities = $('fieldset.activities').children().children('[type=checkbox]:odd');

  //-----Conference Cost information-----

      // Start the running total at $0
      let runningTotal = 0;

      // Create the div to show the running total
      function totalCost(){
        $('fieldset.activities').append('<div id="totalCost"></div>');
      }
      totalCost();

      // Create the function to update the running total
      function updateCost(){
        $('#totalCost').html('<p>Total: $<span>'+runningTotal+'</span></p>');
      }

      //add a listener on the Main Conference activity to add $200 to the running total and to update the total cost

      mainConference.change(function(){
        if ($(this).is(':checked')){
          runningTotal = runningTotal +200;
        } else if ($(this).not(':checked')){
          runningTotal = runningTotal -200;
        }
        console.log(runningTotal);
        updateCost();
      });

      //1PM to 4PM Activities - disable all options EXCEPT the clicked checkbox to prevent the user from booking two activities in the same time slot, add or subtract the cost of the activity to the running total, and update the total cost

      evenActivities.change(function(){
        if (evenActivities.is(':checked')){
          runningTotal = runningTotal + 100;
          updateCost();
          evenActivities.not(this).each(function(){
            $(this).attr('disabled',true);
          });
        } else if (evenActivities.not(':checked')){
          runningTotal = runningTotal - 100;
          updateCost();
          evenActivities.attr('disabled',false);
        };
      });

      //9AM to 12PM Activities - disable all options EXCEPT the clicked checkbox to prevent the user from booking two activities in the same time slot, add or subtract the cost of the activity to the running total, and update the total cost

      oddActivities.change(function(){
        if (oddActivities.is(':checked')){
          runningTotal = runningTotal + 100;
          updateCost();
          console.log('is 9am to 12pm working?');
          oddActivities.not(this).each(function(){
            $(this).attr('disabled',true);
          });
        } else if (oddActivities.not(':checked')){
          runningTotal = runningTotal - 100;
          updateCost();
          oddActivities.attr('disabled',false);
        };
        console.log(runningTotal);
      });


  //----------ACTIVITIES INFO------------

  //Setting up some variables
  let $paymentOptions = $('#payment').children();
  const $creditCardPayment = $('option[value="credit card"]');
  const $payPalPayment = $('option[value="paypal"]');
  const $bitCoinPayment = $('option[value="bitcoin"]');

  //set up a listener on the Payment options dropdown to show or hide the appropriate information for the selected payment method

  $('select[name="user_payment"]').change(function(){
    let userPayment = $(this).val();
    console.log(userPayment);
    if (userPayment === 'paypal'){
      $payPalPayment.attr('selected',true);
      $payPalPayment.siblings().attr('selected', false);
      $('#credit-card').hide().next().show().next().hide();
      ccValidated = true;
      zipcodeValidated = true;
      cvvValidated = true;
    } else if (userPayment === 'bitcoin'){
      $payPalPayment.attr('selected',true);
      $payPalPayment.siblings().attr('selected', false);
      $('#credit-card').hide().next().hide().next().show();
      ccValidated = true;
      zipcodeValidated = true;
      cvvValidated = true;
    } else if (userPayment === 'credit card'){
      $payPalPayment.attr('selected',true);
      $payPalPayment.siblings().attr('selected', false);
      ccValidated = false;
      zipcodeValidated = false;
      cvvValidated = false;
      $button.addClass('disabled');
      $button.attr('disabled',true);
      $payWithCreditCard();
    }
  });


  //----------FORM VALIDATION------------



    // Validating the Name

      //Target the name input field
      let nameValidator = $('input[name="user_name"]');

      //When the name input field loses focus, check to see that its value is not empty; if it is, let the user know
      nameValidator.blur(function(){
        if (nameValidator.val() === ''){
          nameValidator.addClass('error');
          nameValidator.attr('placeholder','Please enter a valid name');
          nameValidated = false
          console.log('Name is false');
        } else {
          nameValidated = true;
          nameValidator.removeClass('error');
          console.log('Name is true');
        }
      });

    // Validating the Email

      //Target the email input field
      let emailValidator = $('input[name="user_email"]');

      //When the email input field loses focus, check to see that its value matches the regex parameters; if it doesn't, let the user know

      // got RegEx syntax help from here: https://stackoverflow.com/questions/21727456/jquery-value-match-regex

      emailValidator.blur(function(){

        let emailValue = this.value;
        let emailRegEx = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');

        if (emailRegEx.test(emailValue)){
           console.log('the email is good');
           emailValidator.removeClass('error');
           emailValidated = true;
           console.log('Email is true');
           $('.email-typo').hide();
       } else {
           emailValidator.addClass('error');
           $('label[for="mail"]').append('<p class="email-typo error-message">Looks like there was a typo in your email address!</div>');
          if(emailValue === ''){
              emailValidator.attr('placeholder','Please enter a valid email');
          }

          emailValidated = false;
          console.log('Email is false');
         };
      });

    // Validating Activities

      //listen for change to any checked activity and set activityValidated to true or false and also checks running total's amount in order to stop validating from toggling from true to false

      allActivities.change(function(){
        if ($(this).is(':checked') && runningTotal > 0){
          activityValidated = true;
          console.log('Activity is true');
        } else if ($(this).not(':checked') && runningTotal == 0){
          activityValidated = false;
          $('#totalCost').append('<div class="activity-error error-message"><p>Please select at least 1 conference activity</p></div>');
          console.log('Activity is false');
        }
      });



    // Validating Credit Card Information

      //Target the credit card number, zipcode, and cvv input fields
      let creditCardNumber = $('input[name="user_cc-num"]');
      let creditCardZipCode = $('input[name="user_zip"]');
      let creditCardCvv = $('input[name="user_cvv"]');


      //check credit card number
      creditCardNumber.blur(function(){
        let cardNumber = this.value;
        let cardNumberRegEx = new RegExp('^([0-9]{13})|([0-9]{14})|([0-9]{15})|([0-9]{16})$');

        if (cardNumberRegEx.test(cardNumber)){
           ccValidated = true;
           creditCardNumber.removeClass('error');
           console.log('the creditcard is true');
         } else {
           ccValidated = false;
           console.log('the creditcard is false');
           creditCardNumber.addClass('error');
         };
      });

      //check zipcode
      creditCardZipCode.blur(function(){
        let zipCode = this.value;
        let zipCodeRegEx = new RegExp('^[0-9]{5}$');

        if (zipCodeRegEx.test(zipCode)){
           creditCardZipCode.removeClass('error');
           zipcodeValidated = true;
           console.log('the zipcode is true');

         } else {
           creditCardZipCode.addClass('error');
           zipcodeValidated = false;
           console.log('the zipcode is false');

         };
      });

      //check cvv
      creditCardCvv.blur(function(){
        let cvv = this.value;
        let cvvRegEx = new RegExp('^[0-9]{3}$');

        if (cvvRegEx.test(cvv)){
           creditCardCvv.removeClass('error');
           cvvValidated = true;
           console.log('the cvv is true');
         } else {
           creditCardCvv.addClass('error');
           cvvValidated = false;
           console.log('the cvv is false');

         };
      });

      // $cvvTypo = $('label[for="cvv"]');

    // check all validators to enable the submit button

    $('fieldset').children().change(function(){
      if (nameValidated && emailValidated && activityValidated && ccValidated && zipcodeValidated && cvvValidated){
        console.log('valid!!!');
        $button.removeClass('disabled')
        $button.attr('disabled',false);
      } else {
        $button.addClass('disabled')
        $button.attr('disabled',true);
      }
    });

}); //end of document.ready
