$(function() {
	var url = 'https://pokeapi.co';
	var connect = '/api/v1/sprite/';
	var table = $('.table-responsive');
	var currentHP = 0;
	var currentPageNumber = 1;
	var prev = $('.prev');
	var next = $('.next');
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

	//pagening
	function checkCurrentPageNumber() {
		if (currentPageNumber > 1) prev.show();
		else prev.hide();
	}

	function setOffset() {
		offsetNumber = (currentPageNumber - 1) * 10 + 1;
	}

	prev.click(function() {
		currentPageNumber--;
		console.log(currentPageNumber);
		checkCurrentPageNumber();
		setOffset();
		getData(offsetNumber);
	});

	next.click(function() {
		currentPageNumber++;
		console.log(currentPageNumber);
		checkCurrentPageNumber();
		setOffset();
		getData(offsetNumber);
	});

	$('.page').click(function() {
		if( !$(this).hasClass("active") ) {
			currentPageNumber = $(this).index();
			console.log(currentPageNumber);
			$('.page').removeClass("active").eq(currentPageNumber-1).addClass("active");
			checkCurrentPageNumber();
			setOffset();
			getData(offsetNumber);
		}
	})

	//first getting data
	getData();
	checkCurrentPageNumber();

});