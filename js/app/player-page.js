define(['jquery',
        './api/dota2api',
        './api/player',
        './utils'],
        function ($, Dota2Api, Player, Utils) {

          var utils = new Utils();

          var playerId = utils.getParameterByName("accountId");

          var apiKey = 'A73382E2B3B5BCA9E2D21797F6DB9871';

          var api = new Dota2Api(apiKey);

          document.title = playerId + "\'s Match History";

          var renderPlayerInfo = function(data, accountId, matchId){
            if (data){
              var response = data.response;
              for (var player in response.players){
                if (response.players[player].steamid !== Player.anonymous){
                  $('#player-' + accountId + "-" + matchId).append("<p><img src=\"" + response.players[player].avatar + "\"/><a href=\"/players/" + accountId + "\">"+ response.players[player].personaname +"</a></p>");
                }
              }
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
                  $('#match-' + result.matches[match].match_id).append("<h5> Players </h5>");
                  for (var player in result.matches[match].players){
                    $('#match-' + result.matches[match].match_id).append("<div id=\"player-" + result.matches[match].players[player].account_id + "-" + result.matches[match].match_id + "\">");
                    var playerInfo = new Player(apiKey, result.matches[match].players[player].account_id,result.matches[match].match_id);
                    playerInfo.getPlayerSummaries(renderPlayerInfo);
                    $('#player-' + result.matches[match].players[player].account_id + '-' + result.matches[match].match_id).append("<p>Hero: " + result.matches[match].players[player].hero_id + "</p>");
                  }
                }
              }
            } else {
              $('#player-matches').append("<h2> Error Loading Data From DOTA 2 Api </h2>");
            }
          }

          api.getMatchHistory(displayData, null, null, null, null, null, null, playerId);
});
