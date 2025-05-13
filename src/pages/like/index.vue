<template>
    <view class="list">
        <AttractionList :list="likeList"></AttractionList>
    </view>
</template>

<script lang="ts" setup>
import AttractionList from '@/components/AttractionList.vue';
import useLike from '@/composables/useLike';

const { likeList } = useLike()
</script>

<style>
page {
    background-color: #f0f0f0;
}
</style>

<style scoped lang="scss">
.list {
    padding: 15rpx 20rpx 0;
}
</style>