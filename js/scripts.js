$(function() {
	var url = 'https://pokeapi.co';
	var connect = '/api/v1/sprite/';
	var $table = $('.table-responsive');
	var currentPageNumber = 1;
	var offsetNumber;


	function getData(offsetNumber) {
		$.ajax({
			url: url + connect,
			method: 'GET',
			data: {
				limit: 10,
				offset: offsetNumber || 1
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
		var tbody = $table.find('tbody').last();
		tbody.empty();
		resp.objects.forEach(function(item) {
			var $row = $('<tr>');
			var $itemImage = $('<td><a href="pokemon.html?pokemonId=' + item.id + '"><img class="img-responsive" src="' + url + item.image + '" alt="pokemon">');
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
	//pagination
	function initializePagination() {
		$('.pagination').pagination({
	        items: 20,
	        itemOnPage: 10,
	        currentPage: 1,
	        displayedPages: 3,
	        cssStyle: '',
	        prevText: '<span aria-hidden="true">&laquo;</span>',
	        nextText: '<span aria-hidden="true">&raquo;</span>',
	        onInit: function () {
	            getData();
	        },
	        onPageClick: function (page) {
	            currentPageNumber = page;
	            setOffset();
	            getData(offsetNumber);
	        }
	    });
	}

	function setOffset() {
		offsetNumber = (currentPageNumber - 1) * 10 + 1;
	}
	//initialize pagination and first getting data
	initializePagination();
});