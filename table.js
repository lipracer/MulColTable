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
		
		console.log($("#tv"+this.id.substr(3)).text());
		function packageData(index, data)
		{
			this.index = index;
			this.data = data;
		}
		var obj = new packageData(this.id.substr(3), $("#tv"+this.id.substr(3)).text());
		$.ajax({
		  type: 'POST',
		  url: "PUT",
		  data: JSON.stringify(obj),
		  //success: none,
		  dataType: "json"
		});

	}
	function insertData(e)
	{
		console.log($("#tab tr"+this.id.substr(3)).text());
		function packageData(index, data)
		{
			this.index = index;
			this.data = data;
		}
		var obj = new packageData(this.id.substr(3), $("#tv"+this.id.substr(3)).text());
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
		"<td><div contenteditable='true'></div></td>"+
		"<td><div contenteditable='true'></div></td>"+
		"<td><div contenteditable='true'></div></td>"+
		"<td><div contenteditable='true'></div></td>"+
		"<td><div contenteditable='true'></div></td>"+
		"<td>"+"<div id='tv"+index+"'" +
		" class='tv' contenteditable='true'></div><button class='btn' "+"id='btn"+index+"'"+">sumit</button>"+"</td>"+"</tr>";
		$("#btn"+item.index).click(insertData);
	}
	function upDateTB(htmlobj)
	{
		var jsonObj = JSON.parse(htmlobj);	
		$(jsonObj).each(function(index, item){
			var $tr=$("#tab tr").eq(index);
			if($tr.size()==0){
						//alert("指定的table id或行数不存在！");
				return;
			}
			$tr1=$("#tab tr").eq(index+1);
			if($tr1.size()!=0)
			{						 
				if(item.data[4])
				{
					console.log(item.data[4]);
					$("#tv"+(index)).text(item.data[4]);
				}
				return;
			}
			trHtml = "<tr>"+
			"<td>"+item.index+"</td>"+
			"<td>"+item.name+"</td>"+
			"<td>"+item.data[0]+"</td>"+
			"<td>"+item.data[1]+"</td>"+
			"<td>"+item.data[2]+"</td>"+
			"<td>"+"<div id='tv"+item.index+"'" + " class='tv' contenteditable='true'></div><button class='btn' "+"id='btn"+item.index+"'"+">sumit</button>"+"</td>"+
			"</tr>";
					 
			$tr.after(trHtml);
			$("#btn"+item.index).click(postData);
			$("#tv"+item.index).focus(function(){console.log("focus");window.isUpdating=false;});
			$("#tv"+item.index).blur(function(){console.log("blur");window.isUpdating=true;});
					 
		});
		
	}
	function insertTable_tr(index, trData)
	{
		var $tr=$("#tab tr").eq(index);
		if($tr.size()!=0)
		{
			alert("the item exist");
		}
		var strTR = "<tr>";
		$("#tab tr:last").after(createTRStr());
		
	}
	
	function requestUpate()
	{
		console.log(window.isUpdating);
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
