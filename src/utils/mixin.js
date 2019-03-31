import { mapGetters, mapActions} from 'vuex'

export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'menuVisible'
    ])
  },
  methods: {
    ...mapActions([
      'setMenuVisible'
    ])
  }
}
