define(['jquery',
        './api/dota2api',
        './api/player',
        './api/hero',
        './utils'],
        function ($, Dota2Api, Player, Hero, Utils) {

          var utils = new Utils();

          var playerId = utils.getParameterByName("accountId");

          var apiKey = 'A73382E2B3B5BCA9E2D21797F6DB9871';

          var api = new Dota2Api(apiKey);

          document.title = playerId + "\'s Match History";

          var renderPlayerInfo = function(data, containerName, accountId){
            if (data){
              var response = data.response;
              for (var player in response.players){
                if (response.players[player].steamid !== Player.anonymousSteamId){
                  $(containerName).append("<p><img src=\"" + response.players[player].avatar + "\"/><a href=\"/players/" + accountId + "\">"+ response.players[player].personaname +"</a></p>");
                } else {
                    $(containerName).append("<p><img src=\"" + response.players[player].avatar + "\"/>Anonymous User</p>");
                }
              }
            } else {
              // TODO: Need to get an anonymous avatar image.
                $(containerName).append("<p><img src=\"" + " " + "\"/>Anonymous User</p>");
            }
          }

          var displayData = function(data){
            if (data){
              var result = data.result;
              if (result.status === 1){
                $('#player-matches').append("<h2> Match History </h2>");
                for (var match in result.matches) {
                  $('#player-matches').append("<div id=\"match-" + result.matches[match].match_id + "\">");
                  $('#match-' + result.matches[match].match_id).append("<h4> Match ID: " + result.matches[match].match_id + "</h4>");
                  $('#match-' + result.matches[match].match_id).append("<p><a href=\"dota2://matchid=" + result.matches[match].match_id + "\">Watch Match Replay</a></p>");
                  $('#match-' + result.matches[match].match_id).append("<h5> Players </h5>");
                  // Radiant and Dire
                  $('#match-' + result.matches[match].match_id).append("<div id=\"match-" + result.matches[match].match_id + "-0\">");
                  $('#match-' + result.matches[match].match_id + "-0").append("<h3>Radiant</h3>");
                  $('#match-' + result.matches[match].match_id).append("<div id=\"match-" + result.matches[match].match_id + "-1\">");
                  $('#match-' + result.matches[match].match_id + "-1").append("<h3>Dire</h3>");
                  var matchAnonCount = 0;
                  for (var player in result.matches[match].players){
                    // player_slot is 8-bit number, left-most bit is team.
                    var team = result.matches[match].players[player].player_slot >> 7;
                    var containerName;
                    if (result.matches[match].players[player].account_id === Player.anonymousAccountId) {
                      containerName = "anonymous-player-" + matchAnonCount + "-" + result.matches[match].match_id + "-" + team;
                      matchAnonCount++;
                    } else {
                      containerName = "player-" + result.matches[match].players[player].account_id + "-" + result.matches[match].match_id + "-" + team;
                    }

                    $('#match-' + result.matches[match].match_id + "-" + team).append("<div id=\"" + containerName + "\">");

                    var playerInfo = new Player(apiKey, result.matches[match].players[player].account_id);
                    playerInfo.getPlayerSummaries(renderPlayerInfo, "#" + containerName);
                    var playerHero = new Hero(apiKey, result.matches[match].players[player].hero_id);
                    playerHero.getHeroes(playerHero.buildHeroData);
                    $(containerName).append("<div id=\"" + containerName +"-hero\">");
                    // TODO: Need to figure out a way to load hero images later since heroName isn't available yet...
                    playerHero.buildHeroData();
                    var heroImg = playerHero.getImgUrl(true);
                    $("#" + containerName + "-hero").append("<img src=\"" + heroImg + "\" />" )
                  }
                }
              }
            } else {
              $('#player-matches').append("<h2> Error Loading Data From DOTA 2 Api </h2>");
            }
          }

          api.getMatchHistory(displayData, null, null, null, null, null, null, playerId);
});
