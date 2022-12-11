module.exports = {
  getAnswers(req, res) {
    res.render("getAnswers", {
      path: "/get-answers",
      pageTitle: "Get Answers",
      result: null,
    });
  },

  async postAnswers(req, res) {
    let alpha = ["A", "B", "C", "D"];

    const { input: encodedInput } = req.body;
    const input = Buffer.from(encodedInput, "base64").toString("utf-8");

    const splitMul = input.split(`"tp":"MultipleChoice","D":{"h":"`);
    const str = [];
    const result = new Array(splitMul.length);

    for (let i = 1; i < splitMul.length; i++) {
      result[i] = { question: "", answers: [], correct: 0 };
      let from = 0;
      from = splitMul[i].indexOf('["', from) + 2;
      let temp = `${splitMul[i].slice(
        from,
        splitMul[i].indexOf('"]', from)
      )}\n`;

      result[i].question = temp;

      for (let j = 0; j < 4; j++) {
        from = splitMul[i].indexOf('["', from) + 2;
        let ans = alpha[j] + ". ";
        ans += splitMul[i].slice(from, splitMul[i].indexOf('"]', from));
        from = splitMul[i].indexOf('"c":', from) + 1;
        from = splitMul[i].indexOf('"c":', from) + 4;
        if (splitMul[i][from] == "t") result[i].correct = j;
        result[i].answers[j] = ans;
        temp += `${ans}\n`;
      }
      temp += "\n";
      str.push(temp);
    }

    function sortComparer(a, b) {
      return a.localeCompare(b);
    }
    str.sort(sortComparer);
    return res.render("getAnswers", {
      path: "/get-answers",
      pageTitle: "Get Answers",
      result,
    });
    // for (let i = 1; i < splitMul.length; i++) {
    //   fs.appendFileSync(
    //     "src\\file\\split.html",
    //     `${splitMul[i]}
    // ---------------------------------------------------------------------------------------------------------------------------------------------\n`,
    //     function (err) {}
    //   );
    //   let from = 0;
    //   from = splitMul[i].indexOf('["', from) + 2;
    //   let temp = `${splitMul[i].slice(
    //     from,
    //     splitMul[i].indexOf('"]', from)
    //   )}\n`;
    //   for (let j = 0; j < 4; j++) {
    //     from = splitMul[i].indexOf('["', from) + 2;
    //     let ans = alpha[j] + ". ";
    //     ans += splitMul[i].slice(from, splitMul[i].indexOf('"]', from));
    //     from = splitMul[i].indexOf('"c":', from) + 1;
    //     from = splitMul[i].indexOf('"c":', from) + 4;
    //     if (splitMul[i][from] == "t") ans = ans + " <= ĐÚNG";
    //     temp += `${ans}\n`;
    //   }
    //   temp += "\n";
    //   str.push(temp);
    // }
    // function sortComparer(a, b) {
    //   return a.localeCompare(b);
    // }
    // str.sort(sortComparer);
    // let stt = 71;
    // for (let i = 0; i < str.length; i++) {
    //   appFile(`${++stt}. ${str[i]}`);
    // }
    // open("src\\file\\multipleChoice.txt");
  },
};
