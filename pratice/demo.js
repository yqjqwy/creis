var deepAttr = {
    a: {
        b: {
            c: 15
        }
    }
};
var pluckDeep = path => obj =>
    path.split(".").reduce((val, attr) => val[attr], obj);

pluckDeep("a.b.c")(deepAttr);

var pluckDeep = path => {
    return obj => {
        return path.split(".").reduce((val, attr) => val[attr], obj);
    }
}

var objLikeArr = [
    ["name", "Jim"],
    ["age", 18],
    ["single", true]
];

const fromPairs = pairs =>
    pairs.reduce((res, pair) => ((res[pair[0]] = pair[1]), res), {});

var fromPairsss = pairs =>
    pairs.reduce((res, pair) => {
        console.log(res, pair);
        return ((res[pair[0]] = pair[1]), res)
    }, {});
fromPairsss(objLikeArr);

const users = [{
        name: "Adam",
        age: 30,
        sex: "male"
    },
    {
        name: "Helen",
        age: 27,
        sex: "female"
    },
    {
        name: "Amy",
        age: 25,
        sex: "female"
    },
    {
        name: "Anthony",
        age: 23,
        sex: "male"
    },
];

const partition = (arr, isValid) =>
    arr.reduce(
        ([pass, fail], elem) =>
        isValid(elem) ? [
            [...pass, elem], fail
        ] : [pass, [...fail, elem]], [
            [],
            []
        ],
    );

const isMale = person => person.sex === "male";

const [maleUser, femaleUser] = partition(users, isMale);

//两个数组相加
const num1 = [3, 4, 5, 6, 7];
const num2 = [43, 23, 5, 67, 87, 3, 6];

let num3 = [];
num1.forEach((item, index) => {
    num3.push(item + num2[index])
})

let diObj = {
    handle: function (n) {
        return n + 2
    }
}
Array.from(
    [1, 2, 3, 4, 5],
    (x) => {
        return this.handle(x)
    },
    diObj)