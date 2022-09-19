<template>
  <div class="main">
    <div class="wrapper">
      <div class="left-col">
        <div class="status-wrapper">
          <div class="status-card">
            <div class="profile-pic"><img src="img/cover 1.png" alt="" /></div>
            <p class="username">user_name_1</p>
          </div>
          <div class="status-card">
            <div class="profile-pic"><img src="img/cover 2.png" alt="" /></div>
            <p class="username">user_name_2</p>
          </div>
          <div class="status-card">
            <div class="profile-pic"><img src="img/cover 3.png" alt="" /></div>
            <p class="username">user_name_3</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main{
    width: 100%;
    padding: 40px 0;
    display: flex;
    justify-content: center;
    margin-top: 50px;
}

.wrapper{
    width: 70%;
    max-width: 1000px;
    display: grid;
    grid-template-columns: 60% 40%;
    grid-gap: 30px;
}

.left-col{
    display: flex;
    flex-direction: column;
}

.status-wrapper{
    width: 100%;
    height: 120px;
    background: #fff;
    border: 1px solid #dfdfdf;
    border-radius: 2px;
    padding: 10px;
    padding-right: 0;
    display: flex;
    align-items: center;
    overflow: hidden;
    overflow-x: auto;
}

.status-wrapper::-webkit-scrollbar{
    display: none;
}

.status-card{
    flex: 0 0 auto;
    width: 80px;
    max-width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 15px;
}

.profile-pic{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    padding: 3px;
    background: linear-gradient(45deg, #ffd7d7, #f34642  80%);
}

.profile-pic img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid #fff;
}

.username{
    width: 100%;
    overflow: hidden;
    text-align: center;
    font-size: 12px;
    margin-top:5px;
    color: rgba(0, 0, 0, 0.5)
}
</style>