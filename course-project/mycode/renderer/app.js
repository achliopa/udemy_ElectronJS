//Modules
const {ipcRenderer} = require('electron');
const items = require('./items');
const manu = require('./menu');

// Navigate selected item with up/down keys
$(document).keydown((e) => {
	switch (e.key) {
		case'ArrowUp':
			items.changeItem('up');
			break;
		case 'ArrowDown':
			items.changeItem('down');
			break;
	}
});



// Show add modal
$('.open-add-modal').click(()=>{
	$('#add-modal').addClass('is-active');
});

// Hide add modal
$('.close-add-modal').click(()=>{
	$('#add-modal').removeClass('is-active');
});

//handle add-modal submission
$('#add-button').click(()=>{

	// Get URL from input
	let newItemURL = $('#item-input').val();
	if(newItemURL) {
		//disable modalUI
		$('#item-input').prop('disabled',true);
		$('.close-add-button').addClass('is-disabled');
		$('#add-button').addClass('is-loading');
		// send URL to main process via IPC
		ipcRenderer.send('new-item', newItemURL);
	}
});

// Listen for new item from main
ipcRenderer.on('new-item-success',(e, item)=> {
	// Add item to items array
	items.toreadItems.push(item);
	// save items to storage
	items.saveItems();
	// Add item
	items.addItem(item);

	//close and reset the modal
	$('#add-modal').removeClass('is-active');
	$('#item-input').prop('disabled',false);
	$('.close-add-button').removeClass('is-disabled');
	$('#add-button').removeClass('is-loading');

	//if this is the first item
	if(items.toreadItems.length === 1)
		$('.read-item:first()').addClass('is-active');
});

//simulate add click on enter
$('#item-input').keyup((e) => {
	if(e.key === 'Enter') $('#add-button').click();
});

// filter items by title
$('#search').keyup((e) => {
	//get current search input value
	let filter = $(e.currentTarget).val().toLowerCase();

	$('.read-item').each((i, el) => {
		$(el).text().toLowerCase().includes(filter) ? $(el).show(): $(el).hide();
	});
});

// add items when app starts
if(items.toreadItems.length) {
	items.toreadItems.forEach(items.addItem);
	$('.read-item:first()').addClass('is-active');
}
	
