import React from 'react';

import { Flex, Grid, StateMessage } from 'fds/components';
import { scrollContainer } from 'fds/system';
import t from 'fontoxml-localization/t';

import OperationGridItem from './OperationGridItem.jsx';

const styles = scrollContainer('m');

const handleRenderItem = ({ key, item, isSelected, onClick, onDoubleClick }) => (
	<OperationGridItem
		key={key}
		isDisabled={item.isDisabled}
		isSelected={isSelected}
		item={item}
		onClick={onClick}
		onDoubleClick={onDoubleClick}
	/>
);

const OperationsGrid = ({ onItemClick, onItemDoubleClick, operations, selectedOperation }) => (
	<Flex applyCss={styles}>
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
	</Flex>
);

export default OperationsGrid;
