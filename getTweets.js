var number = 0;
var newTweetsArray = [];
var readTweetsKey = "readTweets";
var readTweetsInStorage = [];
var readTweets = getTweetsFromStorage();
if (readTweets != null){
    readTweetsInStorage = readTweets;
}
var isDisplayed = false;

var cb = new Codebird;
cb.setConsumerKey("QZIkKMeTgJpuZLSsimOexemM8", "3SUFIytalLPqkwu9yDlmq39eWaVOWC4lNFeguzL4ShUu6WtleB");
cb.setToken("847033435046731778-WOazCo1yxIF7jHbanPgWdEEbSc6y00y", "LBOIsKmTMDdbEbFAPOB65Gpyh5vedeCbpNoMtEv4VTBku");


function getReadTweetsCount () {
    var readCounterElem = document.getElementById("readCounter");
    readCounterElem.textContent = readTweetsInStorage.length > 0 ? readTweetsInStorage.length : 0;
}

function getTweetsFromStorage () {
    if (localStorage.getItem(readTweetsKey)!= null){
        return JSON.parse(localStorage[readTweetsKey]);
    }
    return null;
}

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
    var readTweetText = currentTarget.parentNode.previousSibling.firstChild.textContent;
    readTweetsInStorage.push(readTweetText);
    newTweetsArray.splice(newTweetsArray.indexOf(readTweetText),1);
    localStorage.setItem(readTweetsKey, JSON.stringify(readTweetsInStorage));
}

function createTweetElem(content, isRead){

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

    if(!isRead) {
        var buttonElem = document.createElement("input");
        buttonElem.type = "button";
        buttonElem.value = "Read";
        buttonElem.name = number++;
        buttonElem.addEventListener("click", incReadCounter);
        buttonElem.addEventListener("click", deleteReadTweet);
        buttonElem.addEventListener("click", putInClientStorage);

        secondColElem.appendChild(buttonElem);
    }

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

function displayTweets(newTweetsArray) {
    if (!isDisplayed) {
        for (var i = 0; i < newTweetsArray.length; i++) {
            createTweetElem(newTweetsArray[i], false);
        }
        isDisplayed = true;
    }
}

function isNewTweet(content) {
    if (newTweetsArray.length > 0) {
        if (readTweetsInStorage.length > 0) {
            if ((readTweetsInStorage.indexOf(content) == -1) && (newTweetsArray.indexOf(content) == -1)) {
                return true;
            }
            else{
                return false;
            }
        }
        else {
            if (newTweetsArray.indexOf(content) == -1){
                return true;
            }
        }
    }
    else{
        if (readTweetsInStorage.length > 0) {
            if (readTweetsInStorage.indexOf(content) == -1) {
                return true;
            }
            return false;
        }
        return true;
    }
}

function getNewTweets() {
     cb.__call(
        "search_tweets",
        "q=GurevichJuli",
        function (response) {
            var statuses = response.statuses;
            for (var i = 0; i < statuses.length; i++){
                var status = statuses[i];
                var screen_name = status.user.screen_name;
                var content = status.text;
                if (isNewTweet(content)){
                    newTweetsArray.push(content);
                    isDisplayed = false;
                }
                console.log(screen_name + ": " + content);
            }
            displayTweets(newTweetsArray);
        }, true);
}

function  getReadTweets() {
    for(var i = 0; i < readTweetsInStorage.length; i++){
        console.log(readTweetsInStorage[i]);
        createTweetElem(readTweetsInStorage[i], true);
    }
}




