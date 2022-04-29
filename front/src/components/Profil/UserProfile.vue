<template>
<div class="wrapper">
  <div class="profile-card js-profile-card">
    <div class="profile-card__img">
      <img src="https://images.unsplash.com/photo-1528785198459-ec50485704c7?ixlib=rb-0.3.5&s=3a2fc3039516555bbb2e9cd2967bd321&auto=format&fit=crop&w=1537&q=80" alt="profile card" aria-label="Photo d'utilisateur">
    </div>

    <div class="profile-card__cnt js-profile-cnt">
      <div class="profile-card__name">User Groupomania</div>
      <div class="profile-card__txt">Full Stack Developer</div>

      <div class="profile-card-inf">
        <div class="profile-card-inf__item">
          <div class="profile-card-inf__title">15</div>
          <div class="profile-card-inf__txt">Abonnements</div>
        </div>

        <div class="profile-card-inf__item">
          <div class="profile-card-inf__title">35</div>
          <div class="profile-card-inf__txt">Publications</div>
        </div>
      </div>


      </div>

      <div class="profile-card-ctr">
        <button class="profile-card__button">Message</button>
        <button class="profile-card__button">Signaler</button>
        <button class="profile-card__button">Modifier</button>
      </div>
    </div>
  </div>


  <div class="gallery">
    <main class="main-content">
      <div class="column-one column">
        <div class="gallery-item">
          <img
            src="http://res.cloudinary.com/dm7uillhl/image/upload/s--9ezO-iN5--/q_jpegmini:1/v1527069128/photo-1482263448015-c6b14d636e0a_fbcwdn_sstr93.jpg"
            alt="Two women walking past each other"
            class="image"
          />
        </div>
        <div class="gallery-item-info">
          <font-awesome-icon
            value="1"
            class="icon icon-1"
            :icon="['fas', 'thumbs-up']"
          />
          <span class="icon icon-1">{{ loveCount }}</span>
          <font-awesome-icon
            value="1"
            class="icon icon-2"
            :icon="['fas', 'thumbs-down']"
          />
          <span class="icon icon-2">{{ dislikeCount }}</span>
        </div>

        <div class="gallery-item">
          <img
            src="http://res.cloudinary.com/dm7uillhl/image/upload/s--MvWW7YXW--/q_jpegmini:1/v1527069132/photo-1492633342445-8408e4c17712_awp3mp_vz3cc5.jpg"
            alt="Girl with a flower crown"
            class="image"
          />
        </div>
        <div class="gallery-item-info">
          <font-awesome-icon
            value="1"
            class="icon icon-1"
            :icon="['fas', 'thumbs-up']"
          />
          <span class="icon icon-1">{{ loveCount }}</span>
          <font-awesome-icon
            value="1"
            class="icon icon-2"
            :icon="['fas', 'thumbs-down']"
          />
          <span class="icon icon-2">{{ dislikeCount }}</span>
        </div>

        <div class="gallery-item">
          <img
            src="http://res.cloudinary.com/dm7uillhl/image/upload/s--iGqqJkvI--/q_jpegmini:1/v1527069132/photo-1499013819532-e4ff41b00669_gcjl4y_nmpeyk.jpg"
            alt="A pair of beige trainers"
            class="image"
          />
        </div>
        <div class="gallery-item-info">
          <font-awesome-icon
            value="1"
            class="icon icon-1"
            :icon="['fas', 'thumbs-up']"
          />
          <span class="icon icon-1">{{ loveCount }}</span>
          <font-awesome-icon
            value="1"
            class="icon icon-2"
            :icon="['fas', 'thumbs-down']"
          />
          <span class="icon icon-2">{{ dislikeCount }}</span>
        </div>

        <div class="gallery-item">
          <img
            src="http://res.cloudinary.com/dm7uillhl/image/upload/s--TuYf6wQo--/q_jpegmini:1/v1527069128/paper-3146952_960_720_a7lglm_yrwuhi.jpg"
            alt="Notepads and pens"
            class="image"
          />
        </div>
        <div class="gallery-item-info">
          <font-awesome-icon
            value="1"
            class="icon icon-1"
            :icon="['fas', 'thumbs-up']"
          />
          <span class="icon icon-1">{{ loveCount }}</span>
          <font-awesome-icon
            value="1"
            class="icon icon-2"
            :icon="['fas', 'thumbs-down']"
          />
          <span class="icon icon-2">{{ dislikeCount }}</span>
        </div>

        <div class="gallery-item">
          <img
            src="http://res.cloudinary.com/dm7uillhl/image/upload/s--XQGQ4-3K--/q_jpegmini:1/v1527069130/pexels-photo-893896_q6vqn4_qv9ord.jpg"
            alt="A laptop, notepads, memo pad and cactus on a blue desk"
            class="image"
          />
        </div>
        <div class="gallery-item-info">
          <font-awesome-icon
            value="1"
            class="icon icon-1"
            :icon="['fas', 'thumbs-up']"
          />
          <span class="icon icon-1">{{ loveCount }}</span>
          <font-awesome-icon
            value="1"
            class="icon icon-2"
            :icon="['fas', 'thumbs-down']"
          />
          <span class="icon icon-2">{{ dislikeCount }}</span>
        </div>
      </div>
      <div class="column-two column">
        <div class="gallery-item">
          <img
            src="http://res.cloudinary.com/dm7uillhl/image/upload/s--D0jb7ZfY--/q_jpegmini:1/v1527069129/pexels-photo-838423_hriono_zbxhbw.jpg"
            alt="Pink tiles"
            class="image"
          />
        </div>
        <div class="gallery-item-info">
          <font-awesome-icon
            value="1"
            class="icon icon-1"
            :icon="['fas', 'thumbs-up']"
          />
          <span class="icon icon-1">{{ loveCount }}</span>
          <font-awesome-icon
            value="1"
            class="icon icon-2"
            :icon="['fas', 'thumbs-down']"
          />
          <span class="icon icon-2">{{ dislikeCount }}</span>
        </div>

        <div class="gallery-item">
          <img
            src="http://res.cloudinary.com/dm7uillhl/image/upload/s--tSiWDSOy--/q_jpegmini:1/v1527069132/photo-1519763421920-f2d769e01a37_qnr50f_tuptz8.jpg"
            alt="A girl wearing glasses sitting on stairs"
            class="image"
          />
        </div>
        <div class="gallery-item-info">
          <font-awesome-icon
            value="1"
            class="icon icon-1"
            :icon="['fas', 'thumbs-up']"
          />
          <span class="icon icon-1">{{ loveCount }}</span>
          <font-awesome-icon
            value="1"
            class="icon icon-2"
            :icon="['fas', 'thumbs-down']"
          />
          <span class="icon icon-2">{{ dislikeCount }}</span>
        </div>

        <div class="gallery-item">
          <img
            src="http://res.cloudinary.com/dm7uillhl/image/upload/s--LKnlDFz7--/q_jpegmini:1/v1527069132/photo-1506976802331-7f6a56eee0f0_utyk5p_ofxbxb.jpg"
            alt="Girl in red cap standing in front of yellow and blue wall"
            class="image"
          />
        </div>
        <div class="gallery-item-info">
          <font-awesome-icon
            value="1"
            class="icon icon-1"
            :icon="['fas', 'thumbs-up']"
          />
          <span class="icon icon-1">{{ loveCount }}</span>
          <font-awesome-icon
            value="1"
            class="icon icon-2"
            :icon="['fas', 'thumbs-down']"
          />
          <span class="icon icon-2">{{ dislikeCount }}</span>
        </div>

        <div class="gallery-item">
          <img
            src="http://res.cloudinary.com/dm7uillhl/image/upload/s--PFh8MQ4B--/q_jpegmini:1/v1527069130/photo-1505204144504-0a48bd7862ee_ihdjtk_zcdupl.jpg"
            alt="Girl in smart attire standing in front of striped wall"
            class="image"
          />
        </div>
        <div class="gallery-item-info">
          <font-awesome-icon
            value="1"
            class="icon icon-1"
            :icon="['fas', 'thumbs-up']"
          />
          <span class="icon icon-1">{{ loveCount }}</span>
          <font-awesome-icon
            value="1"
            class="icon icon-2"
            :icon="['fas', 'thumbs-down']"
          />
          <span class="icon icon-2">{{ dislikeCount }}</span>
        </div>
      </div>
      <div class="column-three column">
        <div class="gallery-item">
          <img
            src="http://res.cloudinary.com/dm7uillhl/image/upload/s--Tlgn-5DV--/q_jpegmini/v1527069132/photo-1518382473172-c5b406fe7efd_nh5gqu_ae944m.jpg"
            alt="Black girl with an afro"
            class="image"
          />
        </div>
        <div class="gallery-item-info">
          <font-awesome-icon
            value="1"
            class="icon icon-1"
            :icon="['fas', 'thumbs-up']"
          />
          <span class="icon icon-1">{{ loveCount }}</span>
          <font-awesome-icon
            value="1"
            class="icon icon-2"
            :icon="['fas', 'thumbs-down']"
          />
          <span class="icon icon-2">{{ dislikeCount }}</span>
        </div>

        <div class="gallery-item">
          <img
            src="http://res.cloudinary.com/dm7uillhl/image/upload/s--zQ5McgQs--/q_jpegmini:1/v1527069130/photo-1492707892479-7bc8d5a4ee93_nrhzb7_sg2808.jpg"
            alt="Beauty products spilling out of a black sidebag"
            class="image"
          />
        </div>
        <div class="gallery-item-info">
          <font-awesome-icon
            value="1"
            class="icon icon-1"
            :icon="['fas', 'thumbs-up']"
          />
          <span class="icon icon-1">{{ loveCount }}</span>
          <font-awesome-icon
            value="1"
            class="icon icon-2"
            :icon="['fas', 'thumbs-down']"
          />
          <span class="icon icon-2">{{ dislikeCount }}</span>
        </div>

        <div class="gallery-item">
          <img
            src="http://res.cloudinary.com/dm7uillhl/image/upload/s--_sFt8kAZ--/q_jpegmini:1/v1527069130/photo-1496775162873-064fc81ef366_iieixm_lcm9p0.jpg"
            alt="Vogue magazines on top of white bedsheets"
            class="image"
          />
        </div>
        <div class="gallery-item-info">
          <font-awesome-icon
            counter
            value="1"
            class="icon icon-1"
            :icon="['fas', 'thumbs-up']"
          />
          <span class="icon icon-1">{{ loveCount }}</span>
          <font-awesome-icon
            value="1"
            class="icon icon-2"
            :icon="['fas', 'thumbs-down']"
          />
          <span class="icon icon-2">{{ dislikeCount }}</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style lang="scss" scoped>
