'use strict';
const BackBar = require("./lib/dynamodb-backbar.js");

(async () => {
  const backBar = new BackBar('ap-northeast-1', 'http://localhost:8002'); // local
  // const backBar = new BackBar('ap-northeast-1'); //
  const queries = [
    backBar.queryByName('キューバ・リブレ'),
    backBar.scanByKeyword('村上')
  ];

  const results = await Promise.all(queries).catch(errorAction);
  const cocktails = results[0].Items.concat(results[1].Items);

  cocktails.forEach(item => {
    console.log(item.name);
  });
})();

function errorAction(error) {
  console.log("Error!!", error);
}