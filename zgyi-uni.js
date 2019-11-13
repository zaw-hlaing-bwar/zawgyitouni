const assert = require("assert");
const google_myanmar_tools = require("myanmar-tools");
const _ = require("underscore");
const detector = new google_myanmar_tools.ZawgyiDetector();
const converter = new google_myanmar_tools.ZawgyiConverter();

// Unicode string:
const input1 = "အပြည်ပြည်ဆိုင်ရာ လူ့အခွင့်အရေး ကြေညာစာတမ်း";
// Zawgyi string:
const input2 = "အျပည္ျပည္ဆိုင္ရာ လူ႔အခြင့္အေရး ေၾကညာစာတမ္း";

function zgyi2uni(req, res){
    let data = req.body.input
    if (typeof data !== "string" && !Array.isArray(data) && typeof data !== "object") {
        return res.send({
            status: false,
            errMsg: "input must be array or string"
        })
    }

    if(typeof data === "string") {
        return res.send({
            status: true,
            data: detect(data)
        })
    }

    if(typeof data === "object" && !Array.isArray(data)) {
        return res.send({
            status: true,
            data: transformObj(data)
        })
    }

    if(Array.isArray(data)) {
        return res.send({
            status: true,
            data: transformArray(data)
        })
    }
}

function transformArray(arr) {
    const map1 = arr.map(x => detect(x));
    return map1
}

function transformObj(obj) {
    const map1 = _.mapObject(obj, (x, y) => detect(x))
    return map1
}

function detect(string) {
    if(Array.isArray(string)) {
        return transformArray(string)
    }

    if(typeof string === "object") {
        return transformObj(string)
    }

    if(typeof string !== "string") {
        return string
    }
    const score = detector.getZawgyiProbability(string);
    let returnString = string
    if (score > 0.999) {
        returnString = converter.zawgyiToUnicode(string)
    }
    console.log(returnString)
    return returnString
}

module.exports = {zgyi2uni}