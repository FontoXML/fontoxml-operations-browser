import type { FC } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from 'fontoxml-design-system/src/components';
import type {
	FdsOnItemClickCallback,
	FdsOnItemDoubleClickCallback,
	FdsOnKeyDownCallback,
} from 'fontoxml-design-system/src/types';
import type { ModalProps } from 'fontoxml-fx/src/types';
import t from 'fontoxml-localization/src/t';
import operationsManager from 'fontoxml-operations/src/operationsManager';

import type { OperationViewModel } from '../types';
import OperationPreview from './OperationPreview';
import OperationsGrid from './OperationsGrid';

async function createViewModelsForOperations(
	operationData
): Promise<OperationViewModel[]> {
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

type Props = ModalProps<
	{
		modalIcon?: string;
		modalPrimaryButtonLabel: string;
		modalTitle: string;
	},
	{ operationName: string }
>;

const OperationsBrowserModal: FC<Props> = ({
	cancelModal,
	data,
	submitModal,
}) => {
	const isMountedInDOM = useRef(false);

	const [selectedOperation, setSelectedOperation] =
		useState<OperationViewModel | null>(null);
	const [displayedOperations, setDisplayedOperations] = useState<
		OperationViewModel[]
	>([]);

	useEffect(() => {
		isMountedInDOM.current = true;

		return () => {
			isMountedInDOM.current = false;
		};
	}, []);

	useEffect(() => {
		void createViewModelsForOperations(data).then((viewModels) => {
			if (!isMountedInDOM.current) {
				return;
			}
			setDisplayedOperations(viewModels);
		});
	}, [data]);

	const handleSubmit = useCallback(
		(operationViewModel: OperationViewModel) => {
			submitModal({
				...operationViewModel.data,
				operationName: operationViewModel.name,
			});
		},
		[submitModal]
	);

	const handleKeyDown = useCallback<FdsOnKeyDownCallback>(
		(event) => {
			switch (event.key) {
				case 'Escape':
					cancelModal();
					break;
				case 'Enter':
					if (selectedOperation && !selectedOperation.isDisabled) {
						handleSubmit(selectedOperation);
					}
					break;
			}
		},
		[cancelModal, handleSubmit, selectedOperation]
	);

	const handleOperationGridItemClick = useCallback<FdsOnItemClickCallback>(
		(item: OperationViewModel) => {
			setSelectedOperation(item);
		},
		[]
	);
	const handleOperationGridItemDoubleClick =
		useCallback<FdsOnItemDoubleClickCallback>(
			(item: OperationViewModel) => {
				handleSubmit(item);
			},
			[handleSubmit]
		);

	const handleSubmitButtonClick = useCallback(() => {
		handleSubmit(selectedOperation);
	}, [handleSubmit, selectedOperation]);

	return (
		<Modal size="m" onKeyDown={handleKeyDown}>
			<ModalHeader icon={data.modalIcon} title={data.modalTitle || ''} />

			<ModalBody>
				<ModalContent>
					<ModalContent>
						<OperationsGrid
							onItemClick={handleOperationGridItemClick}
							onItemDoubleClick={
								handleOperationGridItemDoubleClick
							}
							operations={displayedOperations}
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
					label={data.modalPrimaryButtonLabel}
					isDisabled={
						!selectedOperation || selectedOperation.isDisabled
					}
					onClick={handleSubmitButtonClick}
				/>
			</ModalFooter>
		</Modal>
	);
};

export default OperationsBrowserModal;
