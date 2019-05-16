import uiManager from 'fontoxml-modular-ui/src/uiManager.js';
import OperationsBrowserModal from './ui/OperationsBrowserModal.jsx';

export default function install() {
	uiManager.registerReactComponent('OperationsBrowserModal', OperationsBrowserModal);
}
