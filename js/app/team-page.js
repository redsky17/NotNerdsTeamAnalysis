define(['jquery',
        './api/dota2api',
        './api/player',
        './utils'],
        function ($, Dota2Api, Player, Utils) {

          var utils = new Utils();

          var teamId = utils.getParameterByName("teamId");

          var apiKey = 'A73382E2B3B5BCA9E2D21797F6DB9871';

          var api = new Dota2Api(apiKey);

          var players = [];

          var teamMatches = [];

          var renderPlayerInfo = function(data, container, accountId){
            if (data){
              var response = data.response;
              for (var player in response.players){
                if (response.players[player].steamid !== Player.anonymous){
                  $(container).append("<p><img src=\"" + response.players[player].avatar + "\"/><a href=\"/players/" + accountId + "\">"+ response.players[player].personaname +"</a></p>");
                }
              }
            }
          }

          var displayData = function(data){
            if (data){
              var result = data.result;
              if (result.status === 1){
                for (var team in data.result.teams) {
                  $('#team-roster').append("<h2>" + result.teams[team].name + "</h2>");
                  document.title = result.teams[team].name + "\'s Match History";
                  $('#team-roster').append("<p> Games Played With Current Roster: " + result.teams[team].games_played_with_current_roster + "</p>");
                  var player = new Player(apiKey, result.teams[team].admin_account_id);
                  player.getPlayerSummaries(renderPlayerInfo, "#team-captain");
                  $('#team-roster').append("<div id=\"team-captain\"> Captain: </div>");
                  $('#team-roster').append("<h3> Current Roster </h3>");

                  for (var field in data.result.teams[team])
                  {
                     if (field.match("(player_)(.)(_account_id)"))
                     {
                          var containerName = "player-" + result.teams[team][field];
                          $('#team-roster').append("<div id=\"" + containerName + "\">");
                          player = new Player(apiKey, result.teams[team][field]);
                          player.getPlayerSummaries(renderPlayerInfo, "#" + containerName);
                          players.push(player);
                     }
                  }
                }
              }
            } else {
            $('#team-roster').append("<h2> Error Loading Data From DOTA 2 Api </h2>");
            }
          }

          var displayTeaMatchData = function(data) {
            var result = data.result;
            if (result.status === 1){
              for (var match in result.matches) {
                var teamPlayersCount = 0;
                for (var player in result.matches[match].players){
                  for (var teamPlayer in players){
                    if (result.matches[match].players[player].account_id === players[teamPlayer]) {
                        teamPlayersCount++;
                    }
                  }
                  if (teamPlayersCount >= this.minPlayers){
                    var matchContainerId = "match-" + result.matches[match].match_id;
                    $('#team-matches').append("<div id=\"" + matchContainerId +  "\">");
                    $('#' + matchContainerId).append()

                  }
                }
              }
            }
          }


          $('#min-teammates').change(function() {
            getTeamMatchHistory($(this).text());

          });

          var getTeamMatchHistory = function(minPlayers){
            this.minPlayers = minPlayers;
            for (var player in players) {
               var playerId = players[player].accountId;
               api.getMatchHistory(displayTeamMatchData, null, null, null, null, null, null, playerId);
            }
          }

          api.getTeamInfoByTeamId(displayData, teamId, 1);
});
