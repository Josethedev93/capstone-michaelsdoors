require('dotenv').config();
const { query } = require('express');
const Sequelize = require('sequelize');
const { CONNECTION_STRING } = process.env;


const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  });

    const createDoorForm = (req, res) => {
       let {
            name,
            address,
            hinge,
            width,
            height,
            thickeness,
            swing,
            prep,
            frame
       } = req.body

       sequelize.query(`INSERT INTO door_form (name, address, hinge, width, height, thickeness, swing, prep, frame)
       VALUES ('${name}', '${address}', '${hinge}', '${width}', '${height}', '${thickeness}', '${swing}', '${prep}', '${frame}' )`
       ).then((dbRes) => {
        res.status(200).send(dbRes[0])
     })
    };

    const getDoorForm = (req, res) => {
        sequelize.query(`SELECT form_id, name, address, hinge, width, height, thickeness, swing, prep, frame FROM door_form ORDER by name, address LIMIT 20;`).then((dbRes) => {
            res.status(200).send(dbRes[0])
         })
    }

    const  deleteForm = (req, res) => {
        const { id } = req.params;
        console.log(id)
        sequelize.query(`
          DELETE FROM door_form WHERE form_id = ${id};
          SELECT * FROM door_form ORDER BY form_id;
          `).then((dbRes) => {
          res.status(200).send(dbRes[0]);
        })
      }

    //   const updateForm = (req, res) => {
    //     let {
    //         name,
    //         address, 
    //         hinge, 
    //         width, 
    //         height, 
    //         thickeness, 
    //         swing, 
    //         prep, 
    //         frame
    //     } = req.body
    

    //     sequelize.query(`update door_form set name = 
    //     '${name}', 
    //     '${address}', 
    //     '${hinge}', 
    //     '${width}', 
    //     '${height}', 
    //     '${thickeness}', 
    //     '${swing}', 
    //     '${prep}', 
    //     '${frame}'
    //     where form_id = ${formId};
    //     ;`)
    //         .then(() => res.sendStatus(200))
    //         .catch(err => console.log(err))
    // }

module.exports = {
  seed: (req, res) => {
            sequelize.query(`
                drop table if exists door_form;
              
                CREATE TABLE door_form ( form_id SERIAL PRIMARY KEY , name VARCHAR(50) , address VARCHAR (100) , hinge varchar (100) , width varchar (100) , height varchar (100) , 
                thickeness varchar (100) , swing varchar (50) , prep varchar (50) , frame varchar (50));
                
            `).then(() => {
                console.log('DB seeded')
                res.sendStatus(200)
            }).catch(err => console.log('error seeding DB', err))
        },
        createDoorForm,
        getDoorForm,
        deleteForm,
        // updateForm
}