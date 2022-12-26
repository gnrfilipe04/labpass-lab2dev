import { PasswordDTO } from '../dtos/PasswordDTO'
import CryptoES from 'crypto-es'
import { SECRET_ENCRYPTED } from '@env'

export const encryptPasswords = (passwordList: PasswordDTO[]): PasswordDTO[] =>
  passwordList.map(pass => ({ ...pass, password: CryptoES.AES.encrypt(pass.password, SECRET_ENCRYPTED).toString(), }))
