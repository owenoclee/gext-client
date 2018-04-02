<template>
    <span class="navigation">
        [
        <span v-for="(link, name, index) in links" :key="name" class="navigation-item">
            <router-link :to="link" :exact="exact" v-text="name"/>
            <span v-if="index < linksLength - 1" class="navigation-divider">/ </span>
        </span>
        ]
    </span>
</template>

<script>
    export default {
        props: ['links', 'exact'],
        computed: {
            linksLength() { return Object.keys(this.links).length },
        },
    };
</script>
