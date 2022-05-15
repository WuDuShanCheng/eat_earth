/* eslint-disable */
declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}


declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    ASSETS_URL: string;
  }
}
