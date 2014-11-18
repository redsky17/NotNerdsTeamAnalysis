define(['jquery',
        '../utils'],
         function($, Utils) {

          var baseApiUrl = "http://api.steampowered.com/IEconDOTA2_570/";

          // See: http://stackoverflow.com/questions/25478009/cannot-make-calls-to-steam-api-site-from-my-own-site-security-issue
          var proxyApiUrl = '/steamapi/IEconDOTA2_570/';

          var utils = new Utils();

          Hero.prototype = {
            getHeroes: function(callback, renderIntoContainer){
              var that = this;
              $.ajax({
                url: proxyApiUrl + "GetHeroes/V001/?Key=" + that.apiKey
              }).then(function(data) {
                  callback(data);
              });
            },

            getImgUrl: function(thumb, heroName){
              heroName = heroName ? heroName : this.heroName;
              var ext = thumb ? "eg" : "lg"
              return "http://media.steampowered.com/apps/dota2/images/heroes/" + heroName + "_" + ext + ".png";

            },

            buildHeroData: function(data) {
              getHeroes()
              if (data){
                var result = data.result;

                for (var hero in result.heroes){
                  if (result.heroes[hero].id === this.heroId){
                    this.heroName = result.heroes[hero].name;
                    this.localizedHeroName = result.heroes[hero].localized_name;
                    this.imgUrl = this.getImgUrl(true, this.heroName);
                  }
                }
              }
            }
          };

          function Hero(apiKey,id){
            this.apiKey = apiKey;
            this.heroId = id;
            this.buildHeroData;
          }

  return Hero;
});
