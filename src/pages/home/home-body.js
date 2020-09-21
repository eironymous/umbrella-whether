import React from "react";
import styled from "styled-components";
import { Grid, Cell } from "../../layout/grid-items";
import Table from "../../layout/results-table";
import { reorderByFavorite } from "../../app/locale-list-tools";

const Body = styled(Grid)`
	padding: 2em;
	position: relative;
	min-width: 700px;
`;

const ListCell = styled(Cell)`
	overflow-y: auto;

	::-webkit-scrollbar {
		width: 4px;
	}

	::-webkit-scrollbar-track {
		opacity: 0;
	}

	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background: #4A4E69;
	}

	scrollbar-color: #4A4E69;
	scrollbar-width: 4px;
`;

const WaitingText = styled.div`
	font-weight: 800;
	text-align: left;
	font-size: 1em;
	letter-spacing: 2px;
	position: relative;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
`;

const HomeList = ({
	items = [],
	loaded
}) => {
	const [ list, setList ] = React.useState(items);

	React.useEffect(() => {
		const updateList = () => {
			let newList = [];

			if (items.length) {
				items.forEach((item) => {
					newList.push(item);
				});

				const sorted = reorderByFavorite(newList);

				setList(sorted);
			}
		}

		updateList();
	}, [items]);

	if (!items) return null;

	return(
		<Body rows="80vh" columns="1fr">
			<ListCell>
				{loaded && 
					<Table items={list} />
				}
				{!loaded &&
					<WaitingText>Please wait while we poke our heads outside...</WaitingText>
				}
			</ListCell>
		</Body>
	)
}

export default HomeList;