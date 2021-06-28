import uiManager from 'fontoxml-modular-ui/src/uiManager';

import OperationsBrowserModal from './ui/OperationsBrowserModal';

export default function install(): void {
	uiManager.registerReactComponent(
		'OperationsBrowserModal',
		OperationsBrowserModal
	);
}
