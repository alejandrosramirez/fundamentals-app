import { shallowMount } from "@vue/test-utils";

import Indecision from "@/components/Indecision.vue";

describe("Pruebas en <Indecision />", () => {
	let wrapper;
	let clgSpy;
	global.fetch = jest.fn(() => Promise.resolve({
		json: () => Promise.resolve({
			answer: "yes",
			forced: false,
			image: "https://yesno.wtf/assets/yes/2.gif",
		}),
	}));

	beforeEach(() => {
		wrapper = shallowMount(Indecision);
		clgSpy = jest.spyOn(console, "log");
		jest.clearAllMocks();
	});

	test("Debe de hacer match con el snapshot", () => {
		expect(wrapper.html()).toMatchSnapshot();
	});

	test("Debe de no disparar nada al escribir en el input (console.log)", async () => {
		const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");
		const input = wrapper.find("input");
		await input.setValue("Hola mundo");
		expect(clgSpy).toHaveBeenCalledTimes(1);
		expect(getAnswerSpy).not.toHaveBeenCalled();
	});

	test("Debe de disparar la acción al escribir en el input con '?'", async () => {
		const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");
		const input = wrapper.find("input");
		await input.setValue("Hola mundo?");
		expect(getAnswerSpy).toHaveBeenCalledTimes(1);
	});

	test("Debe de retornar una respuesta (getAnswer)", async () => {
		await wrapper.vm.getAnswer();
		const image = wrapper.find("img");
		expect(image.exists()).toBeTruthy();
		expect(wrapper.vm.image).toBe("https://yesno.wtf/assets/yes/2.gif");
		expect(wrapper.vm.answer).toBe("Si!");
	});

	test("Debe de retornar un fallo (getAnswer)", async () => {
		fetch.mockImplementationOnce(() => Promise.reject("Error"));
		await wrapper.vm.getAnswer();
		const image = wrapper.find("img");
		expect(image.exists()).toBeFalsy();
		expect(wrapper.vm.answer).toBe("Error");
	});
});
