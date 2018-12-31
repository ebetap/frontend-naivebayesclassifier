<template>
  <v-container grid-list-md text-xs-center custom-container>
    <v-layout row wrap>
      <v-flex v-for="(menu,keyItem) in menuItems" :key="keyItem" xs4>
        <v-card color="blue-grey darken-2" class="white--text">
          <v-card-title primary-title>
            <div>
              <div class="headline">{{menu.name}}</div>
              <!-- <span>{{menu.description}}</span> -->
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn 
              flat block dark
              @click="$router.push(menu.actionUrl)"
            >
              Pilih
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'MainMenu',
  data(){
    return{
      menuItems: [
        {
          name: 'Prediksi',
          actionUrl: '/prediksi'
        },
        {
          name: 'Latih Model',
          actionUrl: '/latih-model'
        },
        {
          name: 'Validasi Model',
          actionUrl: '/validasi-model'
        }
      ]
    }
  }
}
</script>

<style>
  .headline {
    text-align: center;
  }
  .v-card__title{
    justify-content: center;
    padding-bottom: 0!important;
  }
  .v-card__title span {
    font-size: 14px;
  }
  @media only screen and (min-width: 1264px){
    .container {
      max-width: 830px!important;
    }
  }
  .custom-container {
    margin-top: 3em!important;
  }
</style>

