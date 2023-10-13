<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="blue"
            dark
            flat
          >
            <v-toolbar-title>Authentication</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <!-- <v-alert
              type="warning"
              :value="error"
            >
              {{ error }}
            </v-alert> -->
            <v-form>
              <v-text-field
                label="Email"
                name="email"
                prepend-icon="mdi-account"
                type="text"
                v-model="email"
                required
                placeholder=" "
              ></v-text-field>

              <v-text-field
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
                required
                placeholder=" "
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :dark = "!processing"
              color="blue"
              @click.prevent="signin"
              :disabled = "processing"
            >
              Signin
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  computed: {
    error() {
      return this.$store.getters.getError;
    },
    processing() {
      return this.$store.getters.getProcessing;
    }
  },
  methods: {
    signin() {
      this.$store.dispatch('SIGNIN', { email: this.email, password: this.password })
        .then(() => {
          if (!this.error) this.$router.push('/');
        });
    }
  }
}
</script>
