$(function() {
	var url = 'https://pokeapi.co';
	var connect = '/api/v1/sprite/';
	var table = $('.table-responsive');
	var currentHP = 0;

	function getData() {
		$.ajax({
			url: url + connect,
			method: 'GET',
			data: {
				limit: 10,
				offset: 1
			},
			success: showData
		});
	}

	function getHP(resource_uri, $itemHp) {
		$.ajax({
			url: url + resource_uri,
			method: 'GET',
			success: function(resp) {
                showHP(resp, $itemHp);
            }
		});
	}

	function showData(resp) {
		var tbody = table.find('tbody').last();
		tbody.empty();
		resp.objects.forEach(function(item) {
			var $row = $('<tr>');
			var $itemImage = $('<td><img class="img-responsive" src="' + url + item.image + '" alt="pokemon">');
			var $itemName = $('<td>').text(item.pokemon.name);
			var $itemHP = $('<td>');

			$row.append($itemImage)
				.append($itemName)
				.append($itemHP);

			$row.appendTo(tbody);
			getHP(item.pokemon.resource_uri, $itemHP);
		});
	}

	function showHP(resp, $itemHp) {
        $itemHp.text(resp.hp);
	}

	getData();

});