// Profil
// Profil
.wrapper {
  width: 100%;
  width: 100%;
  height: auto;
  min-height: 100vh;
  padding: 50px 20px;
  padding-top: 100px;
  display: flex;
//   background-image: linear-gradient(-20deg, #ff2846 0%, #6944ff 100%);

  @media screen and (max-width: 768px) {
    height: auto;
    min-height: 100vh;
    padding-top: 100px;
  }

}

.profile-card {
  width: 100%;
//   min-height: 460px;
  margin: auto;
//   background: #292929;
  border-radius: 12px;
  max-width: 700px;
  position: relative;

  &__img {
    width: 150px;
    height: 150px;
    margin-left: auto;
    margin-right: auto;
    transform: translateY(-50%);
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    z-index: 4;
    box-shadow: 0px 5px 50px 0px #08708a, 0px 0px 0px 7px #08708a;

    @media screen and (max-width: 576px) {
      width: 120px;
      height: 120px;
    }

  }

  &__cnt {
    margin-top: -35px;
    text-align: center;
    padding: 0 20px;
    transition: all .3s;
    background: transparent;
  }

  &__name {
    font-weight: 700;
    margin-bottom: 15px;
        background: transparent;
  }

  &__txt {
    font-size: 18px;
    font-weight: 500;
    color: #324e63;
    margin-bottom: 15px;
        background: transparent;

  }

  &-inf {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-top: 35px;
        background: transparent;


    &__item {
      padding: 10px 35px;
      min-width: 150px;
          background: transparent;


      @media screen and (max-width: 768px) {
        padding: 10px 20px;
        min-width: 120px;
      }

    }

    &__title {
      font-weight: 700;
      font-size: 27px;
      //color: #6944ff;
      color: #324e63;
          background: transparent;

    }

    &__txt {
      font-weight: 500;
      margin-top: 7px;
          background: transparent;

    }

  }


  &-ctr {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;

    @media screen and (max-width: 576px) {
      flex-wrap: wrap;
    }

  }

  &__button {
    background: none;
    border: none;
    font-weight: 700;
    margin: 15px 35px;
    padding: 15px 40px;
    min-width: 201px;
    border-radius: 50px;
    min-height: 55px;
    cursor: pointer;
    transition: all .3s;

    @media screen and (max-width: 768px) {
      min-width: 170px;
      margin: 15px 25px;
    }

    @media screen and (max-width: 576px) {
      min-width: inherit;
      margin: 0;
      margin-bottom: 16px;
      width: 100%;
      max-width: 300px;

      &:last-child {
        margin-bottom: 0;
      }
    }

  }

}
.profile-card__button{
margin-top: 1rem;
  background: lighten(rgb(23, 23, 23), 1%);
  border: none;
  font-size: 12px;
  padding: 0.6rem 0.6rem;
  border-radius: 0.8rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  box-shadow: inset -3px -3px 3px rgba(white, 0.025),
    inset 3px 3px 5px rgba(black, 0.075), -3px -3px 5px rgba(white, 0.025),
    3px 3px 5px rgba(black, 0.05);
  &:hover {
    background: darken(rgb(12, 19, 31), 1%);
    box-shadow: inset -5px -5px 5px rgba(white, 0.01),
      inset 5px 5px 5px rgba(black, 0.1), -5px -5px 5px rgba(white, 0.015),
      5px 5px 5px rgba(black, 0.05);
  }
}

// gallery
.gallery {
  width: 100%;
  height: auto;
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  .main-content {
    width: calc(100% - 270px);
    min-width: 300px;
    height: auto;
    align-self: flex-end;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: stretch;
    .column {
      flex: 1;
      height: 100%;
      padding-top: 25px;
    }
    .column-one {
      .image {
        width: calc(100% - 30px);
        margin: 15px 15px 15px 0;
      }
    }
    .column-two {
      .image {
        width: calc(100% - 30px);
        margin: 15px 15px 15px 0;
      }
    }
    .column-three {
      .image {
        width: calc(100% - 30px);
        margin: 15px 15px 15px 0;
      }
    }
  }
}

.icon {
  cursor: pointer;
}
.icon-1 {
  margin-right: 0.7rem;
}
img{
    width: 100%;
    height: 100%;
}
</style>