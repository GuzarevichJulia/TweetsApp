var number = 0;
var newTweetsArray = [];
var readTweetsKey = "readTweets";
var readTweetsInStorage = [];
var readTweets = getTweetsFromStorage();
if (readTweets != null) {
    readTweetsInStorage = readTweets;
}
var isDisplayed = false;

var cb = new Codebird;
cb.setConsumerKey("QZIkKMeTgJpuZLSsimOexemM8", "3SUFIytalLPqkwu9yDlmq39eWaVOWC4lNFeguzL4ShUu6WtleB");
cb.setToken("847033435046731778-WOazCo1yxIF7jHbanPgWdEEbSc6y00y", "LBOIsKmTMDdbEbFAPOB65Gpyh5vedeCbpNoMtEv4VTBku");


function getReadTweetsCount() {
    var readCounterElement = document.getElementsByClassName("read-counter")[0];
    readCounterElement.textContent = readTweetsInStorage.length > 0 ? readTweetsInStorage.length : 0;
}

function getTweetsFromStorage() {
    if (localStorage.getItem(readTweetsKey) != null) {
        return JSON.parse(localStorage[readTweetsKey]);
    }
    return null;
}

function increaseReadCounter() {
    var readCounterElement = document.getElementsByClassName("read-counter")[0];
    var value = readCounterElement.textContent;
    readCounterElement.textContent = ++value;
}

function deleteReadTweet(event) {
    var tweetElement = document.getElementById(event.currentTarget.name);
    var parentElement= tweetElement.parentNode;
    parentElement.removeChild(tweetElement);
}

function putInClientStorage(event) {
    var currentTarget = event.currentTarget;
    var readTweetText = currentTarget.parentNode.previousSibling.firstChild.textContent;
    readTweetsInStorage.push(readTweetText);
    newTweetsArray.splice(newTweetsArray.indexOf(readTweetText), 1);
    localStorage.setItem(readTweetsKey, JSON.stringify(readTweetsInStorage));
}

function createTweetElem(content, isRead) {

    var tweetsListDiv = document.querySelector("div.tweets-list");

    var tweetElement = document.createElement("div");
    tweetElement.className = "tweet";
    tweetElement.setAttribute("id", number);

    var rowElement = document.createElement("div");
    rowElement.className = "row";

    var outerColElement = document.createElement("div");
    outerColElement.className = "col-md-4";

    rowElement.appendChild(outerColElement);

    var innerColElement = document.createElement("div");
    innerColElement.className = "col-xs-12 col-md-4 text-center";

    var innerRowElement = document.createElement("div");
    innerRowElement.className = "row  table-bordered cell";

    var firstColElement = document.createElement("div");
    firstColElement.className = "col-xs-10 col-md-10";

    var pElement = document.createElement("p");
    pElement.className = "text-left";
    pElement.textContent = content;

    firstColElement.appendChild(pElement);

    var secondColElement = document.createElement("div");
    secondColElement.className = "col-xs-2 col-md-2";

    if (!isRead) {
        var buttonElement = document.createElement("input");
        buttonElement.type = "button";
        buttonElement.value = "Read";
        buttonElement.name = number++;
        buttonElement.addEventListener("click", increaseReadCounter);
        buttonElement.addEventListener("click", deleteReadTweet);
        buttonElement.addEventListener("click", putInClientStorage);

        secondColElement.appendChild(buttonElement);
    }

    innerRowElement.appendChild(firstColElement);
    innerRowElement.appendChild(secondColElement);

    innerColElement.appendChild(innerRowElement);

    var anotherOuterColElement = document.createElement("div");
    anotherOuterColElement.className = "col-md-4";

    rowElement.appendChild(outerColElement);
    rowElement.appendChild(innerColElement);
    rowElement.appendChild(anotherOuterColElement);

    tweetElement.appendChild(rowElement);
    tweetsListDiv.appendChild(tweetElement);
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
            else {
                return false;
            }
        }
        else {
            if (newTweetsArray.indexOf(content) == -1) {
                return true;
            }
        }
    }
    else {
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
            for (var i = 0; i < statuses.length; i++) {
                var status = statuses[i];
                var screen_name = status.user.screen_name;
                var content = status.text;
                if (isNewTweet(content)) {
                    newTweetsArray.push(content);
                    isDisplayed = false;
                }
                console.log(screen_name + ": " + content);
            }
            displayTweets(newTweetsArray);
        }, true);
}

function getReadTweets() {
    for (var i = 0; i < readTweetsInStorage.length; i++) {
        console.log(readTweetsInStorage[i]);
        createTweetElem(readTweetsInStorage[i], true);
    }
}


