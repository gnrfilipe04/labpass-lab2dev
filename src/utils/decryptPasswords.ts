import { PasswordDTO } from '../dtos/PasswordDTO'
import CryptoES from 'crypto-es'
import { SECRET_ENCRYPTED } from '@env'


export const decryptPasswords = (passwordList: PasswordDTO[]): PasswordDTO[] =>
  passwordList.map(pass => ({ ...pass, password: CryptoES.AES.decrypt(pass.password, SECRET_ENCRYPTED).toString(CryptoES.enc.Utf8), }))
