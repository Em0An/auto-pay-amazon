chrome.runtime.onMessage.addListener(receiver);

window.urls = ["no url"];

function receiver(request, sender, sendResponse) {
    urls = request.target;
}