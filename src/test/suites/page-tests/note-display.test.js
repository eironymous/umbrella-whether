import React from "react";
import { mount, shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NoteElement from "../../../pages/details/detail-card-elements/notes/note-element";
import NoteInput from "../../../components/note-input";

configure({ adapter: new Adapter() });

const note = {
	body: "This is a test note. It has some things in it.",
	timeStamp: "2020/09/23 04:14:00"
};

test('NoteElement loads', () => {
	let wrapper = mount(
		<NoteElement note={note} />
	);

	expect(wrapper).toMatchSnapshot();
});

test('NoteElement returns null if note is undefined', () => {
	let wrapper = shallow(
		<NoteElement note={undefined} />
	);

	expect(wrapper.get(0)).toBeFalsy();
});

test('NoteElement populates body correctly', () => {
	let wrapper = mount(
		<NoteElement note={note} />
	);

	expect(wrapper.find(".note-body-text").first().text()).toContain(note.body);
});

test('NoteElement populates timestamp correctly', () => {
	let wrapper = mount(
		<NoteElement note={note} />
	);

	expect(wrapper.find(".note-timestamp-text").first().text()).toContain(note.timeStamp);
});

test('NoteInput populates text correctly', () => {
	let wrapper = mount(
		<NoteInput text={note.body} />
	);

	expect(wrapper.find(".note-input").first().text()).toContain(note.body);
});