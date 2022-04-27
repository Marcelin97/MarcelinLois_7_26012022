<template>
  <section class="form-input-box">
    <form action="" class="post-form">
      <!-- Post form header -->
      <div class="post-form-header">
        <div class="post-form-header-label">
          <span>Crée un Post</span>
        </div>
        <div class="post-form-btn-close">
          <button
            type="button"
            class="btn-close-edit"
            title="Close the edit"
            aria-label="Close the edit"
          >
            close
          </button>
        </div>
      </div>
      <!-- post form content -->
      <div class="post-form-content">
        <div class="post-form-top">
          <div class="post-form-file">
            <div class="post-form-file-center">
              <label for="">
                <input type="file" />
              </label>
            </div>
          </div>
          <div class="post-form-title">
            <textarea
              name=""
              id="post-form-title"
              cols="30"
              rows="10"
              aria-label="Post title"
              placeholder="Titre de votre post ici..."
            ></textarea>
          </div>
        </div>
        <div class="holes-lower"></div>

        <div class="post-form-body">
          <div class="post-form-body-text">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              aria-label="Post content"
              placeholder="Ecrivez le contenu de votre post ici..."
            ></textarea>
          </div>
        </div>
      </div>
      <!-- post form footer -->
      <div class="post-form-footer">
        <button class="btn-form-new-post">Publier</button>
      </div>
    </form>
  </section>
</template>

<style lang="scss" scoped>
.form-input-box {
  display: flex;
  justify-content: center;
}
.post-form {
  width: 280px;
}

.post-form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

// post form contents
.post-form-content {
  overflow: auto;
  // height: calc(100vh - var(-56px) - var(-72px));
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  background: rgb(23, 23, 23);
  overflow-wrap: break-word;
  overflow-wrap: anywhere;
}

.post-form-top {
  padding: 1rem 1rem;
  background: transparent;
}

.post-form-file {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.5rem;
}

.post-form-file-center {
}
.post-form-title {
  overflow: hidden;
  background: transparent;
  display: flex;
  flex-wrap: wrap;
  textarea {
    min-height: 46px;
    max-height: 46px;
    font-weight: 700;
    font-size: 1.075rem;
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    outline: none;
    resize: none;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    //   white-space: nowrap;
    //   flex-basis: 100%;
    display: flex;
    flex-wrap: nowrap;
  }
}
.holes-lower {
  position: relative;
  margin: 0.3rem;
  border-bottom: 1px dashed #292929;
  background: transparent;
}

.post-form-body {
  padding: 1rem 1rem;
  background: transparent;
  display: flex;
  flex-direction: column;
  .post-form-body-text {
    background: transparent;
    textarea {
      min-height: 27px;
      max-height: 100px;
      height: 100% !important;
      background: transparent;
      border: none;
      outline: none;
      padding: 0.5rem;
      margin: 0;
      resize: none;
      display: flex;
      flex-wrap: wrap;
    }
  }
}

.btn-form-new-post {
  color: #fff;
  font-family: "Montserrat", sans-serif;
  background: lighten(#222020, 1%);
  border: none;
  letter-spacing: 0.5px;
  font-size: 12px;
  padding: 10px 10px;
  border-radius: 50px;
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
</style>