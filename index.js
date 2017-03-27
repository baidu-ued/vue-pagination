(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global.VuePagination = factory());
}(this, (function() {
	'use strict';
	return {
		template: `<div>
		    <a @click="select(1)" :class="[pageItemClass, {disabled:activePage == 1}]">first</a>
		    <a @click="select(activePage - 1)" :class="[pageItemClass, {disabled:activePage == 1}]">prev</a>
		    <a @click="select(i)" :class="[pageItemClass, {actived : activePage == i }]" v-for="(i, index) in list">{{i}}</a>
		    <a @click="select(activePage + 1)" :class="[pageItemClass, {disabled:activePage == pageLength}]">next</a>
		    <a @click="select(pageLength)" :class="[pageItemClass, {disabled:activePage == pageLength}]">last</a>
		</div>`,
		props: {
			pageItemClass: {
				type: String,
				required: false
			},
			pageLength: {
				type: Number,
				required: true,
				default: 1
			},
			activePage: {
				type: Number,
				required: true,
				default: 1
			},
			pageSize: {
				type: [Number, String],
				required: true,
				default: 5
			}
		},
		computed: {
			halfSize: function() {
				return parseInt(this.pageSize / 2);
			},
			list: function() {
				var me = this;
				if (this.activePage <= this.halfSize) {
					return Array.from({ length: this.pageSize > this.pageLength ? this.pageLength : this.pageSize }, (v, k) => { return k + 1 });
				} else if (this.activePage >= this.pageLength - this.halfSize) {
					return Array.from({ length: this.pageSize > this.pageLength ? this.pageLength : this.pageSize }, (v, k) => { return ((this.pageLength - this.pageSize) > 0 ? (this.pageLength - this.pageSize) : 0) + (k + 1) });
				} else {
					return Array.from({ length: this.pageSize > this.pageLength ? this.pageLength : this.pageSize }, (v, k) => {
						return this.activePage + k - this.halfSize;
					});
				}
			}
		},
		methods: {
			select: function(index) {
				if (index != this.activePage && index >= 1 && index <= this.pageLength) {
					this.$emit('change', index)
				}
			}
		}
	}
})));
