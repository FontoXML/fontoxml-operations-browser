import * as React from 'react';

import {
	Block,
	Grid,
	StateMessage,
} from 'fontoxml-design-system/src/components';
import type {
	FdsOnItemClickCallback,
	FdsOnItemDoubleClickCallback,
} from 'fontoxml-design-system/src/types';
import t from 'fontoxml-localization/src/t';

import OperationGridItem from './OperationGridItem';

const handleRenderItem = ({
	key,
	item,
	isSelected,
	onClick,
	onDoubleClick,
}) => (
	<OperationGridItem
		key={key}
		isDisabled={item.isDisabled}
		isSelected={isSelected}
		item={item}
		onClick={onClick}
		onDoubleClick={onDoubleClick}
	/>
);

type Props = {
	onItemClick: FdsOnItemClickCallback;
	onItemDoubleClick: FdsOnItemDoubleClickCallback;
	operations: $TSFixMeAny[];
	selectedOperation: $TSFixMeAny;
};

const OperationsGrid: React.FC<Props> = ({
	onItemClick,
	onItemDoubleClick,
	operations,
	selectedOperation,
}) => (
	<Block flex="1" isScrollContainer>
		{operations.length === 0 && (
			<StateMessage
				paddingSize="l"
				visual="meh-o"
				title={t('No operations found.')}
				message={t(
					'We couldn’t find any suitable operations for your cursor position. Try again from another location in your document.'
				)}
			/>
		)}

		{operations.length !== 0 && (
			<Grid
				items={operations}
				selectedItem={selectedOperation}
				onItemDoubleClick={onItemDoubleClick}
				onItemClick={onItemClick}
				renderItem={handleRenderItem}
			/>
		)}
	</Block>
);

export default OperationsGrid;
