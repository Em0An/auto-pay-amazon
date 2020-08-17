let params = {
    active: true,
    currentWindow: true
};
chrome.tabs.query(params, gotTabs);

function gotTabs(tabs) {

    var bgpage = chrome.extension.getBackgroundPage();
    var urls = bgpage.urls;

    console.log("urls from popup", urls);

    var btns = document.getElementById("btns");

    btns.innerHTML = '';

    if (urls.length == 1 && urls[0] == "no url") {
        document.getElementById('error').style.display = 'block';
        document.getElementById('types').style.display = 'none';
    } else if (urls.length > 1) {
      
        for (let i = 0; i < urls.length; i++) {
            btns.innerHTML += "<button><a href='"+ urls[i] +"?exe=automate' target='_blank'>Link "+ (i+1) +"</a></button>";
        }
        document.getElementById('error').style.display = 'none';
        document.getElementById('types').style.display = 'block';
    } 

    let msg = {
        status: "open popup",
    };
    chrome.tabs.sendMessage(tabs[0].id, msg);
}