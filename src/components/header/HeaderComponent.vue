<template>
  <header class="bg-cyan-600">
    <nav>
      <router-link
        class="logo-link"
        :to="showLinks ? 'salesOrders' : ''"
      >
        <img src="@/assets/logo.png">
      </router-link>
      <div class="links">
        <router-link
          to="/entries"
        >
          Entries
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderComponent',
  computed: {
    isAdmin (): boolean {
      return localStorage.getItem('isAdmin') === 'true'
    },
    showLinks (): boolean {
      return this.$route.meta.requiresLogin as boolean
    }
  }
})
</script>

<style scoped lang="scss">

header {
  position: sticky;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.5);

  nav {
    display: flex;

    > .logo-link {
      margin: 15px auto 15px 25px;

      > img {
        height: 45px;
        width: auto;
        background-color: #ffffff;
      }
    }

    > .links {
      display: flex;
      margin: auto 25px;

      a {
        font-weight: bold;
        color: white;
        text-decoration: none;
        font-size: 18px;
        margin-right: 15px;
        padding-right: 15px;

        &:last-of-type {
          margin-right: 0;
        }

        &.router-link-exact-active {
          text-decoration: underline;
        }
      }
    }

    > .account-dropdown-menu {
      margin: auto 25px auto 0;
    }
  }
}

</style>
