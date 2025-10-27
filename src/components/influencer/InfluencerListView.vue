<template>
  <div class="filter-wrapper">
    <div class="filter-header">
      <div class="filter-icon">
        <div class="filter-box"></div>
      </div>
      <div class="filter-title">필터 및 검색</div>
    </div>

    <div class="filter-body">
      <div class="search-bar">
        <div class="search-icon">
          <div class="search-inner"></div>
          <div class="search-circle"></div>
        </div>
        <div class="search-placeholder">
          신청자 이름, 인스타그램 계정으로 검색...
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-wrapper {
  width: 1259px;
  height: 126px;
  position: relative;
}

/* 헤더 부분 */
.filter-header {
  width: 1320.67px;
  height: 24px;
  position: absolute;
  left: 24.67px;
  top: 24.67px;
  display: flex;
  align-items: center;
}

.filter-icon {
  width: 20px;
  height: 20px;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 8px;
}

.filter-box {
  width: 16.66px;
  height: 15.83px;
  border: 1.67px solid #6A7282;
  border-radius: 2px;
  margin-top: 2.5px;
  margin-left: 1.67px;
}

.filter-title {
  color: #0A0A0A;
  font-size: 16px;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 24px;
}

/* 검색창 부분 */
.filter-body {
  width: 1271.32px;
  height: 36px;
  position: absolute;
  left: 24.67px;
  top: 64.67px;
}

.search-bar {
  width: 1212px;
  height: 36px;
  background: #F3F3F5;
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 40px;
  font-family: Arial, sans-serif;
}

.search-icon {
  width: 16px;
  height: 16px;
  position: absolute;
  left: 12px;
  top: 10px;
}

.search-inner {
  width: 10.67px;
  height: 10.67px;
  border: 1.33px solid #99A1AF;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
}

.search-circle {
  width: 2.89px;
  height: 2.89px;
  border: 1.33px solid #99A1AF;
  position: absolute;
  left: 11.11px;
  top: 11.11px;
  transform: rotate(45deg);
}

.search-placeholder {
  color: rgba(10, 10, 10, 0.5);
  font-size: 14px;
  line-height: 20px;
}
</style>