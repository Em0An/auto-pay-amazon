function runEXT() {
    var urls = document.getElementsByClassName('softmerge-inner');
    var buyNow = document.getElementById("buy-now-button"); 
    var links = [];

    for (let url of urls) {
        if (url.innerText.indexOf("amazon.com") !== -1) {
            links.push(url.innerText);
        }
    }

    if (links.length > 0) {
        var message = {
            target: links
        };
        chrome.runtime.sendMessage(message);
    } 

    function runBuyNow() {

        setTimeout(function () {
            if (buyNow && window.location.href.indexOf("amazon.com")  !== -1 && window.location.href.indexOf('exe') != -1) {
                buyNow.click();
                btnThen();
            } else {
                runBuyNow();
            }
        }, 200);
    }
    runBuyNow();

    function btnThen() {

        let popup = document.getElementById('turbo-checkout-frame');
        function waitPopup() {
            setTimeout(function () {

                
                if (popup) {
                    
                    function searchIframe() {
                        setTimeout(function () {
                            let iframe = document.getElementById('turbo-checkout-iframe');
                            if (iframe) {
                                
                                function placeYourOrder() {

                                    setTimeout (function () {
                                        let element = iframe.contentWindow.document.getElementById('turbo-checkout-pyo-button');
                                        if (element) {
                                            element.click();
                                        } else {
                                            placeYourOrder();
                                        }
                                    }, 200);
                                } 
                                placeYourOrder();
                                
                                
                            } else {
                                searchIframe();
                            }
                        }, 200);
                    }
                    searchIframe();

                    

                    
                    
                } else {
                    waitPopup();
                }

            }, 200);
        }
        waitPopup();


    }

/*
    console.log("------------------------------");
    console.log('links', links);
    console.log("------------------------------");
    console.log('location', window.location.href);
    console.log("------------------------------");
    console.log('referrer', document.referrer);
    console.log("------------------------------");
    console.log('chromeURL', chrome.extension.getURL(''));
    console.log("------------------------------");
*/
}
runEXT();

