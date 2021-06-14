import renderFront from "../views/front";
import fs from "fs";
import path from "path";

module.exports = function(app) {

    app.get('/*', function(req,res) {
        var data = fs.readFileSync(`${path.join(__dirname, '../../', 'static')}/manifest.json`);
        let manifest = JSON.parse(data);
        const initialState = {
            main:{
                user: null,
            }
        };
        res.header("Content-Type", "text/html; charset=utf-8");
        res.status(200).end(renderFront(initialState, manifest));
    });
};
