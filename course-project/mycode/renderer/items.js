
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

// window function (main.js global scope)
// delete item by index
window.deleteItem = (i = false) => {

	// set i to active item if not passes as argument
	if (i === false) $('.read-item.is-active').index() -1;

	// remove item from DOM
	$('.read-item').eq(i).remove();
	// remove from toreadItem array
	this.toreadItems = this.toreadItems.filter((item,index)=>{
		return index !== i
	});
	// update storage
	this.saveItems();
	//select prev item or none if list is empty
	if(this.toreadItems.length) {
		let newIndex = (i === 0) ? 0 : i -1;
		//assign active class to newIndex
		$('.read-item').eq(newIndex).addClass('is-active');
	} else {
		// if no items left put back noitems message
		$('#no-items').show();
	}
};

// Open item in default browser
window.openInBrowser = () => { 
	// only if item exists
	if (!this.toReadItems.length) return

	// Open item for reading
	let targetItem = $('.read-item.is-active');

	// open in browser
	require('electron').shell.openExternal(targetItem.data('url'));
}

// open item for reading
window.openItem = () => {
	// only if items have been added
	if(!this.toreadItems.length) return

	// Open item for reading
	let targetItem = $('.read-item.is-active');

	// get item's content url (encoded)
	let contentURL = encodeURIComponent(targetItem.data('url'));
	
	// get item index to pass to proxy window
	let itemIndex = targetItem.index() -1;

	// Reader window URL
	let readerWinURL = `file://${__dirname}/reader.html?url=${contentURL}&itemIndex=${itemIndex}`;

	// Open item in new proxy BrowserWindow (secure)
	let readerWin = window.open(readerWinURL, targetItem.data('title'));
}


// add nee item
exports.addItem = (item) => {
	// hide 'no-items' message
	$('#no-items').hide();

	//create html string for new item - bulma panel block
	// we can implement some templating e.g mustache
	// we keep it simple and use ES6 interplated strings
	let itemHTML = `<a class="panel-block read-item" data-url="${item.url}" data-title="${item.title}">
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
		.on('dblclick', window.openItem);
}