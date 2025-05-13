<template>
  <view class="detail">
    <up-navbar auto-back left-icon-color="#fff" bg-color="#00000000"></up-navbar>
    <image :src="attraction.img" mode="scaleToFill" class="img" />
    <view class="container">
      <view class="title-container">
        <text class="title">{{ attraction.title }}</text>
        <up-tag text="5A级景区" size="mini" shape="circle"></up-tag>
      </view>
      <view class="introduce">
        <text class="heading">景区介绍：</text>
        <text class="content">{{ attraction.introduce }}</text>
      </view>
      <view class="time">
        <text class="heading">开放时间：</text>
        <text class="content">{{ attraction.times }}</text>
      </view>
      <view class="recommond">
        <view class="sub-title">游玩推荐</view>
        <view class="list">
          <view class="item" v-for="project in projectList" :key="project.id" @click="goPosition(project.id)">
            <image :src="project.url" mode="scaleToFill" />
            <view class="tag">
              {{ project.tag }}
            </view>
            <view class="info">
              <view class="title">{{ project.title }}</view>
              <view class="desc">
                <up-icon name="map" color="#9c9c9c" size="16"></up-icon>
                <text class="text">{{ project.desc }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { Attraction } from '@/composables/useAttraction';
import useProject from '@/composables/useProject';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

const attraction = ref<Attraction>({} as Attraction)
const { projectList } = useProject()

onLoad((props) => {
  attraction.value = JSON.parse(decodeURIComponent(props?.item))
})

const goPosition = (id: number) => {
  uni.navigateTo({ url: `/pages/location/index?id=${id}` })
}
</script>

<style lang="scss" scoped>
.img {
  width: 100%;
  height: 600rpx;
}

.container {
  padding: 35rpx 30rpx;
  margin-top: -100rpx;
  background-color: #fff;
  border-radius: 30rpx 30rpx 0 0;
  position: relative;
  z-index: 99;

  .title-container {
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;

    .title {
      font-size: 36rpx;
      font-weight: 700;
      color: #111;
      margin-right: 10px;
    }
  }

  .introduce {
    margin-bottom: 15rpx;
  }

  .time {
    margin-bottom: 35rpx;
  }

  .heading {
    font-size: 14px;
    font-weight: 700;
  }

  .content {
    font-size: 26rpx;
    color: #8a8a8a;
    line-height: 40rpx;
  }

  .sub-title {
    font-size: 34rpx;
    font-weight: 700;
    margin-bottom: 20rpx;
  }
}

.list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;

  .item {
    margin-bottom: 20rpx;
    box-shadow: 1px 2px 3px #e5e5e5;
    border-radius: 20rpx 20rpx 0 0;
    overflow: hidden;
    position: relative;

    image {
      width: 100%;
      height: 200rpx;
    }

    .tag {
      position: absolute;
      top: 0;
      left: 0;
      border-bottom-right-radius: 20rpx;
      background-color: #ffaa7f;
      color: #fff;
      font-size: 22rpx;
      padding: 5rpx 20rpx;
    }

    .info {
      padding: 10rpx 15rpx;

      .title {
        font-size: 28rpx;
        font-weight: 700;
        color: #111;
        margin-bottom: 15rpx;
        text-overflow: ellipsis;
      }

      .desc {
        display: flex;
        align-items: center;

        .text {
          font-size: 26rpx;
          color: #8a8a8a;
        }
      }
    }
  }
}
</style>