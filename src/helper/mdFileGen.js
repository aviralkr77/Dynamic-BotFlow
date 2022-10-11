import * as fs from 'fs'
import moment from 'moment';

const genIntent = () =>{

    fs.readFile('intent.txt','utf8' , function(err,data){
        console.log(data);
        fs.writeFile(`${moment.format('ddhhmmsss')}.txt`,data)
        });

}

export default genIntent

