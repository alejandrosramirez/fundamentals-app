<template>
	<h2>{{ customTitle }}</h2>

	<p>{{ counter }} <sup>2</sup> = {{ squareCounter }}</p>

	<div>
		<button @click="increment">+1</button>
		<button @click="decrement">-1</button>
	</div>
</template>

<script>
export default {
	name: "Counter",
	props: {
		title: String,
		start: {
			type: Number,
			// required: true,
			default: 0,
			validator(value) {
				return value >= 0;
			}
		},
	},
	data() {
		return {
			counter: this.start,
		};
	},
	methods: {
		increment() {
			this.counter++;
		},
		decrement() {
			if (this.counter <= 0) {
				return;
			}
			this.counter--;
		},
	},
	computed: {
		squareCounter() {
			return this.counter * this.counter;
		},
		customTitle() {
			return this.title || "Counter";
		},
	},
};
</script>

<style scoped>
button {
	background-color: #64BB87;
	border-radius: 10px;
	border: 1px solid white;
	color: white;
	cursor: pointer;
	margin: 0 5px;
	padding: 5px 15px;
	transition: 0.3s ease-in-out;
}

button:hover {
	background-color: #5AA67B;
	transition: 0.3s ease-in-out;
}
</style>
