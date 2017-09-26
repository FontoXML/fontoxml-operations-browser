define([
	'fontoxml-modular-ui/uiManager',

	'./ui/OperationsBrowserModal.jsx'
], function (
	uiManager,

	OperationsBrowserModal
) {
	'use strict';

	return function install () {
		uiManager.registerReactComponent('OperationsBrowserModal', OperationsBrowserModal);
	};
});
