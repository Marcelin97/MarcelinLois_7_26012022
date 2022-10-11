<template>
  <button class="delete">Delete</button>
</template>

<style lang="scss" scoped>
.delete {
  border: none;
  outline: none;
  color: #fff;
  width: auto;
  height: 4rem;
  max-width: 7rem;
  display: flex;
  align-items: center;
  text-align: center;
  text-indent: 20px;
  padding: 0 10px;
  border-radius: 0.8rem;
  line-height: 35px;
  box-shadow: 0px 0px 3px #213741;
  background: #f34642
    url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBkPSJNNDI0LjU2MiA3OC4wMjJ2NDAuMDMySDg3LjQzOFY3OC4wMjJoOTQuOTM4YzE1LjQ2NCAwIDI4LTEyLjU0NiAyOC0yOC4wMjJoOTEuMjUgYzAgMTUuNSAxMi41IDI4IDI4IDI4LjAyMkg0MjQuNTYyeiBNNDA2LjMzNCAxNDguMDc5VjQ2MkgxMDUuNjY2VjE0OC4wNzlINDA2LjMzNHogTTE5Ny4zMzMgMjEwLjUgYzAtOC4yOTEtNi43MTYtMTUuMDEyLTE1LTE1LjAxMnMtMTUgNi43MjEtMTUgMTUuMDEydjE5MC4xNTNjMCA4LjMgNi43IDE1IDE1IDE1LjAxMnMxNS02LjcyMSAxNS0xNS4wMTJWMjEwLjQ2MnogTTI3MSAyMTAuNDYyYzAtOC4yOTEtNi43MTYtMTUuMDEyLTE1LTE1LjAxMnMtMTUgNi43MjEtMTUgMTUuMDEydjE5MC4xNTNjMCA4LjMgNi43IDE1IDE1IDE1LjAxMnMxNS02LjcyMSAxNS0xNS4wMTIgVjIxMC40NjJ6IE0zNDQuNjY3IDIxMC40NjJjMC04LjI5MS02LjcxNi0xNS4wMTItMTUtMTUuMDEycy0xNSA2LjcyMS0xNSAxNS4wMTJ2MTkwLjE1M2MwIDguMyA2LjcgMTUgMTUgMTUgczE1LTYuNzIxIDE1LTE1LjAxMlYyMTAuNDYyeiIgc3R5bGU9ImZpbGw6ICNGRkY7Ii8+PC9zdmc+")
    no-repeat 10px center;
  background-size: 17px;
  position: relative;
  transition: background 0.3s;
  cursor: pointer;
}
.delete:hover {
  background-color: #713031;
}
</style>