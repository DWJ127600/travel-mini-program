<template>
  <view class="container">
    <up-search placeholder="输入景点" v-model="searchValue" height="35" bg-color="#f8f8f8"></up-search>
    <swiper indicator-dots autoplay circular class="bannerList">
      <swiper-item v-for="(banner, index) in bannerList" :key="index">
        <image :src="banner.image" mode="aspectFill" lazy-load />
      </swiper-item>
    </swiper>
    <up-notice-bar text="项目数据仅为示例，非真实数据"></up-notice-bar>
    <view class="list">
      <AttractionList :list="attractionList" />
    </view>
    <uni-transition :show="isShow && isScroll" mode-class="fade">
      <view class="toTop" @click="toTop">
        <up-icon name="arrow-upward" color="#fff" size="28"></up-icon>
      </view>
    </uni-transition>
  </view>
</template>

<script setup lang="ts">
import AttractionList from '@/components/AttractionList.vue';
import useAttractionList from '@/composables/useAttraction';
import useBanner from '@/composables/useBanner';
import { onReachBottom, onPageScroll } from '@dcloudio/uni-app';
import { ref } from 'vue'


const searchValue = ref('')
const { bannerList } = useBanner()
const { attractionList } = useAttractionList()
const isShow = ref(false)
const isScroll = ref(false)
let scrollTimer: number | null = null

const addRandomAttr = () => {
  for (let i = 0; i < 10; i++) {
    const index = uni.$u.random(0, attractionList.value.length - 1)
    const item = JSON.parse(JSON.stringify(attractionList.value[index]))
    item.id = uni.$u.guid()
    attractionList.value.push(item)
  }
}
onReachBottom(() => {
  setTimeout(() => {
    addRandomAttr()
  }, 300)
})
onPageScroll((e) => {
  if (e.scrollTop > 600) {
    isShow.value = true
  } else {
    isShow.value = false
  }
  if (scrollTimer) clearTimeout(scrollTimer)
  isScroll.value = true
  scrollTimer = setTimeout(() => {
    isScroll.value = false
  }, 1000)
})
const toTop = () => {
  uni.pageScrollTo({ scrollTop: 0, duration: 300 })
}
</script>

<style>
page {
  background-color: #f0f0f0;
}
</style>

<style scoped lang="scss">
.container {
  padding: 0 20rpx;

  .u-search {
    padding-top: 15rpx;
  }

  swiper {
    margin-top: 20rpx;
  }

  .u-notice-bar {
    margin-top: 15rpx;
  }
}

image {
  object-position: center;
}

.bannerList {
  height: 380rpx;

  image {
    width: 100%;
    height: 100%;
  }
}

.list {
  margin-top: 15rpx;
}
</style>
