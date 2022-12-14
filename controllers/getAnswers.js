const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const got = require("got");

module.exports = {
  getAnswers(req, res) {
    res.render("getAnswers", {
      path: "/get-answers",
      pageTitle: "Get Answers",
      result: null,
    });
  },

  async postAnswers(req, res) {
    let input;
    const inputStr = req.body.input;
    if (inputStr.slice(0, 4) === "http") {
      try {
        let { body: result } = await got(inputStr);
        result = result.replace(/(\r\n|\n|\r)/gm, "");
        result = result.replace(/\s/g, "");
        const startSplit = result.indexOf(`data="`) + 6;
        result = result.slice(startSplit, result.indexOf(`";`, startSplit));
        input = Buffer.from(result, "base64").toString("utf-8");
      } catch (error) {
        res.send("Cannot access the url");
      }
    } else {
      input = Buffer.from(req.body.input, "base64").toString("utf-8");
    }

    let alpha = ["A", "B", "C", "D"];
    const splitMul = input.split(`"tp":"MultipleChoice","D":{"h":"`);
    const result = new Array(splitMul.length);
    for (let i = 1; i < splitMul.length; i++) {
      result[i] = { question: "", answers: [], correct: 0 };
      let from = 0;
      from = splitMul[i].indexOf('["', from) + 2;
      let temp = `${splitMul[i].slice(
        from,
        splitMul[i].indexOf('"]', from)
      )}`.slice(0, 500);

      result[i].question = temp;

      for (let j = 0; j < 4; j++) {
        from = splitMul[i].indexOf('["', from) + 2;
        let ans = alpha[j] + ". ";
        ans += splitMul[i].slice(from, splitMul[i].indexOf('"]', from));
        from = splitMul[i].indexOf('"c":', from) + 1;
        from = splitMul[i].indexOf('"c":', from) + 4;
        if (splitMul[i][from] == "t") result[i].correct = j;
        result[i].answers[j] = ans.slice(0, 500);
      }
    }

    return res.render("getAnswers", {
      path: "/get-answers",
      pageTitle: "Get Answers",
      result,
    });
  },
};
