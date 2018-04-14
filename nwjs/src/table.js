$(function(){
    //获取本地存储数据，并且转换成对象
    var arr = [];
    function getData(){
      if(localStorage.tableList == undefined){
        arr = [];
      }else{
        arr = JSON.parse(localStorage.tableList);
      }
      return arr;


    }
    //add()
	$("#edit").click(editTable);
	window.isUpdating = true;
	syncData();

    //把数据存到本地存储，并且转换成字符串格式的JSON
    function saveData(data){
    //  var data = getData();
    //  JSON.stringify(localStorage.tableList);
      localStorage.tableList = JSON.stringify(data);
    }

	function syncData(){
	setInterval(requestUpate,
	  1000);
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
	function upDateTB(htmlobj)
	{
		var jsonObj = JSON.parse(htmlobj);
		console.log(htmlobj);
		var trHtml;

		$(jsonObj).each(function(index, item){
			trHtml="";
			var $tr=$("#tab").find("tr").eq(index);
			if($tr.size()==0){
				if(0==index){
					trHtml = "<tr>"+
					"<td>"+item[0]+"</td>"+
					"<td>"+item[1]+"</td>"+
					"<td>"+item[2]+"</td>"+
					"<td>"+item[3]+"</td>"+
					"<td>"+item[4]+"</td>"+	
					"<td>"+item[5]+"</td></tr>";
					$("#tab").html(trHtml);
					
				}
				else
				{
					$tr=$("#tab tr:last")
					trHtml = "<tr>"+
					"<td>"+item[0]+"</td>"+
					"<td>"+item[1]+"</td>"+
					"<td>"+item[2]+"</td>"+
					"<td>"+item[3]+"</td>"+
					"<td>"+item[4]+"</td>"+
					"<td>"+"<div id='tv"+index+"'" + " class='tv' contenteditable='true'></div><button class='btn' "+"id='btn"+index+"'"+">sumit</button>"+"</td>"+
					"</tr>";	
					$tr.after(trHtml);
					$("#btn"+index).click(postData);
					$("#tv"+index).focus(function(){console.log("focus");window.isUpdating=false;});
					$("#tv"+index).blur(function(){console.log("blur");window.isUpdating=true;});					
				}
			}
			else if(index!=0 && item.length==6)
			{
				console.log(""+index+" "+item[5]);
				$("#tv"+index).text(item[5]);
			}
					 
		});
		
	}
	function editTable()
	{
		window.isUpdating=false;
		$("#showTB").css("display","none");
		$("#editTB").css("display","inline");
		htmlobj = $.ajax(
		{ 
			type: "GET",
			url: "update", 
			context: "update",
			cache: false,
			success: upDateTB
		})		
	}
	
	function requestUpate()
	{
		if(window.isUpdating){
		htmlobj = $.ajax(
		{ 
			type: "GET",
			url: "test", 
			context: "update",
			cache: false,
			success: upDateTB
		})
		}
	}
})
