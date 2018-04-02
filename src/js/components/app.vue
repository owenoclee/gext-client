<template>
    <div class="container">
        <div id="app">
            <div class="top-navigation">
                <navigation :links="boards"/>
                <span class="navigation">
                    [
                    <span class="navigation-item">
                        <a href="#" @click.prevent="toggleCreateThread" v-text="createThreadLink"/>
                    </span>
                    ]
                </span>
            </div>
            <start-thread v-show="createThread"/>
            <router-view/>
        </div>
    </div>
</template>

<script>
    import { boards } from '../cfg/boards.json';

    export default {
        data() {
            return {
                boards,
                createThread: false,
            }
        },
        computed: {
            createThreadLink() { return this.createThread ? 'cancel' : 'start thread' },
        },
        mounted() { this.$router.afterEach(() => this.createThread = false) },
        methods: {
            toggleCreateThread() { this.createThread = !this.createThread },
        },
    };
</script>
