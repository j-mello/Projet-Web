const utlis = require("./utils.js")

utlis.executeQuery("select * from UTILISATEURS", null,(err, res) => {
	if (err){
		console.log(err)}
	else console.log(res)
}

)