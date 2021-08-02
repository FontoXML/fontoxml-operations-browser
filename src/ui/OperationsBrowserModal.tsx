import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from 'fds/components';
import React, { Component } from 'react';

import type { ModalProps } from 'fontoxml-fx/src/types';
import t from 'fontoxml-localization/src/t';
import operationsManager from 'fontoxml-operations/src/operationsManager';

import OperationPreview from './OperationPreview';
import OperationsGrid from './OperationsGrid';

async function createViewModelsForOperations(operationData) {
	return Promise.all(
		operationData.operations.map(async (operationDataModel, i) =>
			operationsManager
				.getOperationState(operationDataModel.operationName, {
					...operationData,
					...operationDataModel.data,
				})
				.then((operationState) => ({
					name: operationDataModel.operationName,
					data: operationDataModel.data,
					id: i,
					label:
						operationDataModel.label ||
						operationDataModel.operationName,
					description: operationDataModel.description,
					image: operationDataModel.image,
					isDisabled: operationState.enabled === false,
				}))
		)
	);
}

class OperationsBrowserModal extends Component<
	ModalProps<{
		modalIcon?: string;
		modalPrimaryButtonLabel: string;
		modalTitle: string;
	}>
> {
	constructor(props) {
		super(props);

		this.isMountedInDOM = true;

		createViewModelsForOperations(this.props.data).then((viewModels) => {
			if (!this.isMountedInDOM) {
				return;
			}
			this.setState({ displayedOperations: viewModels });
		});

		this.state = { selectedOperation: null, displayedOperations: [] };

		this.handleSubmit = (operation) => {
			this.props.submitModal({
				...operation.data,
				operationName: operation.name,
			});
		};

		this.handleKeyDown = (event) => {
			const { selectedOperation } = this.state;
			switch (event.key) {
				case 'Escape':
					this.props.cancelModal();
					break;
				case 'Enter':
					if (selectedOperation && !selectedOperation.isDisabled) {
						this.handleSubmit(selectedOperation);
					}
					break;
			}
		};

		this.handleOperationGridItemClick = (selectedOperation) => {
			this.setState({ selectedOperation });
		};

		this.handleSubmitButtonClick = () =>
			this.handleSubmit(this.state.selectedOperation);
	}

	render() {
		const { selectedOperation, displayedOperations } = this.state;
		const {
			cancelModal,
			data: { modalIcon, modalPrimaryButtonLabel, modalTitle },
		} = this.props;

		return (
			<Modal size="m" onKeyDown={this.handleKeyDown}>
				<ModalHeader icon={modalIcon || null} title={modalTitle} />

				<ModalBody>
					<ModalContent>
						<ModalContent>
							<OperationsGrid
								onItemClick={this.handleOperationGridItemClick}
								onItemDoubleClick={this.handleSubmit}
								operations={displayedOperations}
								selectedOperation={selectedOperation}
							/>
						</ModalContent>

						{selectedOperation && (
							<ModalContent flex="none">
								<OperationPreview
									operation={selectedOperation}
								/>
							</ModalContent>
						)}
					</ModalContent>
				</ModalBody>

				<ModalFooter>
					<Button label={t('Cancel')} onClick={cancelModal} />

					<Button
						type="primary"
						label={modalPrimaryButtonLabel}
						isDisabled={
							!selectedOperation || selectedOperation.isDisabled
						}
						onClick={this.handleSubmitButtonClick}
					/>
				</ModalFooter>
			</Modal>
		);
	}

	componentWillUnmount() {
		this.isMountedInDOM = false;
	}
}

export default OperationsBrowserModal;
