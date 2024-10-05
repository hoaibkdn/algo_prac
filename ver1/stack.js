/*
stack = [5, 7, -6, 4, 1, -3]
=> [-6, -3, 1, 4, 5, 7]
x = -6, curSize = 3
[-3, 1, 4, ] -> [5, 7]
[-6, -3, 1, 4, 7]
*/

var sortStack = function(stack) {
  const tempStack = []
  while(stack.length) {
    if(tempStack.length === 0) {
      tempStack.push(stack.pop())
    } else {
      let curSize = 0
      let topValTemp = tempStack.pop()
      const curValStack = stack.pop()
      let isZero = false
      while(topValTemp > curValStack) {
        stack.push(topValTemp)
        curSize++
        if(!tempStack.length) {
          isZero = true
          break
        }
        topValTemp = tempStack.pop()
        // console.log(stack, tempStack)
      }
      if(!isZero && topValTemp <= curValStack) {
        tempStack.push(topValTemp)
      }
      tempStack.push(curValStack)
      while(curSize > 0) {
        tempStack.push(stack.pop())
        curSize--
      }
    }
    // console.log(stack, tempStack)
  }
  return tempStack
}

// console.log(sortStack([5, 7, -6, 4, 1, -3]))

