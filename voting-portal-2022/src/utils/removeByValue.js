/**
 * Delete element from array with a perticular value
 */

export const removeByValue = (input, value) => {
  let arr = [...input];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      arr.splice(i, 1);
      i--;
    }
  }
  return arr;
};

