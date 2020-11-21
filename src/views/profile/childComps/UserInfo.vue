<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <div class="privateImage-svg left">
          <img
            class="imgs"
            src="~assets/img/profile/avatar.svg"
            alt=""
          />
        </div>
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <img
            class="icon-mobile"
            src="~assets/img/profile/phone.svg"
            alt=""
          />
          <!-- <span>
            <svg data-v-735ff1be="" fill="#fff" class="icon-mobile"><use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use></svg>
          </span> -->
          <div name="user-phone">暂无绑定手机号</div>
        </div>
      </div>
      <img src="~assets/img/common/back.svg" alt="" class="arrow-svg right">
      
    </a>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
};
</script>

<style scoped>
#user-info {
  background-color: var(--color-tint);
  padding: 15px;
}

#user-info .privateImage-svg {
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 30px;
}
.imgs {
  width: 60px;
  height: 60px;
}

.left {
  float: left;
}

#user-info .arrow-svg {
  width: 11px;
  height: 22px;
  margin-top: 18px;
-webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}

#user-info .login-info {
  width: 50%;
  color: #fff;
  margin: 10px 0 0 10px;
}

#user-info .login-info .phone {
  position: relative;

  font-size: 13px;
  margin-top: 5px;
  margin-left: 15px;
  font-weight: 300;
}
.phone img {
  width: 18px;
  height: 18px;
}

#user-info .login-info .phone .icon-mobile {
  position: absolute;
  width: 12px;
  height: 18px;
  left: -15px;
  top: 0px;
}
</style>
