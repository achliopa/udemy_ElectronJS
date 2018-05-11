// module 
const {remote} = require('electron');

// menu tempalte object
const template = [
	{
		label: 'Items',
		submenu: [
			{
				label: 'Add New',
				accelerator: 'CmdOrCtrl+o',
				click () {$('.open-add-modal').click()}
			},
			{
				label: 'Read Item',
				accelerator: 'CmdOrCtrl+Enter',
				click () { window.openItem()}
			},
			{
				label: 'Delete Item',
				accelerator: 'CmdOrCtrl+Backspace',
				click () { window.deleteItem() }
			},
			{
				label: 'Open in Browser',
				accelerator: 'CmdOrCtrl+Shift+Enter',
				click () { window.openInBrowser()}
			},
			{
				type: 'separator',
			},
			{
				label: 'Search Items',
				accelerator: 'CmdOrCtrl+s',
				click () { $('#search').focus()}
			}
		]
	},
	{
		label: 'Edit',
		submenu: [
	        {role: 'undo'},
	        {role: 'redo'},
	        {type: 'separator'},
	        {role: 'cut'},
	        {role: 'copy'},
	        {role: 'paste'},
	        {role: 'pasteandmatchstyle'},
	        {role: 'delete'},
	        {role: 'selectall'}
      ]
	},
	{
		role: 'window',
		submenu: [
	        {role: 'minimize'},
	        {role: 'close'}
      	]
	},
	{
		role: 'help',
		 submenu: [
        {
          label: 'Learn More',
          click () { require('electron').shell.openExternal('https://electronjs.org') }
        }
      ]
	}
];

// Mac specific
if(process.platform === 'darwin'){
	// Add first menu item
	template.unshift({
		label: remote.app.getname(),
		submenu: [
	        {role: 'about'},
	        {type: 'separator'},
	        {role: 'services', submenu: []},
	        {type: 'separator'},
	        {role: 'hide'},
	        {role: 'hideothers'},
	        {role: 'unhide'},
	        {type: 'separator'},
	        {role: 'quit'}
        ]
	});

	// mac extra window options
	 template[3].submenu = [
	      {role: 'close'},
	      {role: 'minimize'},
	      {role: 'zoom'},
	      {type: 'separator'},
	      {role: 'front'}
    ];
}

// add menu to app
const menu = remote.Menu.buildFromTemplate(template);
remote.Menu.setApplicationMenu(menu);