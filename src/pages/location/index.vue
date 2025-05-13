<template>
  <map v-if="location.id" :latitude="parseFloat(location.location[0])" :longitude="parseFloat(location.location[1])"
    :markers="location.markers" show-scale></map>
  <view class="info">
    <view class="title">
      当前游玩项目：{{ location.title }}
    </view>
    <view class="stars">
      <text>项目推荐：</text>
      <up-rate count="5" v-model="location.count" readonly></up-rate>
    </view>
    <up-scroll-list indicator indicatorColor="#fff0f0" indicatorActiveColor="#f56c6c" indicatorStyle="">
      <view class="item" v-for="item in location.other" :key="item.id">
        <image :src="item.url" mode="scaleToFill" />
        <view class="name">{{ item.name }}</view>
      </view>
    </up-scroll-list>
  </view>
</template>

<script lang="ts" setup>
import useLocation from '@/composables/useLocation';

const { location } = useLocation()
</script>

<style>
page {
  background-color: #f5f5f5;
}
</style>

<style lang="scss" scoped>
map {
  width: 750rpx;
  height: 900rpx;
}

.info {
  padding: 20rpx;

  .title {
    font-size: 34rpx;
    font-weight: 600;
    color: #333;
  }

  .stars {
    font-size: 28rpx;
    margin: 20rpx 0 30rpx;
    display: flex;
    align-items: center;
  }

  .item {
    margin-right: 20rpx;
    text-align: center;

    image {
      width: 320rpx;
      height: 200rpx;
      border-radius: 15rpx;
    }

    .name {
      font-size: 28rpx;
      font-size: 600;
      color: #333;
    }
  }
}
</style>