<template>
  <v-card class="vspStripeMenu" tile flat>
    <vsm-menu
      :menu="menu"
      :base-width="380"
      :base-height="400"
      :screen-offset="10"
      element="header"
      handler="hover"
      @open-dropdown="onOpenDropdown"
      @close-dropdown="onCloseDropdown"
    >
      <template #default="{ item }">
        <!--Dropdown Content-->
        <!--You can replace it with a separate component if each menu item has its own style-->
        <!--Dynamic Component Example: https://codepen.io/Alexeykhr/pen/YzPKxpX-->
        <div class="wrap-content">
          <div class="wrap-content__block">
            Header: {{ item.title }}
          </div>
          <div class="wrap-content__item">
            {{ item }}
          </div>
        </div>
      </template>
      <template #title="data">
        <!--Display menu items through slots-->
        {{ data.item.title }}
      </template>
    </vsm-menu>
  </v-card>
</template>

<script>
  import 'vue-stripe-menu/dist/vue-stripe-menu.css'

  export default {
    data() {
      return {
        menu: [
          {
            // display menu item (or override title slot)
            title: 'News',
            // now this is not a link, but a menu item where there is a dropdown
            dropdown: 'news',
            // don't want a button element?
            element: 'span',
            // menu item can accept all attributes
            attributes: {
              // I want more classes! No problem
              // string, array, object, not matter
              class: ['my-class1', {'my-class2': true}],
              // Custom attributes
              'data-big': 'yes'
            },
            // add some events?
            listeners: {
              // all possible native events
              mouseover: (evt) => {
                console.log('news hover', evt)
              }
            },
            // just extra properties in the object
            new_section: false,
          },
          {
            title: 'External Link',
            attributes: {
              href: 'https://github.com/Alexeykhr/vue-stripe-menu',
              target: '_blank'
            }
          }
          // ...
        ]
      }
    },
    methods: {
      onOpenDropdown() {
        console.log('onOpenDropdown')
      },
      onCloseDropdown() {
        console.log('onCloseDropdown')
      }
    }
  }
</script>
<style lang="scss">
  // Styles, to quickly start using the component
  // You can delete, change or add your own

  // Limit the width to 1024px and center
  .vsm-menu {
    z-index: 999;
    margin: 10px;

    ul {
      max-width: 1024px;
      margin: 0 auto;
    }
  }

  .vspStripeMenu {
    * {
      z-index: 999999 !important;
    }
  }

  // Let's simplify the work with menu items (logo, menu, buttons, etc)
  .vsm-root {
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
  }


  // Move all the content to the right and reduce the logo
  .logo-section {
    flex: 1 1 auto;

    img {
      user-select: none;
      max-width: 40px;
    }
  }

  // All menu items (element props: a, button, span, etc) are
  // made the same in style
  .vsm-section_menu {
    > * {
      padding: 0 25px;
      font-weight: 500;
      font-family: inherit;
    }
  }

  // Styles for Dropdown Content:
  .wrap-content {
    padding: 30px;
    // Set the width manually so that it does not depend
    // on changing content
    width: 400px;
  }

  .wrap-content__block {
    font-weight: bold;
  }

  .wrap-content__item {
    font-style: italic;
    font-size: .8rem;
  }
</style>
