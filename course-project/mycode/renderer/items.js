
// track items with array
exports.toreadItems = JSON.parse(localStorage.getItem('toreadItems')) || [];

// save items to localstorage
exports.saveItems = ()  => {
	localStorage.setItem('toreadItems', JSON.stringify(this.toreadItems))
}

// Toggle item as selected
exports.selectItem = (e) => {
	$('.read-item').removeClass('is-active');
	$(e.currentTarget).addClass('is-active');
}

// select next/prev item
exports.changeItem = (direction) => {
	// get the active item
	let activeItem = $('.read-item.is-active');

	// check direction and get next or previous read-item
	let newItem = (direction === 'down') ? activeItem.next('.read-item') : activeItem.prev('.read-item');

	// only if item found change selection
	if(newItem.length) {
		activeItem.removeClass('is-active');
		newItem.addClass('is-active');
	}
}

// open item for reading
exports.openItem = () => {
	// only if items have been added
	if(!this.toreadItems.length) return

	// Open item for reading
	let targetItem = $('.read-item.is-active');

	// get item's content url
	let contentURL = targetItem.data('url');
	console.log(contentURL);
}


// add nee item
exports.addItem = (item) => {
	// hide 'no-items' message
	$('#no-items').hide();

	//create html string for new item - bulma panel block
	// we can implement some templating e.g mustache
	// we keep it simple and use ES6 interplated strings
	let itemHTML = `<a class="panel-block read-item" data-url="${item.url}">
						<figure class="image has-shadow is-64x64 thumb">
							<img src="${item.screenshot}">
						</figure>
						<h2 class="title is-4 column">${item.title}</h2>
					</a>`;

	//append to read-list
	$('#read-list').append(itemHTML);

	// Attach select event handler
	$('.read-item')
		.off('click, dblclick')
		.on('click', this.selectItem)
		.on('dblclick', this.openItem);
}