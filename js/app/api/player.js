define(['jquery',
        '../utils'],
         function($, Utils) {

          var baseApiUrl = "http://api.steampowered.com/ISteamUser/";

          // See: http://stackoverflow.com/questions/25478009/cannot-make-calls-to-steam-api-site-from-my-own-site-security-issue
          var proxyApiUrl = '/steamapi/ISteamUser/';

          var utils = new Utils();

          function Player(apiKey,accountId){
            this.apiKey = apiKey;
            this.accountId = accountId;
          }

          Player.anonymous = utils.convertId(4294967295);

          Player.prototype = {
            getPlayerSummaries: function(callback, renderIntoContainer){
              var steamId = utils.convertId(this.accountId);
              var that = this;
              $.ajax({
                url: proxyApiUrl + "GetPlayerSummaries/V002/?Key=" + that.apiKey + "&steamids=" + "STEAM_0:1:" + steamId
              }).then(function(data) {
                  callback(data, renderIntoContainer, that.accountId);
              });
            }
          };

  return Player;
});
