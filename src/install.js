define([
	'fontoxml-modular-ui/uiManager',

	'./ui/OperationBrowserModal.jsx'
], function (
	uiManager,

	OperationBrowserModal
) {
	'use strict';

	return function install () {
		uiManager.registerReactComponent('OperationBrowserModal', OperationBrowserModal);
	};
});
