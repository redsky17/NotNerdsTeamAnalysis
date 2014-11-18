define(['jquery'], function($) {

  var baseApiUrl = "https://api.steampowered.com/IDOTA2Match_570/";

  // See: http://stackoverflow.com/questions/25478009/cannot-make-calls-to-steam-api-site-from-my-own-site-security-issue
  var proxyApiUrl = '/steamapi/IDOTA2Match_570/';

  function Dota2Api(apiKey){
    this.apiKey = apiKey;
  }

  Dota2Api.prototype = {
    getMatchHistory: function(callback, heroId, gameMode, skill, dateMin, dateMax, minPlayers, accountId, leagueId, startAtMatchId, matchesRequested, tournamentGamesOnly)
    {
      matchesRequested = matchesRequested ? matchesRequested : 25;
      var that = this;
      $.ajax({
        url: proxyApiUrl + "GetMatchHistory/V001/?Key=" + that.apiKey + "&hero_id=" + heroId + "&game_mode=" + gameMode + "&skill=" + skill + "&date_min=" + dateMin + "&date_max=" + dateMax + "&min_players=" + minPlayers + "&account_id=" + accountId + "&league_id=" + leagueId + "&start_at_match_id=" + startAtMatchId + "&matches_requested=" + matchesRequested + "&tournament_games_only=" + tournamentGamesOnly
      }).then(function(data) {
        callback(data);
      });
    },

    getTeamInfoByTeamId: function(callback, startAtTeamId, teamsRequested){
      var that = this;
      $.ajax({
        url: proxyApiUrl + "GetTeamInfoByTeamID/V001/?Key=" + that.apiKey + "&start_at_team_id=" + startAtTeamId + "&teams_requested=" + teamsRequested
      }).then(function(data) {
        callback(data);
      });
    }
  };

  return Dota2Api;
});
