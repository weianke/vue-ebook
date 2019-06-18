import { realPx } from './utils'
import { getReadTime } from './localStorage'

export const FONT_SIZE_LIST = [
  {
    fontSize: 12
  },
  {
    fontSize: 14
  },
  {
    fontSize: 16
  },
  {
    fontSize: 18
  },
  {
    fontSize: 20
  },
  {
    fontSize: 22
  },
  {
    fontSize: 24
  }
]

export const FONT_FAMILY = [
  {
    font: 'Default'
  },
  {
    font: 'Cabin'
  },
  {
    font: 'Days One'
  },
  {
    font: 'Montserrat'
  },
  {
    font: 'Tangerine'
  }
]

export function themeList(vue) {
  return [
    {
      alias: vue.$t('book.themeDefault'),
      name: 'Default',
      style: {
        body: {
          color: '#4c5059',
          background: '#cecece',
          'padding-top': `${realPx(48)}px!important`,
          'padding-bottom': `${realPx(48)}px!important`
        },
        img: {
          width: '100%'
        },
        '.epubjs-hl': {
          fill: 'red',
          'fill-opacity': '0.3',
          'mix-blend-mode': 'multiply'
        }
      }
    },
    {
      alias: vue.$t('book.themeGold'),
      name: 'Gold',
      style: {
        body: {
          color: '#5c5b56',
          background: '#c6c2b6',
          'padding-top': `${realPx(48)}px!important`,
          'padding-bottom': `${realPx(48)}px!important`
        },
        img: {
          width: '100%'
        },
        '.epubjs-hl': {
          fill: 'red',
          'fill-opacity': '0.3',
          'mix-blend-mode': 'multiply'
        }
      }
    },
    {
      alias: vue.$t('book.themeEye'),
      name: 'Eye',
      style: {
        body: {
          color: '#404c42',
          background: '#a9c1a9',
          'padding-top': `${realPx(48)}px!important`,
          'padding-bottom': `${realPx(48)}px!important`
        },
        img: {
          width: '100%'
        },
        '.epubjs-hl': {
          fill: 'red',
          'fill-opacity': '0.3',
          'mix-blend-mode': 'multiply'
        }
      }
    },
    {
      alias: vue.$t('book.themeNight'),
      name: 'Night',
      style: {
        body: {
          color: '#cecece',
          background: '#000000',
          'padding-top': `${realPx(48)}px!important`,
          'padding-bottom': `${realPx(48)}px!important`
        },
        img: {
          width: '100%'
        },
        '.epubjs-hl': {
          fill: 'red',
          'fill-opacity': '0.3',
          'mix-blend-mode': 'multiply'
        }
      }
    }
  ]
}

export function getReadTimeByMinute(fileName) {
  const readTime = getReadTime(fileName)
  if (!readTime) {
    return 0
  } else {
    // 向上取整 返回分钟
    return Math.ceil(readTime / 60)
  }
}
