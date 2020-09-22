import React from "react";
import styled from "styled-components";

const TooltipContainer = styled.div`
	position: fixed;
	top: ${p => p.y ? p.y : 0}px;
	left: ${p => p.x ? p.x : 0}px;
	z-index: 100;
	font-weight: 300;
	text-align: left;
	text-align: start;
	display: inline-block;
	margin-bottom: 5px;
	user-select: none;
`;

const TooltipLabel = styled.div`
	max-width: 200px;
	padding: 3px 8px;
	color: rgb(255, 255, 255);
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 4px;
	position: fixed;
`;

const Tooltip = ({
	x,
	y,
	show,
	text,
}) => {

	return (
		<>
			{show &&
				<TooltipContainer x={x} y={y}>
					<TooltipLabel>{text}</TooltipLabel>
				</TooltipContainer>
			}
		</>
	)
};

export default Tooltip;