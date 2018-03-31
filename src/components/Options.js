import React from 'react';
import Option from './Option';

const Options = (props) => (
	<div>
		<div className="widget-header">
			<h3 className="widget-header__title">Your Options</h3>
				<button
					className="button button--link"
					onClick={props.deleteOptions}
				>
					Remove All
				</button>
		</div>
		{ props.options.length === 0 && <p className="widget__message">Please enter some options to get started!</p>}
		{
			props.options.map((option, index) => (
				<Option
					count={index + 1}
					key={option}
					optionText={option}
					deleteOption={props.deleteOption}
				/>
			))
		}
	</div>
);

export default Options;