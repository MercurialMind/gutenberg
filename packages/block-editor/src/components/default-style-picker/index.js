/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * WordPress dependencies
 */
import { useMemo, useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

export default function DefaultStylePicker( { blockName } ) {
	const {
		defaultStyle,
		onUpdateDefaultBlockStyles,
		styles,
	} = useSelect(
		( select ) => {
			const settings = select( 'core/block-editor' ).getSettings();
			return {
				defaultStyle: get( settings, [ 'defaultBlockStyles', blockName ] ),
				onUpdateDefaultBlockStyles: settings.onUpdateDefaultBlockStyles,
				styles: select( 'core/blocks' ).getBlockStyles( blockName ),
			};
		},
		[ blockName ]
	);
	const selectOptions = useMemo(
		() => ( [
			{ label: __( 'Not set' ), value: '' },
			...styles.map( ( { label, name } ) => ( { label, value: name } ) ),
		] ),
		[ styles ],
	);
	const selectOnChange = useCallback(
		( blockStyle ) => {
			onUpdateDefaultBlockStyles( blockName, blockStyle );
		},
		[ blockName, onUpdateDefaultBlockStyles ]
	);

	return onUpdateDefaultBlockStyles && (
		<SelectControl
			options={ selectOptions }
			value={ defaultStyle || '' }
			label={ __( 'Default Style' ) }
			onChange={ selectOnChange }
		/>
	);
}
