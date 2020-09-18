import styled from "styled-components";

const { isArray } = Array;

export const Grid = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
	display: grid;
	margin: 0;
	padding: 0;
	box-sizing: border-box;

	grid-template-columns: ${p => {
		switch(true) {
			case p.columns && isArray(p.columns):
				return p.columns.join(" ");
			case p.columns && !isArray(p.columns):
				return p.columns;
			default:
				return "auto";
		}
	}};

	grid-template-rows: ${p => {
		switch (true) {
			case p.rows && isArray(p.rows):
				return p.rows.join(" ");
			case p.rows && !isArray(p.rows):
				return p.rows;
			default:
				return "auto";
		}
	}};

	grid-gap: ${p => p.gridGap ? p.gridGap : "0"};
`;

export const Cell = styled.div`
	position: relative;
	grid-column: ${p => p.col ? p.col : "1"};
	grid-row: ${p => p.row ? p.row : "1"};
	height: 100%;
	width: 100%;
	margin: 0;
	padding: 0;
	box-sizing: border-box;
`;