$(function(){

    //获取本地存储数据，并且转换成对象
	/*
    var arr = [];
    function getData(){
      if(localStorage.tableList == undefined){
        arr = [];
      }else{
        arr = JSON.parse(localStorage.tableList);
      }
      return arr;
    }
	*/
    //add()
	tabData = new tableObj();
	//tab.insert(["n","n","n","n","n","n"]);
	//tab.setRepairInfo(1, "你大爷还是你大爷");
	$("#edit").click(editTable);
	$("#insert").click(insertTR);
	$("#update").click(updateSerTB);
	$("#write").click(writeFile);
	
	
	window.isUpdating = true;
	syncData();

    //把数据存到本地存储，并且转换成字符串格式的JSON
    function saveData(data){
    //  var data = getData();
    //  JSON.stringify(localStorage.tableList);
      localStorage.tableList = JSON.stringify(data);
    }

	function syncData(){
	setInterval(getUpDate,1000);
	}
	function postData(e)
	{
		var obj = new Array();
		obj.push(this.id.substr(3));
		obj.push("");
		obj.push("");
		obj.push("");
		obj.push("");
		obj.push($("#tv"+this.id.substr(3)).text());
		
		$.ajax({
		  type: 'POST',
		  url: "PUT",
		  data: JSON.stringify(obj),
		  success: succeedRet,
		  dataType: "json"
		});

	}
	function succeedRet(data, status, xhr)
	{
		console.log(status);
	}
	function insertData(e)
	{
		console.log("insertData");
		var obj = new Array();
		var tr = $("tab tr:last");
		
		for(var i=0; i<5; i++)
		{
			obj.push($("#tab tr:last").find("td").eq(i).text());			
		}
		$("#tab tr:last").remove();
		window.isUpdating=true;
		$.ajax({
		  type: 'POST',
		  url: "PUT",
		  data: JSON.stringify(obj),
		  //success: none,
		  dataType: "json"
		});
		
	}
	function createTRStr(index)
	{
		trHtml = "<tr>"+
		"<td contenteditable='true'></td>"+
		"<td contenteditable='true'></td>"+
		"<td contenteditable='true'></td>"+
		"<td contenteditable='true'></td>"+
		"<td contenteditable='true'></td>"+
		"<td>"+"<div id='tv"+index+"'" +
		" class='tv' contenteditable='true'></div><button class='btn' "+"id='btnInsert'"+">sumit</button>"+"</td>"+"</tr>";
		
		return trHtml;
	}
	function editItem()
	{
		$("#edit").css("display","inline");
		$("#show").css("display","none");
	}
	function upDateTB()
	{
		var jsonObj = tabData.data;

		var trHtml;

		$(jsonObj).each(function(index, item){
			trHtml="";
			var $tr=$("#tab").find("tr").eq(index+1);
			if($tr.size()==0){

					$tr=$("#tab tr:last")
					trHtml = "<tr>"+
					"<td>"+item[0]+"</td>"+
					"<td>"+item[1]+"</td>"+
					"<td>"+item[2]+"</td>"+
					"<td>"+item[3]+"</td>"+
					"<td>"+item[4]+"</td>"+
					"<td contenteditable='true'></td>"+
					"<td><button " + "id='btn"+index+"'"+ ">保存</button></td>"+
					"</tr>";	
					$tr.after(trHtml);
					$("#btn"+index).click(submit);
					function submit()
					{
						var index = Number(this.id.substr(3));						
						var data = $("#tab").find("tr").eq(index+1).find("td").eq(5).text();
						console.log(data);						
						$.ajax({
						 type: 'POST',
						 url: "PUT",
						 data: JSON.stringify({index, data}),
						 //success: none,
						 dataType: "json"
						});
								
					}
					
			}
			else
			{
				var $td = $("#tab").find("tr").eq(index+1).find("td").eq(5);
				var originStr = $td.text();
		
				if(item[5]!==originStr && !$td.is(':focus'))
				{
					$("#tab").find("tr").eq(index+1).find("td").eq(5).text(item[5]);
				}
			}
					 
		});
		
	}
	function editTable()
	{
		var theResponse = window.prompt("请输入密码：");
		if(theResponse!="666")
		{
			return;
		}
		window.isUpdating=false;
		$("#showTB").css("display","none");
		$("#editTB").css("display","inline");
		htmlobj = $.ajax(
		{ 
			type: "GET",
			url: "update", 
			context: "update",
			cache: false,
			success: function(data, textStatus, jqXHR)
			{
				tabData.data.splice(0, tabData.data.length);
				tabData.data = JSON.parse(data);
				insertTable();				
			}
		})	
		
	
	}
	function getUpDate()
	{
		htmlobj = $.ajax(
		{ 
			type: "GET",
			url: "update", 
			context: "update",
			cache: false,
			success: upTabDate
		})		
	}
	function postUpDate()
	{
		htmlobj = $.ajax(
		{ 
			type: "post",
			url: "update", 
			data: JSON.stringify(tabData.data),
			context: "update",
			cache: false,
			dataType: "json"
			//success: upTabDate
		})		
	}
	function upTabDate(data, textStatus, jqXHR )
	{
		tabData.clear();
		tabData.data = JSON.parse(data);
		upDateTB();			
	}
	function insertTable()
	{

		$(tabData.data).each(function(i, ittr){
			var $tr=$("#tabEdit").find("tr").eq(i+1);
			if($tr.size()==0)
			{
				console.log("empty");
				var trHtml = "<tr>"
				$(ittr).each(function(j, ittd){
				var trStr = ittd?ittd:"";
				trHtml+= "<td contenteditable='true'>"+trStr+"</td>";
				});
				trHtml += "</tr>";
				var $trl=$("#tabEdit tr:last")
				$trl.after(trHtml);				
			}

					
		});
		var sizeRow = $("#tabEdit").find("tr").length;
		console.log("sizeRow:" + sizeRow);
	}
	function insertTR()
	{
		var trHtml = "<tr>"
		for(var i=0; i<6; i++)
		{
			trHtml += "<td contenteditable='true'></td>";
		}
		trHtml += "</tr>"
		$tr = $("#tabEdit tr:last");
		$tr.after(trHtml);
	}
	function collectTableData(idTB)
	{
		console.log("update");
		var sizeRow = $(idTB).find("tr").length;
		var sizeCol = 6;
		console.log(sizeRow + ":" + sizeCol);
		console.log("length:"+tabData.data.length);
		for(var i=1; i<sizeRow; i++)
		{
			var trData = new Array();
			for(var j=0; j<sizeCol; j++)
			{
				var celltext = $(idTB).find("tr").eq(i).find("td").eq(j).text();
				trData.push(celltext);
			}
			console.log("trData:"+trData);
			tabData.insert(trData);			
		}
		console.log(tabData.data);
	}
	function updateSerTB()
	{
		tabData.clear();
		collectTableData("#tabEdit");
		postUpDate();
		$("#showTB").css("display","inline");
		$("#editTB").css("display","none");
		//insertTable();
	}
	function writeFile()
	{
		htmlobj = $.ajax(
		{ 
			type: "GET",
			url: "write", 
			context: "write",
			cache: false,
			//success: upTabDate
		})		
	}
})
