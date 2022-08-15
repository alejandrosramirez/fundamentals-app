describe("Pruebas en example", () => {
	test("Debe de ser mayor a 10", () => {
		let value = 10;

		value = value + 2;

		expect(value).toBeGreaterThan(10);
	});
});
