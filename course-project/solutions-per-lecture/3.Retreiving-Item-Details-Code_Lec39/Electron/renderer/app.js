
// Modules
const {ipcRenderer} = require('electron')

// Show add-modal
$('.open-add-modal').click(() => {
  $('#add-modal').addClass('is-active')
})
// Hide add-modal
$('.close-add-modal').click(() => {
  $('#add-modal').removeClass('is-active')
})

// Handle add-modal submission
$('#add-button').click(() => {

  // Get URL from input
  let newItemURL = $('#item-input').val()
  if(newItemURL) {

    // Disable modal UI
    $('#item-input').prop('disabled', true)
    $('#add-button').addClass('is-loading')
    $('.close-add-modal').addClass('is-disabled')

    // Send URL to main process via IPC
    ipcRenderer.send('new-item', newItemURL)
  }
})

// Listen for new item from main
ipcRenderer.on('new-item-success', (e, item) => {

  console.log(item)

  // Close and reset modal
  $('#add-modal').removeClass('is-active')
  $('#item-input').prop('disabled', false).val('')
  $('#add-button').removeClass('is-loading')
  $('.close-add-modal').removeClass('is-disabled')
})

// Simulate add click on enter
$('#item-input').keyup((e) => {
  if(e.key === 'Enter') $('#add-button').click()
})
