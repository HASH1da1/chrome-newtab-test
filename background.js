// create context menus

//link
chrome.contextMenus.create({
    "id":"link",
    "title":"Link",
    "contexts":["link"],
});

chrome.contextMenus.create({
    "id":"linkclick",
    "title":"Link-Click",
    "contexts":["link",],
    "parentId":"link"
});

//selection text
chrome.contextMenus.create({
    "id":"selection",
    "title":"Selection",
    "contexts":["selection"],
});

chrome.contextMenus.create({
    "id":"sel-text",
    "title":"Selection text",
    "contexts":["selection"],
    "parentId":"selection"
});

//create empty variables
var url = "";
var artifact = "";

// refang function
function refangArtifact(artifact){
    while(artifact.includes("[.]")){
        artifact = artifact.replace("[.]", ".");
    }
    if(artifact.includes("hxxp://")){
        artifact = artifact.replace("hxxp://", "http://");
    }
    if(artifact.includes("hxxps://")){
        artifact = artifact.replace("hxxps://","https://")
    }
    return artifact;
}

chrome.contextMenus.onClicked.addListener((info,tab) => {
    if(info.selectionText){
        artifact = String(info.selectionText).trim();
    }
    else if(info.linkUrl){
        var link = new URL(info.linkUrl);
        artifact = link.host;
    }
    else if(info.srcUrl){
        var src = new URL(info.srcUrl);
        artifact = src.host;
    }

    artifact = refangArtifact(artifact);

// switch loops
    switch(info.menuItemId){
        case "linkclick":
            url = "https://urlscan.io/api/v1/search/?q=domain:"+artifact;
            break;
        case "sel-text":
            url = "https://twitter.com/search?q="+artifact;
            break;
    }
    chrome.tabs.create({url: url});    
});