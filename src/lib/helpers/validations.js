import validator from 'validator'

export const toggleHelp = (selectedVal, ref) => {
  if (!isFull(selectedVal)) {
    // console.log('togglehelp help',selectedVal, ref)
    return true
  } else {
    if (['last-name', 'first-name', 'subject', 'message', 'email', 'password'].includes(ref)) {
      if (checkEntry(selectedVal, ref) == false) {
        // console.log('togglehelp help',selectedVal, ref)
        return true
      }
    }
    if (ref === 'phone' && checkPhone(selectedVal) == false) {
      return true
    }  
  }
}

export const checkEntry = (selectedVal, ref) => {
  if (ref === 'email') {
    if (checkEmail(selectedVal)) {
      return true
    }
    return false
  }
  if (ref === 'password') {
    if(checkPassword(selectedVal)) {
      return true
    }
    return false
  }
  if (['last-name', 'first-name', 'subject', 'message'].includes(ref)) {
    // console.log('checkEntry', ref)
    if (checkString(selectedVal)) {
      return true
    }
    return false
  }
}

export const checkPhone = (selectedVal) => {
  if (!isFull(selectedVal)) {
    return false
  }
  if (!validator.isNumeric(selectedVal)) {
    return false
  }
  return true
}

export const checkRgpd = (selectedVal) => {
  if (typeof selectedVal !== 'boolean') return
  return selectedVal
}

export const checkString = (selectedVal) => {
  if (!isFull(selectedVal)) {
    // console.log('str vide false')
    return false
  }
  selectedVal = escapeStr(selectedVal)
  // console.log('str pleine true : ', selectedVal)
  return true
}

export const escapeStr = (selectedVal) => {
  if (!isFull(selectedVal)) return 
  return validator.escape(selectedVal)
}

export const checkEmail = (selectedVal) => {
  if (isFull(selectedVal)) {
    if (validator.isEmail(selectedVal)) {
      // console.log('selectedVal plein valide')
        selectedVal = validator.normalizeEmail(selectedVal, {
            all_lowercase: true,
            gmail_lowercase: true,
            gmail_remove_dots: true,
            gmail_remove_subaddress: true,
            gmail_convert_googlemaildotcom: true,
            outlookdotcom_lowercase: true,
            outlookdotcom_remove_subaddress: true,
            yahoo_lowercase: true,
            yahoo_remove_subaddress: true,
            icloud_remove_subaddress: true,                
        })
        return true
    }
    if (!validator.isEmail(selectedVal)) {
      // console.log('selectedVal plein faux')
        return false
    }
  }
    // return false
}

const options = { 
  minLength: 8, 
  minLowercase: 1, 
  minUppercase: 1, 
  minNumbers: 2, 
  minSymbols: 2, 
  returnScore: false, 
  pointsPerUnique: 1, 
  pointsPerRepeat: 0.5, 
  pointsForContainingLower: 10, 
  pointsForContainingUpper: 10, 
  pointsForContainingNumber: 10, 
  pointsForContainingSymbol: 10,
}
export const checkPassword = (selectedVal) => {
  if (isFull(selectedVal)) {
    if (validator.isStrongPassword(selectedVal, options)) {
      return true
    }
    return false
  }
}

export const isFull = (selectedVal) => {
  if (validator.isEmpty(selectedVal) === false) {
    return true
  }
  return false
}