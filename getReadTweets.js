var number = 1;
var key = 1;

//--------------------

function incReadCounter() {
    var readCounterElem = document.getElementById("readCounter");
    var value = readCounterElem.textContent;
    readCounterElem.textContent = ++value;
}

function deleteReadTweet(event){
    var tweetElem = document.getElementById(event.currentTarget.name);
    var parentElem = tweetElem.parentNode;
    parentElem.removeChild(tweetElem);
}

function putInClientStorage(event) {
    var currentTarget = event.currentTarget;
    localStorage.setItem(key++, currentTarget.parentNode.previousSibling.firstChild.textContent);
}

function createTweetElem(content) {

    var tweetsListDiv = document.querySelector("div.tweetsList");

    var tweetElem = document.createElement("div");
    tweetElem.className = "tweet";
    tweetElem.setAttribute("id", number);

    var rowElem = document.createElement("div");
    rowElem.className = "row";

    var outerColElem = document.createElement("div");
    outerColElem.className = "col-md-4";

    rowElem.appendChild(outerColElem);

    var innerColElem = document.createElement("div");
    innerColElem.className = "col-xs-12 col-md-4 text-center";

    var innerRowElem = document.createElement("div");
    innerRowElem.className = "row  table-bordered cell";

    var firstColElem = document.createElement("div");
    firstColElem.className = "col-xs-10 col-md-10";

    var pElem = document.createElement("p");
    pElem.className = "text-left";
    pElem.textContent = content;

    firstColElem.appendChild(pElem);

    var secondColElem = document.createElement("div");
    secondColElem.className = "col-xs-2 col-md-2";


    innerRowElem.appendChild(firstColElem);
    innerRowElem.appendChild(secondColElem);

    innerColElem.appendChild(innerRowElem);

    var anotherOuterColElem = document.createElement("div");
    anotherOuterColElem.className = "col-md-4";

    rowElem.appendChild(outerColElem);
    rowElem.appendChild(innerColElem);
    rowElem.appendChild(anotherOuterColElem);

    tweetElem.appendChild(rowElem);
    tweetsListDiv.appendChild(tweetElem);
}

for(var i = 0; i < localStorage.length; i++){
    createTweetElem(localStorage[i]);
}

