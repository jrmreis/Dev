/**
 * @license Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or https://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {

	config.height = 100;
	config.toolbarCanCollapse = true;
	config.language = 'pt-br';
	config.uiColor = '#f2f2f2';
	config.removePlugins = 'all';
	config.toolbar = [
		['Format', 'Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink','-','Image','-','HorizontalRule']
	];

	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
};
