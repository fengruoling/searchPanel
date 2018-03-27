/*
 * 说明：此文件用于创建搜索查询面板
 * 创建日期：2018-3-22
 */
(function($){
	$.fn.extend({
		/*
		 * 函数功能：创建查询面板
		 * 参数说明：option	-	用于创建查询指标的参数设置
		 */
		createFuQueryPanel: function(option) {
			if(typeof(option) == "undefined" || typeof(option.data) == "undefined" || option.data.length == 0) {
				return;
			}
			var queryPanel = document.createElement('div');
			queryPanel.setAttribute('class', 'fu-queryPanel');
			if(option.padding) {
				queryPanel.style.padding = option.padding;
			}
			var sort = option.sort || "auto";
			var widgetType, itemSpan;
			var html;
			if(option.buttonPos && option.buttonPos == "right") {
				var buttonSpan = '<span class="buttonSpan right"><button name="query"><i class="fa fa-search"></i>查询</button><button name="reset"><i class="fa fa-trash-o"></i>清除</button></span>';
			}
			else {
				var buttonSpan = '<span class="buttonSpan"><button name="query"><i class="fa fa-search"></i>查询</button><button name="reset"><i class="fa fa-trash-o"></i>清除</button></span>';
			}

			if(sort == "auto") {
				for(var i = 0; i < option.data.length; i++) {
					itemSpan = document.createElement('span');
					itemSpan.setAttribute('class', 'fu-queryPanel-itemSpan');
					
					var initedOption = FMZ_jQueryPlugin_search.optionInit(option.data[i]);
					
					html = '<label' + initedOption.fieldName + '>' + option.data[i].label + '</label>';
					widgetType = option.data[i].widgetType || "textbox";
					
					html += FMZ_jQueryPlugin_search.createViewByOption(initedOption, widgetType);
					
					itemSpan.innerHTML = html;
					queryPanel.appendChild(itemSpan);
					if(i == option.data.length - 1) {
						$(queryPanel).append(buttonSpan);
						$(itemSpan).addClass('lastItem');
					}
				}
			}
			else if(sort == "align") {
				var table = document.createElement('table');
				var columnNum = option.column || 3;
				var dataLength = option.data.length;
				var rowNum = Math.ceil(dataLength / columnNum);
				columnNum = columnNum * 2 + 1;
				var tr,td;
				var dataIndex = 0;
				for(var i = 0; i < rowNum; i++) {
					tr = document.createElement('tr');
					html = "";
					for(var j = 0; j < columnNum; j++) {
						if(j == columnNum - 1) {
							if(i == rowNum - 1) {
								html += '<td>' + buttonSpan + '</td>';
							}
							else {
								html += '<td>&nbsp;</td>';
							}
						}
						else {
							var initedOption = FMZ_jQueryPlugin_search.optionInit(option.data[dataIndex]);
							if(j % 2 == 0) {
								html += '<td class="label"><label' + initedOption.fieldName + '>' + option.data[dataIndex].label + '</label>';
							}
							else {
								widgetType = option.data[dataIndex].widgetType || "textbox";
								html += '<td><span class="fu-queryPanel-itemSpan">' +
											'<label' + initedOption.fieldName + ' class="hide">' + option.data[dataIndex].label + '</label>' +
											FMZ_jQueryPlugin_search.createViewByOption(initedOption, widgetType) +
										'</span></td>';
								dataIndex++;
							}
						}
					}
					tr.innerHTML = html;
					table.appendChild(tr);
				}
				queryPanel.appendChild(table);
			}
			FMZ_jQueryPlugin_search.bindEvent(queryPanel, option);
			$(this).append(queryPanel);
		},
		
		/*
		 * 函数功能：销毁查询面板
		 * 参数说明：index	-	对象中要销毁的查询面板的索引，不填时默认全部销毁，索引超出长度时，默认销毁最后一项
		 */
		destroyFuQueryPanel: function(index) {
			if(index && parseInt(index) >= 0) {
				var length = $(this).find('.fu-queryPanel').length;
				if(index > length - 1) {
					index = length - 1;
				}
				$($(this).find('.fu-queryPanel')[index]).remove();
			}
			else {
				$(this).find('.fu-queryPanel').remove();
			}
		},
		
		/*
		 * 函数功能：获取查询参数
		 * 参数说明：index	-	对象中要获取的查询面板的索引，不填时默认全部查询参数，索引超出长度时，默认获取最后一项
		 */
		getFuQueryData: function(index) {
			var $queryPanel = $(this).find('.fu-queryPanel');
			var length = $queryPanel.length;
			var result, $itemSpan, $input, fieldName, value;
			if(length == 1) {
				result = {};
				$itemSpan = $(this).find('.fu-queryPanel-itemSpan');
				for(var i = 0; i < $itemSpan.length; i++) {
					fieldName = $($itemSpan[i]).find('label').attr('fieldname');
					$input = $($itemSpan[i]).find('input');
					if($input.length == 1) {
						value = $input.attr('data') || $input.val();
						result[fieldName] = value;
					}
					else {
						value = [];
						for(var j = 0; j < $input.length; j++) {
							value.push($($input[j]).attr('data') || $($input[j]).val())
						}
						result[fieldName] = value;
					}
				}
			}
			else {
				if(index && parseInt(index) >= 0) {
					result = {};
					if(parseInt(index) > length) {
						index = length;
					}
					$itemSpan = $($queryPanel[index]).find('.fu-queryPanel-itemSpan');
					for(var i = 0; i < $itemSpan.length; i++) {
						fieldName = $($itemSpan[i]).find('label').attr('fieldname');
						$input = $($itemSpan[i]).find('input');
						if($input.length == 1) {
							value = $input.attr('data') || $input.val();
							result[fieldName] = value;
						}
						else {
							value = [];
							for(var j = 0; j < $input.length; j++) {
								value.push($($input[j]).attr('data') || $($input[j]).val())
							}
							result[fieldName] = value;
						}
					}
				}
				else {
					result = [];
					var queryObj;
					for(var i = 0; i < length; i++) {
						queryObj = {};
						$itemSpan = $($queryPanel[i]).find('.fu-queryPanel-itemSpan');
						for(var j = 0; j < $itemSpan.length; j++) {
							fieldName = $($itemSpan[j]).find('label').attr('fieldname');
							$input = $($itemSpan[j]).find('input');
							if($input.length == 1) {
								value = $input.attr('data') || $input.val();
								queryObj[fieldName] = value;
							}
							else {
								value = [];
								for(var k = 0; k < $input.length; k++) {
									value.push($($input[k]).attr('data') || $($input[k]).val())
								}
								queryObj[fieldName] = value;
							}
						}
						result.push(queryObj);
					}
				}
			}
			return result;
		},
	});
})(jQuery);

