<template>
    <div class="upload-file">
        <div class="upload loading">
    <div class="path">
        <div class="arrow"></div>
        <svg>
            <use class="use" xlink:href="#path"/>
        </svg>
    </div>
    <div class="circle">
        <div class="water">
            <svg>
                <use xlink:href="#wave"/>
            </svg>
            <svg>
                <use xlink:href="#wave"></use>
            </svg>
        </div>
    </div>
</div>
        
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol viewBox="0 0 72 72" id="path">
        <path d="M36,25.12 L36,43.68 C36,53.3185944 31.52,56.7319277 22.56,53.92 C9.12,49.7021084 4,44.5565697 4,36 C4,18.72 18.72,4 36,4 C53.28,4 68,18.72 68,36 C68,53.28 53.28,68 36,68 C18.72,68 4,53.28 4,36 C4,18.72 18.72,4 36,4 C53.28,4 68,18.72 68,36 C68,53.28 53.28,68 36,68 C18.72,68 4,53.28 4,36 C4,18.72 18.72,4 36,4 C43.2533333,4 49.8789797,6.40627283 55.876939,11.2188185 L32.7391444,45.2477592 L23.8653488,38.1626948"></path>
    </symbol>
    <symbol viewBox="0 0 116 6" id="wave">
        <path d="M58,0 C70.6086957,0 79.3822464,6 87,6 L58,6 L29,6 C36.6177536,6 45.3913043,0 58,0 Z M0,0 C12.6086957,0 21.3822464,6 29,6 L0,6 L0,0 Z M116,0 L116,6 L87,6 C94.6177536,6 103.391304,0 116,0 Z"></path>
    </symbol>
</svg>

    </div>

    
</template>

<style lang="scss" scoped>
// use{
//     background: transparent;
// }
.upload {
  width: 66px;
  height: 66px;
  position: relative;
  background: transparent;
  display: inline-block;
  border-radius:50px;
  margin: 1px auto 0;
//   border: 3px solid #8de8fe;
//   la fleche
    .path {
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 1;
        margin: -36px 0 0 -36px;
        width: 72px;
        height: 75px;
        background: transparent;
        .arrow {
            bottom: 27px;
            width: 2px;
            height: 21px;
            position: absolute;
            left: 50%;
            border-radius: 1px;
            margin: 0 0 0 -1px;
            transform-origin: 50% 100%;
//           la pointe de la flèche
            &:before,
            &:after {
                content: '';
                display: block;
                width: 2px;
                height: 14px;
                bottom: -2px;
                background: #fff;
                position: absolute;
                border-radius: 1px;
                transform-origin: 50% 100%;
            }
            &:before {
                right: 50%;
                transform: rotate(-44deg) translateX(2px);
            }
            &:after {
                left: 50%;
                transform: rotate(44deg) translateX(-2px);
            }
        }

//       le corp de la fleche
        svg {
            width: 72px;
            height: 72px;
            display: block;
            fill: none;
            stroke: #fff;
            stroke-width: 2px;
            stroke-linecap: round;
            stroke-dashoffset: 592.73;
            stroke-dasharray: 0 592.73 20 592.73;
            border-radius: 50%;
        }
      //       end le corp de la fleche

    }
        //  end la fleche

//   l'eau qui se remplit
    .circle {
        position: absolute;
        width: 58px;
        height: 58px;
        margin: -29px 0 0 -29px;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        overflow: hidden;
        .water {
            transform: translateY(116%);
            background: #419AFE;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            svg {
                display: block;
                width: 116px;
                height: 6px;
                position: absolute;
                bottom: 100%;
                &:nth-child(1) {
                    right: 0;
                    fill: #308FFA;
                    animation: forward 1.65s infinite;
                }
                &:nth-child(2) {
                    left: 0;
                    fill: #419AFE;
                    margin-bottom: -1px;
                    animation: backward .825s infinite linear;
                }
            }
        }
      
    }
  //   end l'eau qui se remplit

    &.loading:hover {
        .path {
            animation: movePath .4s linear forwards;
            .arrow {
                animation: arrow .5s linear forwards 3.7s;
                &:before {
                    animation: arrowB .4s linear forwards, arrowBCheck .5s linear forwards 3.7s;
                }
                &:after {
                    animation: arrowA .4s linear forwards, arrowACheck .5s linear forwards 3.7s;
                }
            }
            svg {
                animation: load 3s linear forwards .45s, reset .7s linear forwards 3.7s;
            }
        }
        .circle {
            .water {
                animation: fill 3s linear forwards .45s;
            }
        }
    }
    &:active {
        transform: scale(.92) translateZ(0);
    }
}

@keyframes load {
    0% {
        stroke-dashoffset: 592.73;
        stroke-dasharray: 0 592.73 20 592.73;
    }
    42% {
        stroke-dasharray: 0 592.73 80 592.73;
    }
    85% {
        stroke-dashoffset: 80;
        stroke-dasharray: 0 592.73 32 592.73;
    }
    100% {
        stroke-dashoffset: 32;
        stroke-dasharray: 0 592.73 32 592.73;
    }
}

@keyframes reset {
    0%,
    99% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes movePath {
    70% {
        transform: translateY(-10px);
    }
}

@keyframes arrow {
    0% {
        background: #fff;
        transform: rotate(34deg) translate(-2.5px, 2px);
    }
    40% {
        transform: rotate(-7deg) translate(0, 0);
    }
    99% {
        transform: rotate(0) translate(0, 0);
    }
    100% {
        background: #fff;
    }
}

@keyframes arrowBCheck {
    0%,
    20% {
        transform: rotate(-86deg) translateX(2px) translateY(1px) scaleY(.714);
        opacity: 1;
    }
    100% {
        transform: rotate(-44deg) translateX(2px) scaleY(1) translateY(0);
        opacity: 1;
    }
}

@keyframes arrowACheck {
    0% {
        transform: rotate(0deg) translate(-1px, -1px);
        opacity: 1;
    }
    40% {
        transform: rotate(60deg) translate(-2px, 1px);
        opacity: 1;
    }
    100% {
        transform: rotate(44deg) translateX(-2px);
        opacity: 1;
    }
}

@keyframes arrowB {
    0% {
        transform: rotate(-44deg) translateX(2px);
    }
    60% {
        transform: rotate(-60deg) translateX(2px);
    }
    99% {
        transform: rotate(0deg) translateX(1px);
        opacity: 1;
    }
    100% {
        transform: rotate(0deg) translateX(1px);
        opacity: 0;
    }
}

@keyframes arrowA {
    0% {
        transform: rotate(44deg) translateX(-2px);
    }
    60% {
        transform: rotate(60deg) translateX(-2px);
    }
    99% {
        transform: rotate(0deg) translateX(-1px);
        opacity: 1;
    }
    100% {
        transform: rotate(0deg) translateX(-1px);
        opacity: 0;
    }
}

@keyframes fill {
    0% {
        transform: translateY(116%);
    }
    80% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(0);
    }
}

@keyframes backward {
    100% {
        transform: translateX(-50%);
    }
}

@keyframes forward {
    100% {
        transform: translateX(50%);
    }
}


</style>