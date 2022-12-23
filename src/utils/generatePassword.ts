export function generatePass({length,}: {length: number}){
  const CHARS = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let PASSWORD = ''

  for (var i = 0; i < length; i++) {
    var randomNumber = Math.floor(Math.random() * CHARS.length)
    PASSWORD += CHARS.substring(randomNumber, randomNumber + 1)
  }

  return PASSWORD
}
