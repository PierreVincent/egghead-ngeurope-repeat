angular.module("store", [])

    .config(function ($stateProvider) {

        $stateProvider.state('store', {
            url: '/store',
            templateUrl: 'store/store.html',
            controller: 'StoreCtrl as store',
            resolve: {
                games: function ($http, boardGameService) {
                    return boardGameService.getGames()
                        .then(function (res) {
                            return res.data;
                        })
                }
            }
        })


    })

    .controller("StoreCtrl", function (games, BASE_URL) {
        var store = this;
        store.selected = "name";
        store.BASE_URL = BASE_URL;

        store.select = function (selected) {
            //flip direction if already selected
            if (store.selected === selected) {
                store.selected = "-" + store.selected;
            }
            else {
                store.selected = selected;
            }
        };

        store.numberPlayers = "any";
        store.minRating = 0;
        store.includeExpansions = true;
        store.playtime = "any";
        store.games = games;
    })

    .filter("filterMinRating", function () {
        return function (items, rating) {
            return items.filter(function (item) {
                return item.averageRating > rating;
            });
        };
    })

    .filter("filterNumberPlayers", function () {
        return function (items, numberPlayers) {
            if (numberPlayers === "any") {
                return items;
            }
            return items.filter(function (item) {
                return item.minPlayers <= numberPlayers && item.maxPlayers >= numberPlayers;
            });
        };
    })

    .filter("filterExpansions", function () {
        return function (items, includeExpansions) {
            if (includeExpansions) {
                return items;
            }
            return items.filter(function (item) {
                return item.isExpansion;
            });
        };
    })

    .filter("filterPlaytime", function () {
        return function (items, playtime) {
            var time;
            switch (playtime) {
                case "any":
                    return items;
                case "short":
                    time = [0,15];
                    break;
                case "average":
                    time = [16,60];
                    break;
                case "long":
                    time = [61,180];
                    break;
                case "hardcore":
                    time = [181, 10000];
                    break;
            }
            return items.filter(function(item) {
                return item.playingTime >= time[0] && item.playingTime <= time[1];
            });
        }
    })

