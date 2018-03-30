运行环境说明：
需引入jQuery、font-awesome(这个也可以无需引入，只是一个图标效果，可以按需引入别的字体图标也可以)

查询面板参数说明：
var option = {
	data: [						//定义查询面板的查询指标
		{
			label: "",			//查询指标要显示的标签名称
			fieldName: "",		//查询指标绑定的字段名称
			widgetType: "",		//控件类型，可填"textbox"-文本框、"combobox"-下拉框，默认值为textbox
			placeholder: "",	//文本框内提示性文字
			dataList: [			//当控件类型为combobox时，定义下拉框内的数据项
				{
					label: "",	//下拉框数据项显示的值的名称
					value: "",	//下拉框数据项实际的值（后台需要的实际的值）
				},
			],
			widgetNum： Number,	//一个查询指标所包含的控件个数，比如某些需控制值域范围的查询条件，需要两个文本框，则此处填2，默认值为1
			connectStr: "",		//一个查询指标包含多个控件时，控件中间的连接字符串，如：~、至、-等，默认为"-"
			width: "",			//控件的宽度，默认为150px
		},
	],
	padding: "",				//用于设置查询面板的padding值
	sort: "auto|align",			//选填：auto或align，用于控制查询面板查询数据项的排列方式，auto为默认的排列方式，即一行排不下时就换行，align为表格式的排列方式，会像表格一样上下对齐
	column: Number,				//当sort方式为align时，需定义此参数，用于控制一行显示的查询指标个数，不填时默认值为3
	buttonPos: "",				//定义查询和清除按钮的位置，除了此参数为“right”时，按钮定位在右侧，其余情况均跟随查询指标定位在左侧
	queryFunction: Function		//用于定义查询时需执行的事件
};

查询面板函数调用说明：
$(dom).createQueryPanel(option);	//在dom容器中按option设置的参数创建查询面板

$(dom).destroyQueryPanel(index);	//在dom容器中销毁查询面板，index可不填，不填时默认销毁dom中所包含的所有查询面板，当dom中包含好几个查询面板时，可设置index值（从0开始）指定销毁某个查询面板

$(dom).getQueryData(index);		//在dom容器中获取查询参数，index可不填，不填时默认获取dom中所包含的所有查询面板的查询参数，当dom中包含好几个查询面板时，可设置index值（从0开始）指定获取某个查询面板的查询参数
