function isNull(str) {
	if (str == "") return true;
	var regu = "^[ ]+$";
	var re = new RegExp(regu);
	return re.test(str);
}

module.exports = {
	isNull: isNull,
}
