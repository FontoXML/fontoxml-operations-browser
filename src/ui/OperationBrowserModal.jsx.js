import PropTypes from 'prop-types';
import React, { Component } from 'react';

import t from 'fontoxml-localization/t';
import operationsManager from 'fontoxml-operations/operationsManager';

import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from 'fontoxml-vendor-fds/components';

import OperationsGrid from './OperationsGrid.jsx';
import OperationPreview from './OperationPreview.jsx';

function createViewModelsForOperations(operationData) {
	return operationData.operations.map((operationDataModel, i) => ({
		name: operationDataModel.operationName,
		id: i,
		label: operationDataModel.label || operationDataModel.operationName,
		description: operationDataModel.description,
		image: operationDataModel.image,
		isDisabled:
			operationsManager.getOperationState(operationDataModel.operationName, {
				...operationData,
				...operationDataModel.data
			}).enabled === false
	}));
}

class OperationBrowserModal extends Component {
	static propTypes = {
		cancelModal: PropTypes.func.isRequired,
		data: PropTypes.shape({
			modalIcon: PropTypes.string,
			modalPrimaryButtonLabel: PropTypes.string.isRequired,
			modalTitle: PropTypes.string.isRequired
		}),
		submitModal: PropTypes.func.isRequired
	};

	displayedOperations = createViewModelsForOperations(this.props.data);

	state = { selectedOperation: null };

	handleOperationsGridItemClick = selectedOperation => this.setState({ selectedOperation });

	handleSubmit = operation =>
		this.props.submitModal({
			...operation.data,
			operationName: operation.name
		});

	handleSubmitButtonClick = () => this.handleSubmit(this.state.selectedOperation);

	render() {
		const { selectedOperation } = this.state;
		const {
			cancelModal,
			data: { modalIcon, modalPrimaryButtonLabel, modalTitle }
		} = this.props;

		return (
			<Modal size="m">
				<ModalHeader icon={modalIcon || null} title={modalTitle} />

				<ModalBody>
					<ModalContent>
						<ModalContent>
							<OperationsGrid
								onItemClick={this.handleOperationsGridItemClick}
								onItemDoubleClick={this.handleSubmit}
								operations={this.displayedOperations}
								selectedOperation={selectedOperation}
							/>
						</ModalContent>

						{selectedOperation && (
							<ModalContent flex="none">
								<OperationPreview operation={selectedOperation} />
							</ModalContent>
						)}
					</ModalContent>
				</ModalBody>

				<ModalFooter>
					<Button label={t('Cancel')} onClick={cancelModal} />

					<Button
						type="primary"
						label={modalPrimaryButtonLabel}
						isDisabled={!selectedOperation || selectedOperation.isDisabled}
						onClick={this.handleSubmitButtonClick}
					/>
				</ModalFooter>
			</Modal>
		);
	}
}

export default OperationBrowserModal;
