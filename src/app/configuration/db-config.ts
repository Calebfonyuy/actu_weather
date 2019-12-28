import {DBConfig} from 'ngx-indexed-db';

export const dbConfig : DBConfig = {
    name :'actuWeatherDb', version : 1, objectStoresMeta :[
        {
            store :'user',
            storeConfig :{keyPath :'id', autoIncrement : true },
            storeSchema :[
                {name : 'name', keypath :'name', options :{ unique:false}},
                {name :'surname', keypath:'surname', options:{unique : false}},
                {name :'birthday', keypath :'birthday', options :{unique : false}},
                {name :'sex', keypath :'sex', options :{unique : false}},
                {name :'password', keypath :'password', options :{unique : false}},
                {name :'address', keypath :'address', options :{unique : false}},
                {name :'photo', keypath :'photo', options :{unique : false}},
            ]
        }
    ]
};
