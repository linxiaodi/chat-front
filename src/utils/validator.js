export default (function () {
  const strategies = {
    noEmpty(value, errorMsg) {
      if (!value) return errorMsg
      return false
    },
    sameValue(valueArray, errorMsg) {
      console.log(valueArray)
      if (valueArray[0] !== valueArray[1]) return errorMsg
      return false
    },
    minLength(value, minLen, errorMsg) {
      if (value.length < minLen) return errorMsg
      return false
    }
  }

  class Validator {
    constructor() {
      this.cache = []
    }

    add(value, rule, errorMsg) {
      const arg = rule.split(':')
      const strategyName = arg.shift()
      this.cache.push(() => {
        return strategies[strategyName].apply(null, [value, ...arg, errorMsg])
      })
    }

    start() {
      for (let i = 0; i < this.cache.length; i += 1) {
        const current = this.cache[i]
        const result = current()
        if (result) {
          return result
        }
      }
      return false
    }
  }

  return Validator
}())
