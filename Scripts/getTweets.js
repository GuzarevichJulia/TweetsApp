var tweetsLoader = (function () {

    var newTweetsArray = [];
    var newTweetsId = [];
    var readTweetsKey = "readTweets";
    var readTweetsIdKey = "readTweetsId";
    var storage = localStorage;
    var readTweetsInStorage = [];
    var readTweetsIdInStorage = [];
    var readTweetsId = getDataFromStorage(readTweetsIdKey);
    if(readTweetsId != null){
        readTweetsIdInStorage = readTweetsId;
    }

    var readTweets = getDataFromStorage(readTweetsKey);
    if (readTweets != null) {
        readTweetsInStorage = readTweets;
    }
    var isDisplayed = false;

    var cb = new Codebird;
    cb.setConsumerKey("QZIkKMeTgJpuZLSsimOexemM8", "3SUFIytalLPqkwu9yDlmq39eWaVOWC4lNFeguzL4ShUu6WtleB");
    cb.setToken("847033435046731778-WOazCo1yxIF7jHbanPgWdEEbSc6y00y", "LBOIsKmTMDdbEbFAPOB65Gpyh5vedeCbpNoMtEv4VTBku");

    return {
        getReadTweetsCount: function () {
            var readCounterElement = document.getElementsByClassName("read-counter")[0];
            readCounterElement.textContent = readTweetsInStorage.length > 0 ? readTweetsInStorage.length : 0;
        },

        getNewTweets: function () {
            cb.__call(
                "search_tweets",
                "q=GurevichJuli",
                function (response) {
                    var statuses = response.statuses;
                    for (var i = 0; i < statuses.length; i++) {
                        var status = statuses[i];
                        var screen_name = status.user.screen_name;
                        var content = status.text;
                        if (isNewTweet(String(status.id))) {
                            newTweetsArray.push(content);
                            newTweetsId.push(String(status.id));
                            isDisplayed = false;
                        }
                        console.log(screen_name + ": " + content);
                    }
                    displayTweets(newTweetsArray, newTweetsId);
                }, true);
        },

        getReadTweets: function () {
            for (var i = 0; i < readTweetsInStorage.length; i++) {
                console.log(readTweetsInStorage[i]);
                createTweetElem(readTweetsIdInStorage[i], readTweetsInStorage[i], true);
            }
        }
    };

    function getDataFromStorage(key) {
        if (storage.getItem(key) != null) {
            return JSON.parse(storage[key]);
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
        var parentElement = tweetElement.parentNode;
        parentElement.removeChild(tweetElement);
    }

    function putInClientStorage(event) {
        var currentTarget = event.currentTarget;
        var readTweetText = currentTarget.parentNode.previousSibling.firstChild.textContent;
        readTweetsInStorage.push(readTweetText);
        readTweetsIdInStorage.push(String(currentTarget.name));
        newTweetsArray.splice(newTweetsArray.indexOf(readTweetText), 1);
        newTweetsId.splice(newTweetsId.indexOf(String(currentTarget.name)), 1);
        storage.setItem(readTweetsKey, JSON.stringify(readTweetsInStorage));
        storage.setItem(readTweetsIdKey, JSON.stringify(readTweetsIdInStorage));
    }

    function createTweetElem(number, content, isRead) {

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
            buttonElement.name = number;
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

    function displayTweets(newTweetsArray, newTweetsId) {
        if (!isDisplayed) {
            for (var i = 0; i < newTweetsArray.length; i++) {
                createTweetElem(newTweetsId[i], newTweetsArray[i], false);
            }
            isDisplayed = true;
        }
    }

    function isNewTweet(content) {
        if (newTweetsId.length > 0) {
            if (readTweetsIdInStorage.length > 0) {
                if ((readTweetsIdInStorage.indexOf(content) == -1) && (newTweetsId.indexOf(content) == -1)) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                if (newTweetsId.indexOf(content) == -1) {
                    return true;
                }
            }
        }
        else {
            if (readTweetsIdInStorage.length > 0) {
                if (readTweetsIdInStorage.indexOf(content) == -1) {
                    return true;
                }
                return false;
            }
            return true;
        }
    }
})();


