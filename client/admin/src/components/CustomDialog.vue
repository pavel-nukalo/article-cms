<template>
  <v-row justify="center">
    <v-dialog
      :value="show"
      max-width="290"
      @click:outside="handleClose"
    >
      <v-card>
        <v-card-title class="headline">
          {{cardTitle}}
        </v-card-title>
        <v-card-text>{{cardText}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="handleClose"
            :dark = "!processing"
            :disabled = "processing"
          >
            Cancel
          </v-btn>
          <v-btn
            :color="buttonColor"
            text
            @click="handle"
            :dark = "!processing"
            :disabled = "processing"
          >
            {{buttonTitle}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: {
      show: Boolean,
      cardTitle: String,
      cardText: String,
      buttonTitle: String,
      buttonColor: String,
    },
    computed: {
      processing() {
        return this.$store.getters.getProcessing;
      }
    },
    methods: {
      handle() {
        this.$emit('handle');
      },

      handleClose() {
        this.$emit('close');
      },
    }
  }
</script>