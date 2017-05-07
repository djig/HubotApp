import mySql from 'mysql';

export class DBUtil {
    constructor() {
        this.connection = mySql.createConnection({
            host     : 'wc-dev04.cl.adap.tv',
            user     : 'flixtrix',
            password : 'local',
            database : 'config'
        });
        this.connection.connect();
    }
    getUsers (args) {
        let sql = 'SELECT * FROM config.`users`';
            return new Promise((resolve) => {
                    if(args) {
                        sql +=" WHERE ";
                    }
                    if(args.id) {
                        sql +="id="+ args.id;
                    }

                    if(args.name) {
                        sql +="(first_name like '%" + args.name+  "%' or last_name like '%" + args.name;
                        sql +="%' or user_name like '%" + args.name+  "%' )";
                    }
                    console.log(sql);
                    this.connection.query(sql, (error, results) => {
                        if (error) throw error;
                        resolve(results);            
                    });
                });
        } 

    getOrgs(user_id) {
        let sql = 'SELECT o.* FROM  `config`.organizations o, `config`.user_organizations u ' +
        'WHERE u.`organization_id` = o.id and u.user_id =' + user_id.id;      
        return new Promise((resolve) => {
                this.connection.query(sql, (error, organizations) => {
                    resolve(organizations);
                });
            });
        }
}