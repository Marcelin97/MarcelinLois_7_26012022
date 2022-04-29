<template>
  <section></section>
  <div class="container">
    <h1 class="title">Modifier mon profil</h1>

    <div class="grid">
      <div class="form-group a">
        <label for="name">Nom</label>
        <input id="name" type="text" />
      </div>

      <div class="form-group b">
        <label for="first-name">Prénom</label>
        <input id="first-name" type="text" />
      </div>

      <div class="form-group email-group">
        <label for="email">Email</label>
        <input id="email" type="text" />
      </div>

      <div class="form-group phone-group">
        <label for="phone">Téléphone (mobile)</label>
        <input id="phone" type="text" />
      </div>

      <div class="textarea-group">
        <label for="bio">Bio</label>
        <textarea id="bio"></textarea>
      </div>

      <div class="form-group">
        <label for="address">Adresse</label>
        <input id="address" type="text" />
      </div>

      <div class="form-group">
        <label for="city">Ville</label>
        <input id="city" type="text" />
      </div>

      <div class="form-group">
        <label for="zip">Code postal</label>
        <input id="zip" type="text" />
      </div>
    </div>

    <div class="button-container">
      <button class="button">Enregister les modifications</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (min-width: 768px) {
    align-items: center;
    justify-content: center;
    margin: 2rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
  }
}

.title {
  font-size: 24px;
  line-height: 28px;
  font-weight: bold;
  color: #374151;
  padding-bottom: 11px;
  border-bottom: 1px solid #d7dbdf;
}

.form-group {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
}

.textarea-group label,
.form-group label {
  color: #374151;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 10px;
}

.form-group [type],
.textarea-group textarea {
  border: 1px solid #d2d6db;
  border-radius: 6px;
  padding: 15px;
}
.form-group [type]:hover,
.textarea-group textarea:hover {
  border-color: #a8afb9;
}

.textarea-group {
  margin-top: 24px;
}

.textarea-group textarea {
  resize: none;
  width: 100%;
  margin-top: 10px;
  height: calc(100% - 59px);
}

.button {
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

@media only screen and (min-width: 768px) {
  .grid {
    display: grid;
    grid-gap: 24px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 1fr;
  }
}
@media only screen and (min-width: 1024px) {
  .email-group {
    grid-column: 1;
    grid-row: 2;
  }

  .phone-group {
    grid-column: 2;
    grid-row: 2;
  }

  .textarea-group {
    grid-column: 3;
    grid-row: span 2;
    margin-right: 2rem;
  }

  .button-container {
    text-align: right;
  }

  .button {
    width: auto;
  }
}
</style>