<template>
    <div class="board">
        <div class="threads">
            <span v-show="loading">loading...</span>
            <span v-if="!loading && !hasThreads">no threads found</span>
            <div v-for="(thread, key) in threads" :key="key">
                <thread :thread="thread" :on-board="true"/>
                <hr v-if="key < threads.length - 1">
            </div>
        </div>
        <div class="page-links">
            <navigation :links="pageLinks" exact/>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { Page } from '../models/page_pb';
    import { uri } from '../cfg/server.json';

    export default {
        props: ['board', 'page'],
        data() {
            return {
                pageRes: null,
            }
        },
        computed: {
            loading() { return this.pageRes === null },
            hasThreads() { return this.threads.length > 0 },
            threads() { return this.pageRes !== null ? this.pageRes.getThreadsList() : [] },
            pageLinks() {
                const links = {};
                links[1] = '/' + this.board;
                for (let i = 2; i <= 10; i++)
                    links[i] = '/' + this.board + '/' + i;
                return links;
            },
        },
        watch: {
            page() { this.load() },
            board() { this.load() },
        },
        mounted() { this.load() },
        methods: {
            load() {
                this.pageRes = null;
                axios.get(uri + '/boards/' + this.board + '/page/' + this.page, {
                    responseType: 'arraybuffer',
                }).then(response => this.pageRes = Page.deserializeBinary(response.data));
            },
        },
    };
</script>
