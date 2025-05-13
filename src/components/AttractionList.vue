<template>
    <up-waterfall v-model="list" class="container">
        <template v-slot:left="{ leftList }">
            <view class="left-side">
                <view v-for="attr in leftList" :key="attr.id" class="card" @click="goDetail(attr)">
                    <image :src="attr.img" mode="widthFix" lazy-load />
                    <view class="title">{{ attr.title }}</view>
                    <view class="times">{{ attr.times }}</view>
                    <view class="tag">
                        <view class="tag-one">{{ attr.tag[0] }}</view>
                        <view class="tag-two">{{ attr.tag[1] }}</view>
                    </view>
                    <view class="dot" v-if="attr.dot">{{ attr.isDot }}</view>
                </view>
            </view>
        </template>
        <template v-slot:right="{ rightList }">
            <view class="right-side">
                <view v-for="attr in rightList" :key="attr.id" class="card" @click="goDetail(attr)">
                    <image :src="attr.img" mode="widthFix" lazy-load />
                    <view class="title">{{ attr.title }}</view>
                    <view class="times">{{ attr.times }}</view>
                    <view class="tag">
                        <view class="tag-one">{{ attr.tag[0] }}</view>
                        <view class="tag-two">{{ attr.tag[1] }}</view>
                    </view>
                    <view class="dot" v-if="attr.dot">{{ attr.isDot }}</view>
                </view>
            </view>
        </template>
    </up-waterfall>
</template>

<script setup lang="ts">
import type { Attraction } from '@/composables/useAttraction';

interface Props {
    list: Attraction[]
}

defineProps<Props>()

const goDetail = (attr: Attraction) => {
    uni.navigateTo({ url: `/pages/detail/index?item=${encodeURIComponent(JSON.stringify(attr))}` })
}
</script>

<style scoped lang="scss">
.left-side {
    margin-right: 15rpx;
}

.card {
    position: relative;
    background-color: #fff;
    margin-bottom: 15rpx;
    border-radius: 15rpx;
    padding: 15rpx;

    image {
        width: 100%;
        border-radius: 10rpx;
    }
}

.title {
    margin-top: 10rpx;
    font-size: 30rpx;
    color: #303133;
}

.times {
    margin-top: 10rpx;
    font-size: 24rpx;
    color: #777
}

.tag {
    display: flex;
    margin-top: 10rpx;
    font-size: 20rpx;


    .tag-one {
        padding: 4rpx 14rpx;
        border-radius: 50rpx;
        color: #ffaa00;
        border: 1px solid #ffaa00;
        margin-right: 20rpx;
    }

    .tag-two {
        padding: 4rpx 14rpx;
        border-radius: 50rpx;
        color: #00aaff;
        border: 1px solid #00aaff;
    }
}

.dot {
    position: absolute;
    top: 20rpx;
    right: 20rpx;
    font-size: 24rpx;
    color: #fff;
    line-height: 32rpx;
    background-color: #ff0000;
    padding: 4rpx 10rpx;
    border-radius: 10rpx;
}

.toTop {
    position: fixed;
    bottom: 120rpx;
    right: 30rpx;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20rpx;
    border-radius: 50rpx;
}
</style>