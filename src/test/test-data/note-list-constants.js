/**
 * A note contains:
 * 	- an ID, which will NOT be overwritten
 * 	- a body, which will be overwritten
 * 	- a localeId, which will NOT be overwritten
 * 	- a timeStamp, which will be overwritten
 */
export const SAMPLE_NOTE_1_A = {
	id: "note-1",
	body: "here is some content",
	localeId: "Beijing.1",
	timeStamp: new Date("2020/09/22 09:14")
};

export const SAMPLE_NOTE_2_A = {
	id: "note-2",
	body: "the quick brown fox jumped over the lazy brown dog",
	localeId: "NewYork.5",
	timeStamp: new Date("2020/09/20 15:52")
}

export const SAMPLE_NOTE_3_A = {
	id: "note-6",
	body: "blah blah blah",
	localeId: "1",
	timeStamp: new Date("2016/07/30 20:00")
}

export const SAMPLE_NOTE_4_A = {
	id: "note-7",
	body: "blah BLAH blah",
	localeId: "1",
	timeStamp: new Date("2020/03/16 13:00")
}

export const SAMPLE_NOTE_1_B = {
	id: "note-1",
	body: "Some different content this time.",
	localeId: "foo",
	timeStamp: "2020/09/30 10:00 GMT +12:00"
}

export const SAMPLE_NOTE_2_B = {
	id: "note-2",
	body: "hi!",
	localeId: "bye!",
	timeStamp: "2015/06/17 14:41 GMT -5:00"
}

export const SAMPLE_NOTE_3_B = {
	id: "note-6",
	body: "blah blah blah",
	localeId: "1",
	timeStamp: "2016/07/30 20:00 GMT -6:00"
}

export const SAMPLE_NOTE_4_B = {
	id: "note-7",
	body: "body!",
	localeId: "localeId!",
	timeStamp: "timestamp!"
}

export const MERGED_1_AB = {
	id: "note-1",
	body: "Some different content this time.",
	localeId: "Beijing.1",
	timeStamp: "2020/09/30 10:00 GMT +12:00"
}

export const MERGED_2_AB = {
	id: "note-2",
	body: "hi!",
	localeId: "NewYork.5",
	timeStamp: "2015/06/17 14:41 GMT -5:00"
}

export const MERGED_3_AB = {
	id: "note-6",
	body: "blah blah blah",
	localeId: "1",
	timeStamp: "2016/07/30 20:00 GMT -6:00"
}

export const MERGED_4_AB = {
	id: "note-7",
	body: "body!",
	localeId: "1",
	timeStamp: "timestamp!"
}