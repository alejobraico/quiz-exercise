import {HtmlEntities} from './HtmlEntities'

export function decodeSpecialCharacters(input:string):string
{
  let output:string = input

  Object.keys(HtmlEntities).forEach((key:string):void =>
  {
    if (output.includes(key))
      output = output.replace(new RegExp(key, 'g'), HtmlEntities[key])
  })

  return output
}
