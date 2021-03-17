<template>
    <div class="flex justify-between m-6">
        <p class="text-xs font-semibold text-gray-600">{{title}}</p>
        <div class="flex">
        </div>
    </div>
</template>
<script>

    const title = _.get(process, 'env.SHOP_TITLE', '');
    export default {
        components: {},
        data() {
            return {
                title
            }
        }
    }
</script>

<style>
    .emoji {
        font-size: 30px;
    }
</style>
