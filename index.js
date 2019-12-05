const csv = require('csv-parser')
const fs = require('fs')
const _ = require('lodash');
const figlet = require('figlet');
const results = [];
let filtered;

txt(`
Bzx iSAi iDAI
Migrated Analytics
by Recipes 
`);

parseCsv();

function parseCsv() {
    fs.createReadStream('./csv/bzx-migration-05-12-2019-address-token-0x512b9ad4764cc18f6ce414d0df2ecc00fe9481ee.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      filtered = _.map(_.uniqBy(results, 'Txhash'), (r) =>{
          return {
              Txhash: r.Txhash,
              Val: r.Value,
              DateTime: r.DateTime
          }
      });
      console.table(filtered);
  
      const total = _.reduce(filtered, function(sum, n) {
          return sum + parseFloat(_.replace(n.Val, ',', ''));
      }, 0);
  
      console.log('Total:', total.toString());
    });
}

function txt(txt) {
    figlet.text(txt, {
        font: 'Sub-Zero',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data);
    });   
}
