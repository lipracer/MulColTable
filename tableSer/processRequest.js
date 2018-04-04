function tableObj()
{
	this.data = new Array();
	this.data.push(["编号","负责人","崩溃次数","来源","栈信息","修复说明"]);
	that = this;
	this.insert = function(tdData)
	{
		that.data.push(tdData);
	}
	this.setRepairInfo = function(index, info)
	{
		that.data[index][5] = info;
	}
}
