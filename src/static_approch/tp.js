const input = {
  a: null,
  b: 1,
  c: "",
  d: {
    e: false,
    f: "hello",
    g: {
      h: undefined,
      i: 0,
      j: { aa: "world" },
    },
  },
  k: [0, 1, false, 2, "", 3],
};

function showTrueValues(input) {
  let trueVal = [];
  let result = {};
  for (key in input) {
    if (input[key]) {
      result[key] =
        typeof input[key] != "object" ? input[key] : showTrueValues(input[key]);
      // console.log(result)
      trueVal.push(result);
    }

    // if(input[key]){
    //   if(typeof input[key] == "object"){
    //     // console.log(input[key])
    //     result = typeof input[key] == "object" && showTrueValues(input[key])
    //   }
    // }
  }
  console.log(trueVal);
  // console.log(result)
}

console.log(showTrueValues(input));
