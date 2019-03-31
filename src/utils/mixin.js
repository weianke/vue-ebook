import {
  mapGetters
} from 'vuex'

export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'menuVisible'
    ])
  }
}
