<template>
  <section>
    <div class="container">
      <div class="card">
        <h2>Post 1</h2>
        <font-awesome-icon
          class="icon fas fa-arrow-right"
          :icon="['fas', 'arrow-right']"
        />
        <h3>Community id</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum hic suscipit soluta nobis laudantium, autem eum dolor adipisci tempora odit ratione vero assumenda nisi magni cupiditate cum. Pariatur, aperiam sapiente.</p>
        <div class="pic"></div>
        <div class="icons">
          <font-awesome-icon class="icon icon-1" :icon="['fas', 'thumbs-down']" />
          <font-awesome-icon
            class="icon icon-2"
            :icon="['fas', 'heart']"
          />
          <font-awesome-icon class="icon icon-3" :icon="['fas', 'comment']" />
          <font-awesome-icon class="icon icon-4" :icon="['fas', 'bookmark']" />
        </div>
        <div class="author">
            <h4>author</h4>
            <img src="https://images.unsplash.com/photo-1508247967583-7d982ea01526?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" alt="" class="profile-cover">
        </div>

        <button></button>

      </div>

      <div class="card card2">
        <h2>Post 2</h2>
        <font-awesome-icon
          class="icon fas fa-arrow-right"
          :icon="['fas', 'arrow-right']"
        />
        <h3>Community id</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum hic suscipit soluta nobis laudantium, autem eum dolor adipisci tempora odit ratione vero assumenda nisi magni cupiditate cum. Pariatur, aperiam sapiente.</p>
          <div class="pic"></div>
        <!-- </div> -->
        <div class="icons">
          <font-awesome-icon class="icon icon-1" :icon="['fas', 'thumbs-down']" />
          <font-awesome-icon
            class="icon icon-2"
            :icon="['fas', 'heart']"
          />
          <font-awesome-icon class="icon icon-3" :icon="['fas', 'comment']" />
          <font-awesome-icon class="icon icon-4" :icon="['fas', 'bookmark']" />
        </div>

        <div class="author">
            <h4>author</h4>
            <img src="https://images.unsplash.com/photo-1508247967583-7d982ea01526?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" alt="" class="profile-cover">
        </div>

        <button></button>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// like or dislike



$img-url: "https://images.unsplash.com/photo-1525543907410-b2562b6796d6?ixlib=rb-0.3.5&s=9ff8e5e718a6a40cbd0e1471235912f4&auto=format&fit=crop&w=3452&q=80";
$img-url2: "https://images.unsplash.com/photo-1528785198459-ec50485704c7?ixlib=rb-0.3.5&s=3a2fc3039516555bbb2e9cd2967bd321&auto=format&fit=crop&w=1537&q=80";

h3{
    margin-bottom: 0.5rem;
    width:100%;
    font-size:1.075rem;
}
.author {
    display: flex;
    flex-direction: column;
    justify-content:flex-start;
    align-items: center;
    width:70px;
    @media only screen and (min-width: 576px) {
      width:100px;
    }
    h4{
        background-color: transparent;
        z-index: 100;
        position: absolute;
        bottom: 0;
        font-size: 0.8rem;
        pointer-events: none;
        }
    .profile-cover{
        margin-bottom: 0.5rem;
        z-index: 100;
        position: absolute;
        bottom: 1rem;
        border-radius:50%;
        width:34px;
        height: 34px;
        @media only screen and (min-width: 576px) {
      width:64px;
        height: 64px;
    }
    }

}
    .pic-author{
        position: absolute;
        z-index: 100;
        height:30px;
        width: 30px;
    }
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .card {
    position: relative;
    width: 300px;
    height: 300px;
    overflow: hidden;
    margin-bottom: 5px;
    @media only screen and (min-width: 576px) {
      width: 530px;
    }

    h2 {
      background-color: transparent;
      z-index: 100;
      position: absolute;
      bottom: 0;
      right: 6rem;
      font-size: 1.5rem;
      pointer-events: none;
      @media only screen and (min-width: 576px) {
        right: 10rem;
        }
    }

    .fa-arrow-right {
      background-color: transparent;
      z-index: 100;
      position: absolute;
      right: 35px;
      bottom: 25px;
      font-size: 40px;
      cursor: pointer;
    }
    p {
      display: flex;
      height: 100px;
      align-items: center;
      background-color: transparent;
      z-index: 99;
      opacity: 0.7;
      font-size: 0.7rem;
      transition: all 0.2s ease;
      @media only screen and (min-width: 576px) {
        position: absolute;
        right: 0px;
        height: 75%;
        writing-mode: vertical-rl;
      }
    }
    .pic {
      width: 300px;
      height: 200px;
      border-radius: 20px 4px;
      background-image: url($img-url);
      background-size: 100% 100%;
      filter: grayscale(100%);
      @media only screen and (min-width: 576px) {
        width: 400px;
        height: 300px;
      }
    }

    .icons {
        width: 180px;
        height: 64px;
        left: 60px;
        top: 7rem;
        background-color: transparent;
        position: absolute;
        display: flex;
        justify-content: space-around;
        align-items: center;
        @media only screen and (min-width: 576px) {
        top: 0.5rem;
        }
    }

    .icon-1 {
      transition-delay: 0.7s;
    }

    .icon-2 {
      transition-delay: 0.6s;
    }

    .icon-3 {
      transition-delay: 0.5s;
    }
    .icon-4 {
      transition-delay: 0.4s;
    }

    &:hover .icon{
      opacity: 1;
      transform: scale(1);
    }

    button {
      position: absolute;
      right: 14px;
      bottom: 14px;
      width: 30px;
      height: 30px;
      background-color: red;
      border: none;
      border-radius: 30px;
      cursor: pointer;
      outline: none;
      transition: all 0.3s ease;
      mix-blend-mode: hard-light;
    }

    &:hover button {
      transform: scale(4.2);
      @media only screen and (min-width: 576px) {
        transform: scale(16.5);
      }
    }

    &:hover .pic {
      filter: grayscale(0);
    }
  }
  //   card 2
  .card2 {
    .pic {
      background-image: url($img-url2);
    }
    button {
      background-color: blue;
    }
  }
}

// common to several icon
.icon {
  background: transparent;
    opacity: 0;
  font-size: 18px;
  color: #fff;
  will-change: transform;
  transform: scale(0.1);
  transition: all 0.2s ease;
}

</style>