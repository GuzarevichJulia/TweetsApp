var number = 0;
var key = 0;
localStorage.clear();

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

    var buttonElem = document.createElement("input");
    buttonElem.type = "button";
    buttonElem.value = "Read";
    buttonElem.name = number++;
    buttonElem.addEventListener("click", incReadCounter);
    buttonElem.addEventListener("click", deleteReadTweet);
    buttonElem.addEventListener("click", putInClientStorage);

    secondColElem.appendChild(buttonElem);

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

function displayTweets() {
    for (var i = 0; i < tweetsArray.length; i++) {
        createTweetElem(tweetsArray[i]);
    }
}

var cb = new Codebird;
cb.setConsumerKey("QZIkKMeTgJpuZLSsimOexemM8", "3SUFIytalLPqkwu9yDlmq39eWaVOWC4lNFeguzL4ShUu6WtleB");
cb.setToken("847033435046731778-WOazCo1yxIF7jHbanPgWdEEbSc6y00y", "LBOIsKmTMDdbEbFAPOB65Gpyh5vedeCbpNoMtEv4VTBku");

var tweetsArray = [];

cb.__call(
    "search_tweets",
    "q=GurevichJuli",
    function (response) {
        var statuses = response.statuses;
        for (var i = 0; i < statuses.length; i++){
            var status = statuses[i];
            var screen_name = status.user.screen_name;
            var text = status.text;
            tweetsArray.push(text);
            console.log(screen_name + ": " + text);
        }
        displayTweets();
    }, true);




