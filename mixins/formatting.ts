function capitalizeFLetter(str: string): string {
    return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

function formatTimeStr(mins: number): string {
  let timeStr = ''
  if (mins >= 60) {
    timeStr += Math.round(mins / 60) + 'h'
    if (mins % 60 != 0)
      timeStr += ' ' + mins % 60 + ' mins'
  } else if (mins > 0)
    timeStr += mins % 60 + ' mins'
  return timeStr
}

function formatSkillStr(skills: string): string {
  if (!skills)
    return ''
  let format = ' | '
  skills.split(';').forEach((i, idx, array) => {
    if (idx == 0)
      format += capitalizeFLetter(i) + ', '
    else if (idx != array.length - 1)
      format += i.toLowerCase() + ', '
    else
      format += i.toLowerCase()
  });
  return format
}

function formatSearch(search: string): string | null {
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
      return null;
  }
}