import React from "react";
import styled from "styled-components";
import { Grid, Cell } from "../../layout/grid-items";
import Table from "../../layout/results-table";
import { reorderByFavorite } from "../../app/locale-list-tools";

const Body = styled(Grid)`
	padding: 2em;
	position: relative;
	top: 50%;
	left: 50%;
	transform: translateY(-50%) translateX(-50%);
	min-width: 500px;
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

const HomeList = ({
	items = [],
	loaded
}) => {
	const [ list, setList ] = React.useState(items);

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

	React.useEffect(() => {
		updateList();
	}, [items]);

	if (!items) return null;

	return(
		<Body rows="2em 80vh" columns="1fr">
			<Cell>
				Some Text Here:
			</Cell>
			<ListCell row="2">
				{loaded && 
					<Table items={list} />
				}
				{!loaded &&
					<span>Please wait while we poke our heads outside...</span>
				}
			</ListCell>
		</Body>
	)
}

export default HomeList;