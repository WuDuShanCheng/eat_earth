/* eslint-disable */
declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export {Component}
}

export {}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    ASSETS_URL: string;
  }
}
