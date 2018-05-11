
// Track items with array
exports.toreadItems = JSON.parse(localStorage.getItem('toreadItems')) || []

// Save items to localstorage
exports.saveItems = () => {
  localStorage.setItem('toreadItems', JSON.stringify(this.toreadItems))
}

// Add new item
exports.addItem = (item) => {

  // Hide 'no items' message
  $('#no-items').hide()

  // New item html
  let itemHTML = `<a class="panel-block read-item">
                    <figure class="image has-shadow is-64x64 thumb">
                      <img src="${item.screenshot}">
                    </figure>
                    <h2 class="title is-4 column">${item.title}</h2>
                  </a>`
  // Apppend to read-list
  $('#read-list').append(itemHTML)
}
