<template>
  <div class="container m-5">
    <div class="row">
      <div class="box">
        <div class="box-logo">
          <img src="@/assets/logo.svg" />
        </div>
        <div class="box-tab">
          <button class="tab " :class="tabs == true ? 'tab-active' : ''" @click="() => onChangeTabs(true)">
            SE CONNECTER
          </button>
          
          <button class="tab" :class="tabs == false ? 'tab-active' : ''" @click="() => onChangeTabs(false)">
            S'INSCRIRE
          </button>
        </div>
        <div class="onglet" v-if="tabs">
          <Error v-if="connexionErreur != ''">{{connexionErreur}}</Error>
          <div class="box-input">
            <Input :value="connexionEmail" @input="connexionEmail = $event.target.value" type="text" placeholder="exemple@groupomania.fr">Adresse e-mail</Input>
          </div>
          <div class="box-input">
            <Input :value="connexionPassword" @input="connexionPassword = $event.target.value" type="password" placeholder="*************">Mot de passe</Input>
          </div>
          <div class="box-submit">
            <Trigger :action="onConnect">SE CONNECTER</Trigger>
          </div>
        </div>
        <div class="onglet" v-if="!tabs">
          <Error v-if="inscriptionErreur != ''">{{inscriptionErreur}}</Error>
          <Success v-if="inscriptionSuccess != ''">{{inscriptionSuccess}}</Success>
          <div class="box-input">
            <Input :value="inscriptionLastName" @input="inscriptionLastName = $event.target.value" type="text" placeholder="DOE">Nom de famille</Input>
          </div>
          <div class="box-input">
            <Input :value="inscriptionFirstName" @input="inscriptionFirstName = $event.target.value" type="text" placeholder="Florent">Prénom</Input>
          </div>
          <div class="box-input">
            <Input :value="inscriptionEmail" @input="inscriptionEmail = $event.target.value" type="text" placeholder="exemple@groupomania.fr">Adresse e-mail</Input>
          </div>
          <div class="box-input">
            <Input :value="inscriptionPassword" @input="inscriptionPassword = $event.target.value" type="password" placeholder="*************">Mot de passe</Input>
          </div>
          <div class="box-submit">
            <Trigger :action="onSubscribe">S'INSCRIRE</Trigger>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script src="./Connexion.js"></script>
<style src="./Connexion.css" scoped></style>
