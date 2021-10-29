let express = require('express')
let User = require("./crud.js")
let md5 = require("blueimp-md5")
let Teacher = require("./teacher.js")
let router = express.Router()
let Student = require("./student.js")

// 增
router.post("/user/register", (req, res) => {
    let body = req.body
    User.find({
        $or: [
            { username: body.username },
            { nikename: body.nikename }
        ]
    }, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                message: "查询失败,请联系后台"
            })
        }
        if (data.length !== 0) {
            return res.status(200).json({
                code: 2000,
                flag: false,
                message: "用户名或昵称已存在"
            })
        }

        body.token = md5(md5(body.username) + "buka")

        console.log(body);
        new User(body).save().then((data, err) => {
            if (data) {
                return res.status(200).json({
                    code: 2000,
                    flag: true,
                    message: "数据存储成功"
                })
            }
            if (err) {
                return res.status(500).json({
                    code: 3000,
                    flag: false,
                    message: "存储失败,请联系后台"
                })
            }

        })

    })
})

// 查
router.post("/user/login", (req, res) => {
    let body = req.body
    User.findOne({ username: body.username, password: body.password }, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                message: "登录失败,请联系后台"
            })
        }
        if (!data) {  //  data   tt  true     fasle    不走
            // data  ff  false   true    走
            return res.status(200).json({
                code: 2000,
                flag: false,
                message: "用户名或密码不存在"
            })
        }
        return res.json({
            "code": 2000,
            "flag": true,
            "message": "登录成功",
            "data": {
                "token": data.token
            }
        })
    })
})

//查用户信息
router.get("/user/info", (req, res) => {
    let body = req.query;
    User.findOne({
        token: body.token
    }, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                message: "token查询失败,请联系后台"
            })
        }
        if (!data) {  //  data   tt  true     fasle    不走
            // data  ff  false   true    走
            return res.status(200).json({
                code: 2000,
                flag: false,
                message: "token不存在"
            })
        }
        return res.json({
            "code": 2000,
            "flag": true,
            "message": "成功拿到所有数据",
            "data": {
                "nickname": data.nikename,
                "id": data._id
            }
        })
    })
})

// 退出
router.post("/user/logout", (req, res) => {
    let body = req.body
    User.findOne({ token: body.token }, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                message: "服务器后台错误"
            })
        }
        if (!data) {
            return res.status(200).json({
                code: 4000,
                flag: false,
                message: "token数据不存在"
            })
        }
        return res.status(200).json({
            code: 2000,
            flag: true,
            message: "退出成功"
        })

    })
})

// 查询所有
router.get("/teacher/list", (req, res) => {
    Teacher.find({}, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                message: "服务器后台错误"
            })
        }

        let content = data.length

        return res.status(200).json({
            "code": 2000,
            "flag": true,
            "message": "查询成功",
            "data": {
                content,
                "rows": data
            }
        })
    })
})

// 分页
router.post("/teacher/list", (req, res) => {
    let page = req.body.page || 1;   //  页数
    let size = req.body.size || 10;  //   一页显示多少条
    let searchMap = req.body.searchMap || {} //
    let obj = {}
    searchMap.jobnumber ? obj["jobnumber"] = searchMap.jobnumber : obj
    searchMap.name ? obj["name"] = searchMap.name : obj
    searchMap.role ? obj["role"] = searchMap.role : obj
    searchMap.entrydate ? obj["entrydate"] = searchMap.entrydate : obj
    Teacher.find(obj, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                message: "服务器后台错误"
            })
        }

        let content = data.length
        // skip  跳过多少条  limit 查询多少个  exec 当前面的代码 执行完毕后 产生的回调
        Teacher.find(obj).skip((page - 1) * parseInt(size)).limit(parseInt(size)).exec((err, data) => {
            if (err) {
                return res.status(500).json({
                    code: 3000,
                    flag: false,
                    message: "服务器后台错误"
                })
            }

            return res.status(200).json({
                "code": 2000,
                "flag": true,
                "message": "查询成功",
                "data": {
                    content,
                    "rows": data
                }
            })
        })
    })

})

// 教师存储
router.post("/teacher", (req, res) => {
    let obj = {
        jobnumber: req.body.jobnumber,
        name: req.body.name,
        role: req.body.role,
        entrydate: req.body.entrydate,
        phone: req.body.phone,
    }
    new Teacher(obj).save(function (err) {
        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                message: "服务器后台错误"
            })
        }

        return res.status(200).json({
            "code": 2000,
            "flag": true,
            "message": "新增成功",
        })
    })
})

// 教师编辑
router.get("/teacher", (req, res) => {
    Teacher.findById(req.query.id, (err, data) => {
        if (err) {
            return res.status(200).json({
                code: 3000,
                flag: false,
                message: "服务器后台错误"
            })
        }

        return res.status(200).json({
            "code": 2000,
            "flag": true,
            "message": "根据ID查找数据成功",
            "data": data
        })
    })
})

