import { Component, Vue } from 'nuxt-property-decorator'
@Component
class formatting extends Vue {
  public capitalizeFLetter(str: string): string {
    return str[0].toUpperCase() + str.slice(1).toLowerCase()
  }
  formatTimeStr(mins: number): string {
    let timeStr = ''
    if (mins >= 60) {
      timeStr += Math.round(mins / 60) + 'h'
      if (mins % 60 != 0)
        timeStr += ' ' + mins % 60 + ' mins'
    } else if (mins > 0)
      timeStr += mins % 60 + ' mins'
    return timeStr
  }
  public formatSkillStr(skills: string): string {
    if (!skills)
      return ''
    let format = ' | '
    skills.split(';').forEach((i, idx, array) => {
      if (idx == 0)
        format += this.capitalizeFLetter(i) + ', '
      else if (idx != array.length - 1)
        format += i.toLowerCase() + ', '
      else
        format += i.toLowerCase()
    });
    return format
  }
  public formatSearch(search: string): string {
    switch (search) {
      case 'title':
        return 'Titres';
      case 'style':
        return 'Styles';
      case 'resume':
        return 'Résumé';
      case 'description':
        return 'Description';
      case 'skills':
        return 'Techniques';
      case 'duration':
        return 'Durée';
      default:
        return '';
    }
  }
}
export default formatting
/* export {
  methods: {
    capitalizeFLetter(str: string): string {
      return str[0].toUpperCase() + str.slice(1).toLowerCase()
    },
    formatTimeStr(mins: number): string {
      let timeStr = ''
      if (mins >= 60) {
        timeStr += Math.round(mins / 60) + 'h'
        if (mins % 60 != 0)
          timeStr += ' ' + mins % 60 + ' mins'
      } else if (mins > 0)
        timeStr += mins % 60 + ' mins'
      return timeStr
    },
    formatSkillStr(skills: string): string {
      if (!skills)
        return ''
      let format = ' | '
      skills.split(';').forEach((i, idx, array) => {
        if (idx == 0)
          format += this.capitalizeFLetter(i) + ', '
        else if (idx != array.length - 1)
          format += i.toLowerCase() + ', '
        else
          format += i.toLowerCase()
      });
      return format
    },
    formatSearch(search: string): string {
      switch (search) {
        case 'title':
          return 'Titres';
        case 'style':
          return 'Styles';
        case 'resume':
          return 'Résumé';
        case 'description':
          return 'Description';
        case 'skills':
          return 'Techniques';
        case 'duration':
          return 'Durée';
        default:
          return '';
      }
    }
  },
} */