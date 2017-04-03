getReadTweetsCount();
getNewTweets();
setInterval(getNewTweets, 6000);
var tweetsListButton = document.getElementsByName("tweetsListButton")[0];
tweetsListButton.addEventListener("click", function () {
    location.href = 'TweetsList.html';
});