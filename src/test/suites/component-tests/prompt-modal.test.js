import React from "react";
import { mount, shallow, configure } from "enzyme";
import { noop } from "lodash";
import Adapter from "enzyme-adapter-react-16";
import PromptModal from "../../../components/prompt-modal";

configure({ adapter: new Adapter() });

const text = "Here is some text.";
const header = "Here is a header.";

test('Prompt modal loads', () => {
	let wrapper = mount(
		<PromptModal text={text} header={header} onCancel={noop} onConfirm={noop}  />
	);

	expect(wrapper).toMatchSnapshot();
});

test('Prompt modal populates header correctly', () => {
	let wrapper = mount(
		<PromptModal text={text} header={header} onCancel={noop} onConfirm={noop} />
	);

	expect(wrapper.find("h2").first().text()).toEqual(header);
});

test('Prompt modal populates body correctly', () => {
	let wrapper = mount(
		<PromptModal text={text} header={header} onCancel={noop} onConfirm={noop} />
	);

	expect(wrapper.find(".body-text").first().text()).toEqual(text);
});

test('Prompt modal populates confirm button correctly', () => {
	let wrapper = mount(
		<PromptModal text={text} header={header} onCancel={noop} onConfirm={noop} />
	);

	expect(wrapper.find(".confirm-button").first().props().onClick).toEqual(noop);
});

test('Prompt modal populates cancel button correctly', () => {
	let wrapper = mount(
		<PromptModal text={text} header={header} onCancel={noop} onConfirm={noop} />
	);

	expect(wrapper.find(".cancel-button").first().props().onClick).toEqual(noop);
});