(function() {
    'use strict';
    window.addEventListener("DOMContentLoaded", init, false);
    
    function init() {
        let timerSubmitButton = document.getElementById("timerSubmitButton");
        timerSubmitButton.addEventListener("click", function(e){ e.preventDefault(); e.stopPropagation(); handleTimerSubmitButton(); }, false);

        function handleTimerSubmitButton() {
            let message = document.getElementById("message");
            let timerRadios = document.getElementsByName("Timer");

            let timerRadiosLen = timerRadios.length;

            // Disable form elements
            handlePropertyDisabledForFormElements(message,timerRadiosLen, timerRadios, timerSubmitButton, true);
           
            for(let y = 0; y < timerRadiosLen; y++) {
                // Get checked radio element
                if(timerRadios[y].checked === true) {
                    let seconds = timerRadios[y].getAttribute("data-seconds");
                    let delay = 2;

                    // Display Timer

                    // Set the date we're counting down to
                    let countDownDate = new Date().getTime() + (parseInt(seconds) + delay) * 1000;

                    // Update the count down every 1 second
                    let x = setInterval(function() {

                        // Get today's date and time
                        let now = new Date().getTime();

                        // Find the distance between now and the count down date
                        let distance = countDownDate - now;

                        // Time calculations for seconds
                        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                        // Display the result in the element with id="displayTimerMessage"
                        document.getElementById("displayTimerMessage").innerHTML = "Countdown: " + seconds + "s ";

                        // If the count down is finished, stop countdown, display message text and enable form Elements
                        if (distance < 0) {
                            clearInterval(x);
                            document.getElementById("displayTimerMessage").innerHTML = "Message: " + message.value;
                            handlePropertyDisabledForFormElements(message,timerRadiosLen, timerRadios, timerSubmitButton, false);
                        }
                    }, 1000);
                    
                    break;
                }
            }

            // Enable/Disable form elements
            function handlePropertyDisabledForFormElements(message, timerRadiosLen, timerRadios, timerSubmitButton, value) {
                message.disabled = value;

                for(let a = 0; a < timerRadiosLen; a++) {
                    timerRadios[a].disabled = value;
                }

                timerSubmitButton.disabled = value;
            }
        }
    }
})();