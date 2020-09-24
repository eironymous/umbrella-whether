import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Grid, Cell } from "../layout/grid-items";
import Tooltip from "./tooltip";
import { noop } from "lodash";

const NewNoteInput = styled.textarea`
	width: 100%;
	height: 100%;
	color: rgb(255, 255, 255);
	background-color: transparent;
	border: 2px solid ${p => p.error ? "rgba(255, 0, 0, 0.3)": "#22223B"};
	border-radius: 12px;
	padding: 1em;
	box-sizing: border-box;

	::-webkit-scrollbar {
		width: 4px;
	}

	::-webkit-scrollbar-track {
		opacity: 0;
	}

	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background: #22223B;
	}

	scrollbar-color: #22223B;
	scrollbar-width: 4px;
`;

const Button = styled.div`
	cursor: pointer;
	opacity: 0.7;
	text-align: ${p => p.submit ? "right" : "left"};
	line-height: 5em;
	font-size: 1.2em;
	box-sizing: border-box;

	:hover {
		opacity: 1;
	}
`;

const CharTracker = styled.div`
	font-weight: 200;
	letter-spacing: 1px;
	text-align: left;
	line-height: 5em;
	box-sizing: border-box;
	font-size: 1.2em;
`;

const NoteInput = ({
	id,
	text = "",
	onSubmit = noop,
	onCancel = noop,
}) => {
	const [ value, setValue ] = React.useState(text);
	const [ tooltip, setTooltip ] = React.useState({
		id: -1,
		x: 0,
		y: 0,
	});
	const [ error, setError ] = React.useState(false);
	const textFieldRef = React.useRef();

	React.useEffect(() => {
		setValue(text);
	}, [text]);

	React.useEffect(() => {
		if (textFieldRef.current) {
			textFieldRef.current.focus();
		}
	}, []);

	const hideTooltips = () => {
		setTooltip({
			...tooltip,
			id: -1,
		});
	}
	
	const showSubmitTooltip = (evt) => {
		setTooltip({
			id: 0,
			x: evt.target.getBoundingClientRect().right,
			y: evt.target.getBoundingClientRect().top - 20
		});
	}

	const showCancelTooltip = (evt) => {
		setTooltip({
			id: 1,
			x: evt.target.getBoundingClientRect().right,
			y: evt.target.getBoundingClientRect().top - 20
		})
	}

	const handleSubmit = () => {
		if (error) {
			return;
		}

		onSubmit(id, value);
		onCancel();
	}

	const handleCancel = () => {
		setValue(text);
		onCancel();
	}

	const handleKeyUp = ({ key }) => {
		switch(true) {
			case key === "Enter": {
				if (error) {
					break;
				}

				handleSubmit();
				return;
			}
			case key === "Escape": {
				handleCancel();
				return;
			}
			default: {
				return;
			}
		}
	}

	const handleInput = ({target}) => {
		if (target.value.length === 0) {
			setValue(target.value);
			setError(true);
		} else {
			setValue(target.value);
			setError(false);
		}
	}
	

	return (
		<Grid rows="10em 5em" columns="1fr 1fr 1fr">
			<Tooltip 
				show={tooltip.id === 0} 
				x={tooltip.x} 
				y={tooltip.y} 
				text="Submit"
			/>
			<Tooltip 
				show={tooltip.id === 1}
				x={tooltip.x}
				y={tooltip.y}
				text="Abandon Changes"
			/>
			<Cell col="1/span 3">
				<NewNoteInput 
					maxLength="460"
					onKeyUp={handleKeyUp}
					error={error}
					value={value}
					onChange={handleInput}
					ref={textFieldRef}
					placeholder={error ? "This field can't be empty! :(" : "Enter your note here and press the send button or hit Enter to submit. :)"}
					className="note-input"
				/>
			</Cell>
			<Cell row="2" col="1">
				<Button onClick={handleCancel} submit={false}>
					<Icon 
						icon="trash"
						onMouseOver={showCancelTooltip}
						onMouseOut={hideTooltips}
					/>
				</Button>
			</Cell>
			<Cell row="2" col="2">
				<CharTracker>
					{`${value.length}/460`}
				</CharTracker>
			</Cell>
			<Cell row="2" col="3">
				<Button onClick={handleSubmit} submit={true}>
					<Icon 
						icon="paper-plane"
						onMouseOver={showSubmitTooltip}
						onMouseOut={hideTooltips} 
					/>
				</Button>
			</Cell>
		</Grid>
	)
}

export default NoteInput;