var FMZ_jQueryPlugin_search = {
	bodyEventAddFlag: 0,
	optionInit: function(option) {
		var initedOption = {
			fieldName: "", placeholder: "", width: "", connectStr: "", widgetNum: "", optionHtml: ""
		};
		
		if(option.fieldName) {
			initedOption.fieldName = " fieldname=" + option.fieldName;
		}
		else {
			initedOption.fieldName = "";
		}
		
		if(option.placeholder) {
			initedOption.placeholder = " placeholder=" + option.placeholder;
		}
		else {
			initedOption.placeholder = "";
		}
		
		if(option.width) {
			initedOption.width = ' style="width:' + option.width + ';"';
		}
		else {
			initedOption.width = "";
		}
		
		if(option.widgetNum) {
			initedOption.widgetNum = parseInt(option.widgetNum) || 1;
			if(initedOption.widgetNum > 1) {
				if(option.connectStr) {
					initedOption.connectStr = '<span class="joinStr">' + option.connectStr + '</span>';
				}
				else {
					initedOption.connectStr = '<span class="joinStr">-</span>';
				}
			}
			else {
				initedOption.connectStr = "";
			}
		}
		else {
			initedOption.widgetNum = 1;
			initedOption.connectStr = "";
		}
		if(option.dataList) {
			for(var i = 0; i < option.dataList.length; i++) {
				initedOption.optionHtml += '<li value="' + option.dataList[i].value + '">' + option.dataList[i].label + '</li>';
			}
		}
		else {
			initedOption.optionHtml = "";
		}
		return initedOption;
	},
	
	createViewByOption: function(initedOption, widgetType) {
		var html = "";
		
		for(var j = 1; j <= initedOption.widgetNum; j++) {
			if(widgetType == "textbox") {
				html += '<input type="text" class="fu-baseInput border-box' + '"' + initedOption.fieldName + initedOption.placeholder + initedOption.width + '>';
			}
			else if(widgetType == "combobox") {
				html += '<span class="fu-dropdown">' +
							'<input type="text" class="fu-baseInput border-box' + '"' + initedOption.fieldName + initedOption.placeholder + initedOption.width + ' disabled="disabled">' +
							'<i class="fa fa-angle-down"></i>' + 
							'<ul class="fu-dropdown-option border-box">' + initedOption.optionHtml + '</ul>' +
						'</span>';
			}
			if(j < initedOption.widgetNum) {
				html += initedOption.connectStr;
			}
		}
		
		return html;
	},
	
	bindEvent: function(dom, option) {
		$(dom).find('.fu-dropdown').click(function(event) {
			$(this).toggleClass('active');
			$(this).children('.fu-dropdown-option').toggleClass('toggle');
			event.stopPropagation();
		});
		
		$(dom).find('.fu-dropdown-option>li').click(function() {
			var label = $(this).text();
			var value = $(this).attr('value');
			$(this).closest('span').find('input').val(label);
			$(this).closest('span').find('input').attr('data', value);
		});
		
		if(this.bodyEventAddFlag == 0) {
			this.bodyEventAddFlag = 1;
			$(document).click(function() {
				$('.fu-dropdown').removeClass('active');
				$('.fu-dropdown-option').removeClass('toggle');
			});
		}
		
		$(dom).find('button[name="query"]').click(function() {
			if(option.queryFunction) {
				option.queryFunction();
			}
		});
		
		$(dom).find('button[name="reset"]').click(function() {
			var $input = $(dom).find('input');
			$input.each(function() {
				$(this).val("");
				$(this).removeAttr('data');
			});
			if(option.queryFunction) {
				option.queryFunction();
			}
		});
	},
};
