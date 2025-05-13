<template>
  <view class="container">
    <view class="header">
      <view class="function">
        <view class="left-side">
          <uni-icons type="calendar" color="#fff" size="30" />
          <view class="text">签到</view>
        </view>
        <view class="right-side">
          <uni-icons type="gear" color="#fff" size="30" />
          <uni-icons type="chat" color="#fff" size="30" />
        </view>
      </view>
      <view class="user">
        <view class="info">
          <template v-if="!userInfo.nickName">
            <image src="../../static/tt.jpg" mode="aspectFill" />
            <view class="name" @click="handleLogin">注册 / 登录</view>
          </template>
          <template v-else>
            <image :src="userInfo.avatarUrl" mode="aspectFill" />
            <view class="name">{{ userInfo.nickName }}</view>
          </template>
        </view>
        <view class="count">
          <view class="item">
            <view class="number">1</view>
            <view class="title">点赞</view>
          </view>
          <view class="item">
            <view class="number">2</view>
            <view class="title">喜欢</view>
          </view>
          <view class="item">
            <view class="number">3</view>
            <view class="title">浏览</view>
          </view>
          <view class="item">
            <view class="number">4</view>
            <view class="title">收藏</view>
          </view>
        </view>
      </view>
    </view>
    <view class="list">
      <uni-list>
        <uni-list-item show-extra-icon :extra-icon="{ ...extraIconStyle, type: 'auth' }" showArrow title="个人信息"
          clickable></uni-list-item>
        <uni-list-item show-extra-icon :extra-icon="{ ...extraIconStyle, type: 'cart' }" showArrow title="我的购物车"
          clickable></uni-list-item>
        <uni-list-item show-extra-icon :extra-icon="{ ...extraIconStyle, type: 'chatboxes' }" showArrow title="用户反馈"
          clickable></uni-list-item>
        <uni-list-item show-extra-icon :extra-icon="{ ...extraIconStyle, type: 'email' }" showArrow title="我的邮件"
          clickable></uni-list-item>
        <uni-list-item show-extra-icon :extra-icon="{ ...extraIconStyle, type: 'gift' }" showArrow title="分享有礼"
          clickable></uni-list-item>
      </uni-list>
    </view>
    <up-popup v-model:show="isShow" closeable round="20">
      <view class="popup">
        <view class="title">获取您的头像、昵称</view>
        <view class="flex">
          <view class="label">用户头像：</view>
          <button class="avatar" open-type="chooseAvatar" @chooseavatar="handleAvatar">
            <image :src="formValue.avatarUrl ? formValue.avatarUrl : userInfo.avatarUrl" mode="scaleToFill" />
          </button>
        </view>
        <view class="flex">
          <view class="label">用户昵称：</view>
          <input type="nickname" v-model="formValue.nickName" />
        </view>
        <button type="primary" @click="handleSubmit">确定</button>
      </view>
    </up-popup>
  </view>
</template>

<script lang="ts" setup>
import useLogin from '@/composables/useLogin';
import useUserInfo, { type UserInfo } from '@/composables/useUserInfo';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

const { token, login } = useLogin()
const { userInfo, getUserInfo } = useUserInfo()
const isShow = ref(false)
const formValue = ref<UserInfo>({} as UserInfo)

onLoad(() => {
  if (uni.getStorageSync('token')) {
    userInfo.value = JSON.parse(uni.getStorageSync('userInfo'))
  }
})

const handleLogin = () => {
  uni.showModal({
    title: '温馨提示',
    content: '请点击确认后进行登录',
    success: (res) => {
      if (res.confirm) {
        uni.login({
          success: async (res) => {
            // 请求登录，返回用户信息和 token
            await login(res.code)
            uni.setStorageSync('token', token.value)
            await getUserInfo()
            uni.setStorageSync('userInfo', JSON.stringify(userInfo.value))
            isShow.value = true
          },
        })
      }
    }
  })
}
const handleAvatar = (e) => {
  formValue.value.avatarUrl = e.detail.avatarUrl
}
const handleSubmit = () => {
  // 请求修改用户信息，返回新的用户信息
  userInfo.value = formValue.value
  uni.setStorageSync('userInfo', JSON.stringify(userInfo.value))
  isShow.value = false
}

const extraIconStyle = {
  color: '#666666',
  size: '22'
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background-color: #f5f5f5;
}

.header {
  position: relative;
  z-index: 1;
  overflow: hidden;
  padding: 30rpx 20rpx 15rpx;

  &::after {
    content: "";
    width: 140%;
    height: 400rpx;
    position: absolute;
    top: 0;
    left: -20%;
    z-index: -1;
    background-color: #00aaff;
    border-radius: 0 0 50% 50%;
  }
}

.function {
  display: flex;
  justify-content: space-between;

  .left-side {
    display: flex;
    align-items: center;

    uni-icons {
      margin-right: 15rpx;
    }

    .text {
      color: #fff;
      font-size: 30rpx;
    }
  }

  .right-side {
    display: flex;
    gap: 15rpx;
  }
}

.user {
  margin-top: 30rpx;
  padding: 20rpx 30rpx;
  background-color: #fff;
  box-shadow: 1px 10rpx 20rpx #ececec;
  border-radius: 16rpx;

  .info {
    display: flex;
    align-items: center;
    padding: 30rpx 0 0 30rpx;

    image {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      margin-right: 35rpx;
      object-position: center;
    }

    .name {
      font-size: 35rpx;
      font-weight: 700;
      color: #333;
    }
  }

  .count {
    display: flex;
    justify-content: space-around;
    margin-top: 40rpx;
    padding-bottom: 30rpx;

    .item {
      text-align: center;

      .number {
        color: #000;
        font-size: 35rpx;
        font-weight: 700;
      }

      .title {
        color: #757575;
        font-size: 28rpx;
        margin-top: 10rpx;
      }
    }
  }
}

.popup {
  padding: 20rpx;

  .title {
    font-size: 35rpx;
    text-align: center;
  }

  .flex {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
    padding: 24rpx 0;
    margin-top: 20rpx;

    image {
      width: 70rpx;
      height: 70rpx;
    }

    .avatar {
      border-radius: 10rpx;
      width: 70rpx;
      height: 70rpx;
      margin-left: 20rpx;
      padding: 0;
    }
  }
}

.list {
  padding: 20rpx;
}
</style>