// 教师编辑（更新操作）
router.put("/teacher", (req, res) => {
    let id = req.body._id
    Teacher.findByIdAndUpdate(id, req.body, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                message: "服务器后台错误"
            })
        }

        return res.status(200).json({
            "code": 2000,
            "flag": true,
            "message": "修改教师信息成功"
        })
    })
})

// 教师删除
router.delete("/teacher", (req, res) => {
    Teacher.findByIdAndRemove(req.body.id, (err) => {
        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                message: "服务器后台错误"
            })
        }

        return res.status(200).json({
            "code": 2000,
            "flag": true,
            "message": "删除教师信息成功"
        })

    })
})

// 学生分页查询
router.post("/student/list", (req, res) => {
    let page = req.body.page || 1;   //  页数
    let size = req.body.size || 10;  //   一页显示多少条
    let searchMap = req.body.searchMap || {} //
    let obj = {}
    searchMap.stunum ? obj["stunum"] = searchMap.stunum : obj
    searchMap.name ? obj["name"] = searchMap.name : obj
    searchMap.teacher ? obj["teacher"] = searchMap.teacher : obj
    // searchMap.entrydate ? obj["entrydate"] = searchMap.entrydate : obj
    Student.find(obj, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                message: "服务器后台错误"
            })
        }

        let content = data.length
        // skip  跳过多少条  limit 查询多少个  exec 当前面的代码 执行完毕后 产生的回调
        Student.find(obj).skip((page - 1) * parseInt(size)).limit(parseInt(size)).exec((err, data) => {
            if (err) {
                return res.status(500).json({
                    code: 3000,
                    flag: false,
                    message: "服务器后台错误"
                })
            }

            return res.status(200).json({
                "code": 2000,
                "flag": true,
                "message": "查询成功",
                "data": {
                    content,
                    "rows": data
                }
            })
        })
    })

})
// 学生新增
router.post("/student", (req, res) => {
    // console.log(req.body);
    let obj = {
        stunum: req.body.stunum,
        name: req.body.name,
        admissiondate: req.body.admissiondate,
        phone: req.body.phone,
        teacher: req.body.teacher,
        class: req.body.class,
        job: req.body.job,
        money: req.body.money,
    }
    new Student(obj).save(function (err) {
        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                message: "服务器后台错误"
            })
        }

        return res.status(200).json({
            "code": 2000,
            "flag": true,
            "message": "新增成功",
        })
    })
})
// 学生查询
router.get("/student", (req, res) => {
    Student.findById(req.query.id, (err, data) => {
        if (err) {
            return res.status(200).json({
                code: 3000,
                flag: false,
                message: "服务器后台错误"
            })
        }
        return res.status(200).json({
            "code": 2000,
            "flag": true,
            "message": "根据ID查找数据成功",
            "data": data
        })
    })
})
// 学生更新
router.put("/student", (req, res) => {
    // console.log(req.body);
    let id = req.body._id
    Student.findByIdAndUpdate(id, req.body, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                message: "服务器后台错误"
            })
        }

        return res.status(200).json({
            "code": 2000,
            "flag": true,
            "message": "修改学员信息成功"
        })
    })
})

// 学员的删除
router.delete("/student", (req, res) => {
    Student.findByIdAndRemove(req.body.id, (err) => {
        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                message: "服务器后台错误"
            })
        }

        return res.status(200).json({
            "code": 2000,
            "flag": true,
            "message": "删除学员信息成功"
        })

    })
})

// 修改密码（原密码的查询）
router.post("/user/pwd", (req, res) => {
    // console.log(req.body);
    let data = req.body
    User.findOne({
        _id: data.id,
        password: data.pwd
    }, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                message: "服务器后台错误"
            })
        }

        if (!data) {
            return res.status(200).json({
                "code": 4000,
                "flag": false,
                "message": "密码不正确"
            })
        }

        return res.status(200).json({
            "code": 2000,
            "flag": true,
            "message": "密码正确"
        })
    })
})


router.put("/user/pwd", (req, res) => {
    // console.log(req.body);
    let data = req.body
    User.findOne({
        _id: data.id
    }, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                message: "服务器后台错误"
            })
        }

        if (!data) {
            return res.status(200).json({
                "code": 4000,
                "flag": false,
                "message": "密码不正确"
            })
        }

        // console.log(data);
        data.password=req.body.pwd    
        User.findByIdAndUpdate(req.body.id, data, (err) => {
            if (err) {
                return res.status(500).json({
                    code: 3000,
                    flag: false,
                    message: "服务器后台错误"
                })
            }

            return res.status(200).json({
                "code": 2000,
                "flag": true,
                "message": "修改密码成功"
            })
        })

    })

})

module.exports = router
