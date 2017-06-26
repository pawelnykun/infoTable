$(function() {
    var url = 'https://pokeapi.co/api/v1/pokemon/';
    var pokemonId;
    var $table = $('.table-responsive');

    function getData() {
        getPokemonId();

        $.ajax({
            url: url + pokemonId,
            method: 'GET',
            success: showData
        });
    }

    function getPokemonId() {
        var paramsString = document.location.href.split('?');
        var paramsArray = paramsString[1].split('&');
        var param = paramsArray[0].split('=');
        pokemonId = param[1];
    }

    function showData(resp) {
        var tbody = $table.find('tbody').last();
        tbody.empty();

        var $nameRow = prepareRow('name', resp.name);
        var $speedRow = prepareRow('speed', resp.speed);
        var $attackRow = prepareRow('attack', resp.attack);
        var $defenseRow = prepareRow('defense', resp.defense);

        $nameRow.appendTo(tbody);
        $speedRow.appendTo(tbody);
        $attackRow.appendTo(tbody);
        $defenseRow.appendTo(tbody);

        if(resp.evolutions[0] !== undefined) {
            var $evolutionRow = prepareEvolutionRow('evolution', resp.evolutions[0]);
            $evolutionRow.appendTo(tbody);
        }
    }

    function prepareRow(key, value) {
        var $row = $('<tr>');
        var $key = $('<td>').text(key);
        var $value = $('<td>').text(value);

        $row.append($key)
            .append($value);

        return $row;
    }

    function prepareEvolutionRow(key, evolution) {
        var evolutionUrl = evolution.resource_uri.split('/');
        var pokemonId = evolutionUrl[4];

        var $row = $('<tr>');
        var $key = $('<td>').text(key);
        var $valueHref = $('<a href="pokemon.html?pokemonId=' + pokemonId + '">').text(evolution.to);
        var $value = $('<td>').append($valueHref);

        $row.append($key)
            .append($value);

        return $row;
    }

    getData();
});