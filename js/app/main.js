define(['jquery',
        './api/dota2api',
        './api/player'],
        function ($, Dota2Api, Player) {

          var nerdsTeamId = 1695722;
          var apiKey = 'A73382E2B3B5BCA9E2D21797F6DB9871';

          var api = new Dota2Api(apiKey);

          var displayData = function(data){
            if (data){
              var result = data.result;
              if (result.status === 1){
                for (var team in data.result.teams) {
                  $('#nerds-team-data').append("<h2>" + result.teams[team].name + "</h2>");
                  $('#nerds-team-data').append("<h3> Players </h3>");
                  $('#nerds-team-data').append("<p><a href=\"/players/" + result.teams[team].player_0_account_id + "\">" + result.teams[team].player_0_account_id+ "</a></p>");
                  $('#nerds-team-data').append("<p>" + result.teams[team].player_1_account_id + "</p>");
                  $('#nerds-team-data').append("<p>" + result.teams[team].player_2_account_id + "</p>");
                  $('#nerds-team-data').append("<p>" + result.teams[team].player_3_account_id + "</p>");
                  $('#nerds-team-data').append("<p>" + result.teams[team].player_4_account_id + "</p>");
                  $('#nerds-team-data').append("<p>" + result.teams[team].player_5_account_id + "</p>");
                }
              }
            } else {
              $('#nerds-team-data').append("<h2> Error Loading Data From DOTA 2 Api </h2>");
            }
          }

          api.getTeamInfoByTeamId(displayData, nerdsTeamId, 1);
});
