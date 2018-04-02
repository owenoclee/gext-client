<template>
    <div v-if="originalPost" class="thread">
        <post :post="originalPost"/>
        <p v-if="onBoard && hasHiddenPosts" class="collapsed-text">
            <a href="#" @click.prevent="isCollapsed = !isCollapsed" v-text="isCollapsed ? '[+]' : '[-]'"/>
            <span v-if="onBoard" v-text="collapseText"/>
        </p>
        <post v-for="post in hiddenPosts" v-show="!onBoard || !isCollapsed" :key="post.getId()" :post="post"/>
        <post v-for="post in recentPosts" :key="post.getId()" :post="post"/>

        <form v-if="!onBoard" @submit.prevent="submit">
            <textarea v-model="message" placeholder="Message" rows="4" maxlength="4000"/>
            <input type="submit" value="Submit">
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    import { ThreadResponse } from '../network/thread_response_pb';
    import { PostRequest } from '../network/post_request_pb';
    import { uri } from '../cfg/server.json';

    export default {
        props: ['thread', 'onBoard'],
        data() {
            return {
                posts: [],
                message: '',
                isCollapsed: true,
            }
        },
        computed: {
            originalPost() { return this.posts[0] },
            hiddenPosts() { return this.posts.slice(1, Math.max(1, this.posts.length - 5)) },
            recentPosts() { return this.posts.slice(Math.max(1, this.posts.length - 5)) },
            hasHiddenPosts() { return this.hiddenPosts.length > 0 },
            collapseText() {
                if (this.isCollapsed)
                    return this.hiddenPosts.length + ' replies omitted.';
                return 'showing all replies';
            },
        },
        mounted() {
            if (typeof this.thread === 'object')
                this.posts = this.normalizePosts(this.thread.getPostsList());
            else
                this.getThread(this.thread);
        },
        methods: {
            getThread(threadID) {
                axios.get(uri + '/threads/' + threadID, {
                    responseType: 'arraybuffer',
                }).then(response => {
                    const posts = ThreadResponse.deserializeBinary(response.data).getPostsList();
                    this.posts = this.normalizePosts(posts);
                });
            },
            normalizePosts(posts) {
                posts.forEach(post => post.setBoard(posts[0].getBoard()));
                return posts;
            },
            submit() {
                if (this.message !== '') {
                    const post = new PostRequest();
                    post.setReplyTo(this.originalPost.getId());
                    post.setBody(this.message);

                    axios.post(uri + '/posts', post.serializeBinary(), {
                        responseType: 'arraybuffer',
                        headers: {'Content-Type': 'application/vnd.google.protobuf'},
                    }).then(response => {
                        this.$router.push(response.headers.location);
                        this.getThread(this.originalPost.getId());
                    });

                    this.message = '';
                }
            },
        },
    };
</script>
