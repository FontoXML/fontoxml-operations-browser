import type {
	OperationData,
	OperationName,
} from 'fontoxml-operations/src/types';

export type OperationViewModel = {
	name: OperationName;
	data: OperationData;
	id: number;
	label: string;
	description: string;
	image: string;
	isDisabled: boolean;
};
