function tableObj() {
	this.data = new Array();
	that = this;
	this.insert = function (tdData) {
		that.data.push(tdData);
	}
	this.setRepairInfo = function (index, info) {
		that.data[index][5] = info;
	}
	this.clear = function () {
		that.data.splice(0, that.data.length);
	}
}