<template>
  <v-container grid-list-md>
    <h1>Test Model</h1>
    <v-layout row wrap>
      <v-flex xs12 md12 lg12>
        <form>
          <v-text-field
            v-model="dataset"
            :error-messages="nameErrors"
            label="Komentar"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-btn 
            block 
            color="blue-grey darken-2" 
            @click="submit"
            class="white--text"
            text-xs-center
          >
            Classify
          </v-btn>
        </form>
      </v-flex>
    </v-layout>
    <div class="result display-3 mt-5 text-uppercase">Spam</div>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
