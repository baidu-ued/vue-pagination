(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global.VuePagination = factory());
}(this, (function() {
    'use strict';
    return {
        template: `<div :class="wrapperClass">
			<ul>
				<li :class="[pageItemClass, {disabled:activePage == 1}]"><a @click="select(1)" href="javascript:void(0);">首页</a></li>
				<li :class="[prevItemClass, pageItemClass, {disabled:activePage == 1}]"><a @click="select(activePage - 1)" href="javascript:void(0);">‹</a></li>
				<li :class="[pageItemClass, {active : activePage == i }]" v-for="(i, index) in pageList"><a @click="select(i)" href="javascript:void(0);">{{i}}</a></li>
				<li :class="[nextItemClass, pageItemClass, {disabled:activePage == pageNum}]"><a @click="select(activePage + 1)"  href="javascript:void(0);">›</a></li>
				<li :class="[pageItemClass, {disabled:activePage == pageNum}]"><a @click="select(pageNum)" href="javascript:void(0);">尾页</a></li>
			</ul>
			<div class="select-page">
				<span>到</span>
				<input class="vue-pagination-ipt" type='text' :value="activePage">
				<span>页</span>
				<a @click="_select(pageNum)" href="javascript:void(0);">确定</a>
			</div>
		</div>`,
        props: {
            wrapperClass: {
                type: String,
                required: false,
                default: 'vue-pagination-container'
            },
            prevItemClass: {
                type: String,
                required: false,
                default: 'vue-pagination-prev'
            },
            nextItemClass: {
                type: String,
                required: false,
                default: 'vue-pagination-next'
            },
            pageItemClass: {
                type: String,
                required: false,
                default: 'vue-pagination-item'
            },
            pageNum: {
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
                required: false,
                default: 5
            },
            cacheList: {
                type: Array
            },
            types: {
                type: String,
                default: 'none'
            }
        },
        computed: {
            halfSize: function() {
                return parseInt(this.pageSize / 2);
            },
            pageList: function() {
                var me = this;
                if (this.activePage <= this.halfSize) {
                    return Array.from({ length: this.pageSize > this.pageNum ? this.pageNum : this.pageSize }, (v, k) => {
                        return k + 1
                    });
                } else if (this.activePage >= this.pageNum - this.halfSize) {
                    return Array.from({ length: this.pageSize > this.pageNum ? this.pageNum : this.pageSize }, (v, k) => {
                        return ((this.pageNum - this.pageSize) > 0 ? (this.pageNum - this.pageSize) : 0) + (k + 1)
                    });
                } else {
                    return Array.from({ length: this.pageSize > this.pageNum ? this.pageNum : this.pageSize }, (v, k) => {
                        return this.activePage + k - this.halfSize;
                    });
                }
            }
        },
        data: function() {
            return {
                cache: {}
            }
        },
        watch: {
            cacheList: function() {
                if (!this.cache[this.types]) {
                    this.cache[this.types] = {};
                }
                this.cache[this.types][this.activePage] = this.cacheList;
            }
        },
        methods: {
            _select: function(value) {
                var a = document.querySelector('.' + this.wrapperClass + ' .vue-pagination-ipt').value;
                this.$emit('change', parseInt(a));
            },
            select: function(index) {
                if (index != this.activePage && index >= 1 && index <= this.pageNum) {
                    this.$emit('change', index)
                }
            },
            getCache: function() {
                return (this.cache[this.types] && this.cache[this.types][this.activePage]) || undefined
            }
        }
    }

})));
