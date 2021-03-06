import React from "react";
import styled from "styled-components";
import { Grid, Cell } from "./grid-items";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { updateRoute } from "../state/router-slice";
import { useDispatch } from "react-redux";
import { noop } from "lodash";
import Tooltip from "../components/tooltip";

const Nav = styled(Grid)`
	grid-gap: 0;
	width: ${p => p.width ? p.width : "initial"};
	transition-property: width;
	transition: 0.5s;
`;

const NavItem = styled(Grid)`
	cursor: pointer;
	color: rgb(255, 255, 255);
	transition-property: width;
	transition-duration: 0.5s;
	background-color: ${p => p.active ? "rgba(255, 255, 255, 0.2)" : "transparent"};
	width: 90%;
	margin-left: 10%;
	border-radius: 18px 0 0 18px;
	height: 100%;
	opacity: 0.7;

	:hover {
		opacity: 1;
	}
`;

const NavText = styled(Cell)`
	line-height: 2.75em;
	font-size: 0.75em;
	font-weight: 600;
	text-align: right;
	width: 100%;
	padding-right: 1em;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	height: 100%;
	width: ${p => p.width ? p.width : "initial"};

	.logo-icon {
		position: relative;
		transform: scale(150%);
		margin-left: 0.5em;
	}
`;

const HeaderCell = styled(Cell)`
`;

const Logo = () => {
	return (
		<svg height="1em" width="80%">
			<defs>
				<linearGradient id="logo-gradient" x1="0%" x2="100%">
					<stop offset="0%" style={{ stopColor: "#e3ffe7", stopOpacity: 1}}/>
					<stop offset="100%" style={{ stopColor: "#d9e7ff", stopOpacity: 1 }}/>
				</linearGradient>
			</defs>
			<text x="10" y="15" style={{fill: `url(#logo-gradient)`}} fontSize="1.1em" fontWeight="800">Umbrella Whether</text>
		</svg> 
	)
}

const NavEntry = ({ navOpen, icon, text, active, onClick = noop }) => {
	return(
		<NavItem active={active} onClick={onClick} columns="4fr 1fr 2fr">
			<Cell></Cell>
			<NavText col="2">
				{icon && <Icon icon={icon} />}
			</NavText>
			<NavText col="3">
				{navOpen && <span>{text}</span>}
			</NavText>
		</NavItem>
	)
}

export default ({
	activeRoute,
	allRoutes,
	toggleNavWidth = noop,
	navOpen = true,
	width,
}) => {
	const dispatch = useDispatch();
	const [ tooltip, setTooltip ] = React.useState({
		show: false,
		x: 0,
		y: 0,
	});

	const showTooltip = (evt) => {
		setTooltip({
			show: true,
			x: evt.target.getBoundingClientRect().right,
			y: evt.target.getBoundingClientRect().top
		});
	};

	const hideTooltip = () => {
		setTooltip({
			...tooltip,
			show: false
		});
	};

	//Prevents tooltip from lingering when position of trigger element changes
	React.useEffect(() => {
		const hideTooltip = () => {
			setTooltip({
				show: false
			});
		};

		hideTooltip();
	}, [navOpen]);

	return (
		<Nav
			columns="1fr"
			rows="60px 2em 2em 2em 2em"
			width={width}
		>
			<Tooltip
				show={tooltip.show} 
				x={tooltip.x} 
				y={tooltip.y} 
				text={navOpen ? "Collapse" : "Expand"} 
			/>
			<HeaderCell
				onClick={toggleNavWidth}
			>
				<Header navOpen={navOpen} width={width}>
					<Icon 
						icon="umbrella" 
						className="logo-icon"
					/>
					{navOpen && 
						<Logo/>
					}
					{navOpen && 
						<span
							onMouseOver={(evt) => {
								evt.stopPropagation();
								showTooltip(evt);
							}}
							onMouseOut={hideTooltip}
						>{"<"}</span>
					}
					{!navOpen &&
						<span
							onMouseOver={(evt) => {
								evt.stopPropagation();
								showTooltip(evt);
							}}
							onMouseOut={hideTooltip}
						>{">"}</span>
					}
				</Header>
			</HeaderCell>
			<Cell row="2">
				<NavEntry 
					active={activeRoute === allRoutes.home}
					onClick={() => dispatch(updateRoute(allRoutes.home))}
					navOpen={navOpen}
					text="Home"
					icon="home"
				/>
			</Cell>
			<Cell row="3">
				<NavEntry
					active={activeRoute === "help"}
					onClick={() => dispatch(updateRoute("help"))}
					navOpen={navOpen}
					text="Help"
					icon="question-circle"
				/>
			</Cell>
			<Cell row="4">
				<NavEntry
					active={activeRoute === allRoutes.about} 
					onClick={() => dispatch(updateRoute(allRoutes.about))}
					navOpen={navOpen}
					text="About"
					icon="info-circle"
				/>
			</Cell>
		</Nav>
	);
}