import mySql from 'mysql';
import {logError, logSuccess, logProcessing} from '../chalkConfig';
import config from 'config';
/* eslint-disable no-console */

export function getUsers (args) {       
    let sql = 'SELECT * FROM config.`users`',
        connection = mySql.createConnection(config.get("mySQl"));

    console.log(logProcessing("users: Processing"));
    connection.connect();

        return new Promise((resolve) => {
                if(args) {
                    sql +=" WHERE 1=1 ";
                }
                if(args.id) {
                    sql +="and id="+ args.id + " ";
                }

                if(args.name) {
                    sql +="and (first_name like '%" + args.name+  "%' or last_name like '%" + args.name;
                    sql +="%' or user_name like '%" + args.name+  "%' )";
                }
                console.log(logProcessing(sql));
                connection.query(sql, (error, results) => {
                    if (error){
                        console.log(logError(error)); 
                        throw error;
                    }
                    resolve(results);
                    connection.destroy();
                    console.log(logSuccess("getUsers succefully"));        
                });
            });
    } 

   export function  getOrgs(user_id) {
        let sql = 'SELECT o.* FROM  `config`.organizations o, `config`.user_organizations u ' +
        'WHERE u.`organization_id` = o.id and u.user_id =' + user_id.id,      
            connection = mySql.createConnection(config.get("mySQl"));
        
        connection.connect();
        
        return new Promise((resolve) => {
                connection.query(sql, (error, organizations) => {
                    if (error){
                            console.log(logError(error));  
                            throw error;
                        }
                    resolve(organizations);
                    connection.destroy();
                });
            });
        }
