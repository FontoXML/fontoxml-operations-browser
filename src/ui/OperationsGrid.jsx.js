import React from 'react';

import t from 'fontoxml-localization/t';

import { Flex, Grid, StateMessage } from 'fontoxml-vendor-fds/components';
import { scrollContainer } from 'fontoxml-vendor-fds/system';

import OperationsGridItem from './OperationsGridItem.jsx';

const styles = scrollContainer('m');

const handleRenderItem = ({ key, item, isDisabled, isSelected, onClick, onDoubleClick }) => (
	<OperationsGridItem
		key={key}
		isDisabled={isDisabled}
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
