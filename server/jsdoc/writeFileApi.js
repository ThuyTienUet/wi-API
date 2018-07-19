let fs = require('fs');

module.exports.fileApiAuth = function (req, res) {
    let data = req.body;
    writeFile('apiAuth', 'API_Authenticate', data);

}

module.exports.fileApiCom = function (req, res) {
    let data = req.body;
    writeFile('apiCom', 'API_Communication', data);

}

module.exports.fileApiWI = function (req, res) {
    let data = req.body;
    writeFile('apiWI', 'API_well_insight', data);

}

module.exports.fileApiSOM= function (req, res) {
    let data = req.body;
    writeFile('apiSOM', 'API_SOM', data);

}

module.exports.fileApiOnl = function (req, res) {
    let data = req.body;
    writeFile('apiOnl', 'wi-online', data);

}

module.exports.fileWIPM = function (req, res) {
    let data = req.body;
    writeFile('WIPM', 'WIPM', data);
}

function writeFile(fileName, moduleName, data) {
    fs.writeFileSync('./demo/src/' + fileName + '.js', '');
    let str = '/**\n * @fileoverview Module\n */';
    str += '\n/**\n * @module ' + moduleName + '\n */';
    for (let i = 0; i < data.length; i++) {
        str += '\n/**'
        let param = JSON.parse(data[i].payloadParams);

        str += getParam(param, null);
        str += '\n * @implements Method: ' + data[i].method;
        str += '\n * @implements Route: ' + data[i].route;
        str += '\n * @implements Note: ' + data[i].note;

        str += '\n * @example Example Response: \n' + objToStr(JSON.parse(data[i].response));
        if (fileName == 'apiAuth') {
            str += '\n * @example Example Error Response: \n' + objToStr(JSON.parse(data[i].errResponse));
        } else {
            str += '\n * @example Example Payload: \n' + objToStr(JSON.parse(data[i].samplePayload));
        }

        str += '\n */\n';

        let arr = data[i].name.split(" ");
        let tmp = '';
        for (let i in arr) {
            if (arr[i] == '-') arr[i] = '';
            else tmp += arr[i] + '_';
        }
        tmp = tmp.substring(0, tmp.length - 1);
        str += 'function ' + tmp + '(';
        for (let key in param) {
            let val = param[key];
            str += `${key}` + ', ';
        }
        if (data[i].payloadParams != '{}') {
            str = str.substring(0, str.length - 2);
        }
        str += ') {}';
    }
    fs.writeFileSync('./demo/src/' + fileName + '.js', str);
}

function objToStr(obj) {
    let count = 0;
    let c = 0;
    function toString(obj) {
        count++;
        let dest = "{\n";
        for (let key in obj) {
            c++;
        }
        for (let key in obj) {
            c--;
            for (let i = 0; i < count; i++) {
                dest += "\t";
            }
            const val = obj[key];
            dest += `"${key}" : `
            if (typeof val !== 'object') {
                if (typeof val !== 'number') {
                    dest += `"${val}"`;
                } else {
                    dest += `${val}`;
                }
            } else {
                dest += `${toString(val)}`;

            }
            if (c != 0) {
                dest += ", \n";
            } else {
                dest += "\n"
            }
        }
        count--;
        let tmp = "";
        for (let i = 0; i < count; i++) {
            tmp += "\t";
        }
        dest += tmp + "}";
        return dest;
    }
    function cleaning(str) {
        return str.replace(/\,(\s)+\}/g, '\n }');
    }
    return cleaning(toString(obj));
}

function getParam(obj, parent) {
    function param(obj, parent) {
        let dest = '';

        for (let key in obj) {
            const val = obj[key];
            if (typeof val !== 'object') {
                if (parent != null) {
                    dest += '\n * @param {' + `${val}` + '} ' + parent + '.' + `${key}`;
                } else
                    dest += '\n * @param {' + `${val}` + '} ' + `${key}`;
            } else {
                dest += '\n * @param {object}' + `${key}`;
                dest += `${param(val, key)}`;
            }
        }
        return dest;
    }
    return param(obj);
}