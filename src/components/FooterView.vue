<template>

  <div :class="$style.footer">

    <div :class="$style.fashionManager">FASHION MANAGER</div>

    <div :class="$style.parent">

      <div :class="$style.div">소개</div>

      <div :class="$style.footerDiv">커뮤니티</div>

      <div :class="$style.div2">가이드라인</div>

      <div :class="$style.div3">문의</div>

    </div>

    <div :class="$style.fashionManagerProject">© 2025 Fashion Manager Project. All rights reserved.</div>

  </div>

</template>

<style  module>.footer {

  width: 100%;

  height: 154px;

  position: relative;

  background-color: #000;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: flex-end;

  padding: 0px 138px;

  box-sizing: border-box;

  gap: 10px;

  text-align: center;

  font-size: 16px;

  color: #fff;

  font-family: Arimo;

}

  .fashionManager {

    width: 75.56%;

    height: 24px;

    position: absolute;

    margin: 0 !important;

    top: calc(50% - 52px);

    left: 11.32%;

    line-height: 24px;

    display: inline-block;

    z-index: 0;

  }

  .parent {

    width: 21.47%;

    height: 24px;

    position: absolute;

    margin: 0 !important;

    top: calc(50% - 7px);

    right: 39.26%;

    left: 39.26%;

    z-index: 1;

    color: #99a1af;

  }

  .div {

    position: absolute;

    width: 8.57%;

    top: calc(50% - 12px);

    left: 0%;

    line-height: 24px;

    display: flex;

    align-items: center;

    justify-content: center;

  }

  .footerDiv {

    position: absolute;

    width: 16.86%;

    top: calc(50% - 12px);

    left: 23.43%;

    line-height: 24px;

    display: flex;

    align-items: center;

    justify-content: center;

  }

  .div2 {

    position: absolute;

    width: 21.14%;

    top: calc(50% - 12px);

    left: 55.43%;

    line-height: 24px;

    display: flex;

    align-items: center;

    justify-content: center;

  }

  .div3 {

    position: absolute;

    width: 8.57%;

    top: calc(50% - 12px);

    left: 91.43%;

    line-height: 24px;

    display: flex;

    align-items: center;

    justify-content: center;

  }

  .fashionManagerProject {

    width: 1164px;

    height: 16px;

    position: absolute;

    margin: 0 !important;

    top: calc(50% + 38px);

    left: calc(50% - 582px);

    font-size: 12px;

    line-height: 16px;

    color: #6a7282;

    display: flex;

    align-items: center;

    justify-content: center;

    z-index: 2;

  }



</style>