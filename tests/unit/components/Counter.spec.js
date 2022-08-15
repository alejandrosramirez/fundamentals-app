import { shallowMount } from "@vue/test-utils";

import Counter from "@/components/Counter.vue";

describe("Pruebas en <Counter />", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallowMount(Counter);
	});

	test("Debe de hacer match con el snapshot", () => {
		expect(wrapper.html()).toMatchSnapshot();
	});

	test("Debe de tener el valor por defecto", () => {
		expect(wrapper.find("h2").exists()).toBeTruthy();
		const h2Value = wrapper.find("h2").text();
		expect(h2Value).toBe("Counter");
	});

	test("Debe de tener el valor por defecto de 0 en la etiqueta de párrafo <p>", () => {
		const value = wrapper.find("p[data-testid='counter']").text();
		expect(value).toBe("100");
	});

	test("Debe incrementar en 1 el contador", async () => {
		const [incrementButton] = wrapper.findAll("button");
		await incrementButton.trigger("click");
		const value = wrapper.find("p[data-testid='counter']").text();
		expect(value).toBe("101");
	});

	test("Debe de decrementar en 2 el contador", async () => {
		const [, decrementButton] = wrapper.findAll("button");
		await decrementButton.trigger("click");
		await decrementButton.trigger("click");
		const value = wrapper.find("p[data-testid='counter']").text();
		expect(value).toBe("98");
	});

	test("Debe de establecer el valor por defecto", () => {
		const { start } = wrapper.props();
		const value = wrapper.find("p[data-testid='counter']").text();
		expect(Number (value)).toBe(start);
	});
});
